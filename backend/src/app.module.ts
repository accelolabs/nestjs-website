import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputersModule } from './computers/computers.module';
import { AdditionalsModule } from './additionals/additionals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      port: 5432,
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_NAME || "clubs",
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    ClubsModule,
    SeatsModule,
    BookingsModule,
    ComputersModule,
    AdditionalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
