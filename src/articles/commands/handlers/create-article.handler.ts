import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleCommand } from '../impl/create-article.command';
import { Article } from '../../interfaces/article.interface';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    const { title, content } = command;
    const newArticle = new this.articleModel({ title, content });
    return newArticle.save();
  }
}
