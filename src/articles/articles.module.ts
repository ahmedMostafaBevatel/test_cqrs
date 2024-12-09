import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleCreatedEvent } from './events/impl/article-created.event';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ArticleSchema } from './schemas/article.schema';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { GetAllArticlesHandler } from './queries/handlers/get-all-articles.handler';
import { ArticleSaga } from './sagas/article.saga';

export const CommandHandlers = [CreateArticleHandler];
export const QueryHandlers = [GetAllArticlesHandler];
export const EventHandlers = [ArticleCreatedEvent];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleSaga, ...CommandHandlers, ...QueryHandlers],
})
export class ArticlesModule {}
