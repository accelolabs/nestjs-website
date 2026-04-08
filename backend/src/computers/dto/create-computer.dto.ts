import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateComputerDto {
  @Field()
  cpu: string;

  @Field()
  ram: string;

  @Field()
  gpu: string;

  @Field()
  os: string;

  @Field(() => ID, { nullable: true })
  seatId?: string;
}
