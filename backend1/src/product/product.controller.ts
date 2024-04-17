import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly clientService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    this.clientService.emit('product_created', product);
    return product;
  }

  @Post('/:id/like')
  async likeBoss(@Param('id') id: string) {
    let product = await this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException('no product');
    }
    product.likes += 1
    await this.productService.update(+id, product);
  }

  @Get()
  findAll() {
    this.clientService.emit('hello', 'hello from backend 1');
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(+id, updateProductDto);
    const updatedProduct = await this.productService.findOne(+id);
    this.clientService.emit('product_updated', updatedProduct);
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    this.clientService.emit('product_deleted', id);
    return product;
  }
}
