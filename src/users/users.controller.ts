import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { SearchUserParams } from './interface/interface';
import { CustomRequest } from './interface/interface';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin/users')
  findAllbyAdmin(
    @Query() query: Partial<SearchUserParams>,
    @Req() req: CustomRequest,
  ) {
    return this.usersService.findAll(query, req.user?.role);
  }

  @Get('manager/users')
  findAllbyManager(
    @Query() query: Partial<SearchUserParams>,
    @Req() req: CustomRequest,
  ) {
    return this.usersService.findAll(query, req.user?.role);
  }

  @Post('client/register')
  registerClient(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Post('admin/users')
  registerByAdmin(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createByAdmin(createUserDTO, 'admin');
  }

  @Post('manager/users')
  registerByManager(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createByManager(createUserDTO, 'manager');
  }
}
