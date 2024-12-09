import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleCreatedEvent } from './events/impl/article-created.event';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { GetAllArticlesQuery } from './queries/impl/get-all-articles.query';
import { ArticleSchema } from './schemas/article.schema';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

export const CommandHandlers = [CreateArticleHandler];
export const QueryHandlers = [GetAllArticlesQuery];
export const EventHandlers = [ArticleCreatedEvent];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ...CommandHandlers, ...QueryHandlers],
})
export class ArticlesModule {}
