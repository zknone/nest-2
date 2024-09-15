export class CreateRoomDTO {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly hotel: string;
  readonly isEnabled?: boolean;
}
