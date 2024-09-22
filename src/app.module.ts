import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportModule } from './support/support.module';
import { UsersModule } from './users/users.module';
import { HotelsController } from './hotels/hotels.controller';
import { HotelRoomsController } from './hotel-rooms/hotel-rooms.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { SupportRequestController } from './support/support-request/support-request.controller';
import { ReservationsService } from './reservations/reservations.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    HotelsModule,
    ReservationsModule,
    UsersModule,
    SupportModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    HotelsController,
    HotelRoomsController,
    ReservationsController,
    SupportRequestController,
  ],
  providers: [ReservationsService, AppService],
})
export class AppModule {}
