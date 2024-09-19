import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { SupportRequestService } from './support-request/support-request.service';
import { SupportRequestEmployeeService } from './support-request-employee/support-request-employee.service';
import { SupportRequestController } from './support-request/support-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [SupportRequestService, SupportRequestEmployeeService],
  exports: [SupportRequestService, SupportRequestEmployeeService],
  controllers: [SupportRequestController],
})
export class SupportModule {}
