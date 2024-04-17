import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly httpService: HttpService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post("/:id/like")
  async likeBoss(@Param('id') id: string) {
    let product = await this.productService.findOne(+id)
    console.log(product)
    if(!product) {
      throw new NotFoundException('no product')
    }
    product = await this.productService.update(+id, {likes: product.likes + 1})

    try {
      this.httpService.post(`http://localhost:3000/api/product/${id}/like`, {}).subscribe(res => {console.log(res);
      })
    } catch (error) {
      console.log(error);
    }
    return product
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
