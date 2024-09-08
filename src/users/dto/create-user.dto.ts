export class CreateUserDTO {
  readonly email: string;
  readonly passwordHash: string;
  readonly name: string;
  readonly contactPhone?: string;
  readonly role?: string;
}
