import { Size } from '../../common/enum/size';
import { Language } from '../../common/enum/language';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubraceOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Number, { nullable: true })
  speed?: number;

  @Field(() => Size, { nullable: true })
  size?: Size;

  @Field(() => [Language], { nullable: true })
  languages?: Language[];
}
