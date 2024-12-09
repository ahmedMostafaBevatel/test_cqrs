import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAllArticlesQuery } from '../impl/get-all-articles.query';
import { Article } from '../../interfaces/article.interface';

@QueryHandler(GetAllArticlesQuery)
export class GetAllArticlesHandler
  implements IQueryHandler<GetAllArticlesQuery>
{
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async execute(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
}
