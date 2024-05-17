import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CheckUserEmailDto, CreateUserDto, LoginUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/user_auth/auth.guard';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.register(createUserDto);
    return {
      response,
    };
  }

    @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const response = await this.userService.login(loginUserDto);
    return {
      response,
    };
  }

   @Public()
  @Post('checkUser')
  async checkUserExists(@Body() checkUserEmailDto: CheckUserEmailDto) {
    const response = await this.userService.findByEmail(checkUserEmailDto);
    return {
      response,
    };
  }

  @Get('userPorfile')
  async getUserPorfile( @Request() req : Request) {
    const userId = req['user'].sub;
    const user = await this.userService.findUserById(userId);
    return {
      user : new UserEntity(user)
    };
  }

}
