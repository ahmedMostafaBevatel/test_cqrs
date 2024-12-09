import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/impl/create-article.command';
import { GetAllArticlesQuery } from './queries/impl/get-all-articles.query';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createArticle(@Body() body: { title: string; content: string }) {
    const { title, content } = body;
    
    return this.commandBus.execute(new CreateArticleCommand(title, content));
  }

  @Get()
  async getAllArticles() {
    
    return this.queryBus.execute(new GetAllArticlesQuery());
  }
}
