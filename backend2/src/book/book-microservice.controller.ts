import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { EventPattern } from '@nestjs/microservices';
import { log } from 'console';

@Controller('book')
export class BookMICController {
  constructor(private readonly bookService: BookService) {}

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('abdulloh_created')
  create(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
    
    return this.bookService.create(createBookDto);
  }

  @EventPattern('book_updated')
  update(@Body() updateBookDto: UpdateBookDto) {
    const { id, ...updatedBook } = updateBookDto;
    return this.bookService.update(+id, updatedBook);
  }

  @EventPattern('book_deleted')
  remove(id: number) {
    return this.bookService.remove(+id);
  }

  // @Post()
  // create(@Body() createBookDto: CreateBookDto) {
  //   return this.bookService.create(createBookDto);
  // }

  // @Get()
  // findAll() {
  //   return this.bookService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }
}
