import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestEmployeeService } from '../support-request-employee/support-request-employee.service';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto/create-support-request.dto';
import { SendMessageDto } from '../dto/send-message.dto/send-message.dto';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto/mark-messages-as-read.dto';

@Controller('support')
export class SupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @Post('create')
  async createSupportRequest(
    @Body() createSupportRequestDto: CreateSupportRequestDto,
  ) {
    return this.supportRequestService.createSupportRequest(
      createSupportRequestDto,
    );
  }

  @Post('message')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.supportRequestService.sendMessage(sendMessageDto);
  }

  @Get('messages/:supportRequestId')
  async getMessages(@Param('supportRequestId') supportRequestId: string) {
    return this.supportRequestService.getMessages(supportRequestId);
  }

  @Patch('mark-read')
  async markMessagesAsRead(
    @Body() markMessagesAsReadDto: MarkMessagesAsReadDto,
  ) {
    return this.supportRequestEmployeeService.markMessagesAsRead(
      markMessagesAsReadDto,
    );
  }

  @Patch('close/:supportRequestId')
  async closeRequest(@Param('supportRequestId') supportRequestId: string) {
    return this.supportRequestEmployeeService.closeRequest(supportRequestId);
  }
}
