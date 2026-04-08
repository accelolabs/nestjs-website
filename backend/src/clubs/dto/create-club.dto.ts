import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClubDto {
  @Field()
  name: string;

  @Field()
  address: string;
}
