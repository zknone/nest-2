import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto/mark-messages-as-read.dto';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}
