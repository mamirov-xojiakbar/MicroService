import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductMicroserviceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  
  

  @EventPattern('product_updated')
  update(@Body() updateProductDto: UpdateProductDto) {
    const { id, ...updatedProduct } = updateProductDto;
    return this.productService.update(+id, updatedProduct);
  }

    @EventPattern('product_deleted')
    remove(id: number) {
      return this.productService.remove(+id);
    }


  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
