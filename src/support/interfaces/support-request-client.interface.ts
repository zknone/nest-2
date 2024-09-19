import { CreateSupportRequestDto } from '../dto/create-support-request.dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto/mark-messages-as-read.dto';
import { SupportRequest } from '../schemas/support-request.schema';

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
}
