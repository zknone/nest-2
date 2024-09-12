import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { SearchUserParams } from './interface/interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: Partial<SearchUserParams>) {
    return this.usersService.findAll(query);
  }

  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    return this.usersService.validatePassword(email, password);
  }
}
