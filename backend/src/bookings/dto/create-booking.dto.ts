import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookingDto {
  @Field(() => ID)
  clubId: string;

  @Field(() => [ID])
  seatIds: string[];

  @Field(() => [ID], { nullable: true })
  additionalServiceIds?: string[];

  @Field()
  date: string;

  @Field()
  startTime: string;
}
