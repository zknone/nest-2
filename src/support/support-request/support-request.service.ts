import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter } from 'events';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../schemas/support-request.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { GetChatListParams } from '../dto/get-chat-list-params.dto/get-chat-list-params.dto';
import { SendMessageDto } from '../dto/send-message.dto/send-message.dto';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto/create-support-request.dto';

@Injectable()
export class SupportRequestService {
  async createSupportRequest(
    createSupportRequestDto: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const newSupportRequest = new this.supportRequestModel({
      user: createSupportRequestDto.user,
      createdAt: new Date(),
      isActive: true,
      messages: [
        {
          author: createSupportRequestDto.user,
          sentAt: new Date(),
          text: createSupportRequestDto.text,
        },
      ],
    });

    return newSupportRequest.save();
  }
  private eventEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequest[]> {
    const query: any = { isActive: params.isActive };
    if (params.user) {
      query.user = params.user;
    }
    return this.supportRequestModel.find(query).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const newMessage = new this.messageModel({
      author: data.author,
      sentAt: new Date(),
      text: data.text,
    });
    await this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: { messages: newMessage },
    });
    this.eventEmitter.emit('newMessage', data.supportRequest, newMessage);
    return newMessage.save();
  }

  async getMessages(supportRequestId: string): Promise<Message[]> {
    const supportRequest = await this.supportRequestModel
      .findById(supportRequestId)
      .exec();
    return supportRequest.messages;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    this.eventEmitter.on('newMessage', handler);
    return () => this.eventEmitter.removeListener('newMessage', handler);
  }
}
