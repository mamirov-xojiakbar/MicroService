import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { log } from 'console';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @Inject('BOOK_SERVICE') private readonly clientService: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.create(createBookDto);
    this.clientService.emit('abdulloh_created', createBookDto); 
    return book;
  }

  @Get()
  findAll() {
    this.clientService.emit('hello', 'hello from backend 1');
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const book = await this.bookService.update(+id, updateBookDto);
    const updatedBook = await this.bookService.findOne(+id);
    this.clientService.emit('book_updated', updatedBook);
    return updatedBook;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const book = await this.bookService.remove(+id);
    this.clientService.emit('book_deleted', id);
    return book;
  }
}
