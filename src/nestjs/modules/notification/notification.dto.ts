import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class Content {
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class NotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @Type(() => Content)
  @ValidateNested()
  content: Content;
}
