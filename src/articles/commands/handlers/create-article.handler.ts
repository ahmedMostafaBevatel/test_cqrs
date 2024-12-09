import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleCommand } from '../impl/create-article.command';
import { Article } from '../../interfaces/article.interface';
import { ArticleCreatedEvent } from 'src/articles/events/impl/article-created.event';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    const { title, content } = command;
    const newArticle = new this.articleModel({ title, content });
    newArticle.save();
    this.eventBus.publish(
      new ArticleCreatedEvent(newArticle.id),
    );
    return newArticle
  }
}
