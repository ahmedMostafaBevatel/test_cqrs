import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleCreatedEvent } from '../impl/article-created.event';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent>
{
  handle(event: ArticleCreatedEvent) {
    console.log(`Article Created: ${event.articleId}`);
  }
}
