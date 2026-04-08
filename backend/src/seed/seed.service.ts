import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from 'src/clubs/entities/club.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Computer } from 'src/computers/entities/computer.entity';
import { AdditionalService } from 'src/additionals/entities/additional.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Computer)
    private readonly computerRepo: Repository<Computer>,
    @InjectRepository(AdditionalService)
    private readonly additionalRepo: Repository<AdditionalService>,
  ) {}

  async onApplicationBootstrap() {
    const autoSeed = process.env.AUTO_SEED !== 'false';
    if (!autoSeed) {
      return;
    }

    await this.seedCatalogIfNeeded();
  }

  private async seedCatalogIfNeeded() {
    const clubsCount = await this.clubRepo.count();
    const seatsCount = await this.seatRepo.count();
    const computersCount = await this.computerRepo.count();
    const additionalsCount = await this.additionalRepo.count();

    if (
      clubsCount > 0 &&
      seatsCount > 0 &&
      computersCount > 0 &&
      additionalsCount > 0
    ) {
      return;
    }

    this.logger.log('Seeding clubs/seats/computers/additional services...');

    const clubs = await this.clubRepo.save([
      this.clubRepo.create({
        name: 'Linux Arena Petrograd',
        address: 'Кронверкский проспект, 49, Санкт-Петербург',
      }),
      this.clubRepo.create({
        name: 'Linux Arena Nevsky',
        address: 'Невский проспект, 88, Санкт-Петербург',
      }),
      this.clubRepo.create({
        name: 'Linux Arena Vasileostrov',
        address: 'Биржевая линия, 14-16, Санкт-Петербург',
      }),
    ]);

    const priceByRow = [120, 150, 180, 220];
    const seatsToSave: Seat[] = [];
    for (const club of clubs) {
      for (let seatNumber = 1; seatNumber <= 16; seatNumber += 1) {
        const rowIndex = Math.floor((seatNumber - 1) / 4);
        seatsToSave.push(
          this.seatRepo.create({
            number: seatNumber,
            price: priceByRow[rowIndex] ?? 120,
            occupied: false,
            club,
          }),
        );
      }
    }
    const seats = await this.seatRepo.save(seatsToSave);

    const computersToSave: Computer[] = seats.map((seat, index) =>
      this.computerRepo.create({
        cpu: index % 2 === 0 ? 'Ryzen 5 5600' : 'Core i5-12400F',
        ram: index % 3 === 0 ? '32GB' : '16GB',
        gpu: index % 2 === 0 ? 'RTX 3060' : 'RTX 4060',
        os: index % 2 === 0 ? 'Windows 11' : 'Ubuntu 24.04',
        seat,
      }),
    );
    await this.computerRepo.save(computersToSave);

    await this.additionalRepo.save([
      this.additionalRepo.create({
        name: 'Soda',
        description: 'Cold drink 0.5L',
        price: 50,
      }),
      this.additionalRepo.create({
        name: 'Gaming Mouse',
        description: 'Premium mouse for your session',
        price: 120,
      }),
      this.additionalRepo.create({
        name: 'Headset',
        description: 'Closed-back headset with microphone',
        price: 90,
      }),
      this.additionalRepo.create({
        name: 'Energy Drink',
        description: 'Energy drink 0.33L',
        price: 70,
      }),
    ]);

    this.logger.log('Seed complete.');
  }
}
