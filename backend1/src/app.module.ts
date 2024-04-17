import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: 'root',
      password: "xojiakbar",
      database: "microtest",
      entities: [Product, Book],
      synchronize: true
    }),
    ProductModule,
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
