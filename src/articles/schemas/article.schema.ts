
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);