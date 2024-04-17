import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: number) {
    return this.bookModel.findOne({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookModel.findOneAndUpdate({ id }, updateBookDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.bookModel.findOneAndDelete({ id });
  }
}
