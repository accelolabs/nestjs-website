import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSeatDto {
  @Field(() => Int)
  number: number;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean, { nullable: true })
  occupied?: boolean;

  @Field(() => ID, { nullable: true })
  clubId?: string;

  @Field(() => ID, { nullable: true })
  computerId?: string;
}
