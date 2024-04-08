import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  
})
export class UsersModule {}
