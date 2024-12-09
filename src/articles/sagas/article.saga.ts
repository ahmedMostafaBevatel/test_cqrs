import { Injectable } from "@nestjs/common";
import { Saga, ICommand, ofType, CommandHandler } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { ArticleCreatedEvent } from "../events/impl/article-created.event";
import { delay, map } from "rxjs/operators";

@Injectable()
export class ArticleSaga {
    constructor() {}

    @Saga()
    articleCreated = (events$: Observable<any>): Observable<ICommand> => {

        return events$
            .pipe(
                ofType(ArticleCreatedEvent),
                delay(1000),
                map((event) => {
                    console.log('Inside [ArticleSaga] Saga');
                    return null;
                }),
            );
    }
}