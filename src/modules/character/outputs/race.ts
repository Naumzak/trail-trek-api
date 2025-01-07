import { Field, ObjectType } from '@nestjs/graphql';
import { Size } from '../../common/enum/size';
import { Language } from '../../common/enum/language';
import { IsEnum } from 'class-validator';
import { SubraceOutput } from "./subrace";

@ObjectType()
export class RaceOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  speed: number;

  @Field(() => Size)
  @IsEnum(Size)
  size: Size;

  @Field(() => [Language])
  @IsEnum(Language, { each: true })
  languages: Language[];

  @Field(() => [SubraceOutput], { nullable: true })
  subraces: SubraceOutput[];
}
