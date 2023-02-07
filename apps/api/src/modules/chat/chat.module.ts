import { RoomModule } from '@modules/rooms/room.module';
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { MyJwtModule } from '@shared/jwt/my-jwt.module';
import { MemoryCacheModule } from '@shared/packages/memory-cache/memory-cache.module';
import { ChatGateway } from './chat.gateway';
import { ChatroomService } from './service/chatroom.service';

@Module({
  imports: [MyJwtModule, RoomModule, UserModule],
  providers: [ChatGateway, ChatroomService],
})
export class ChatModule {}
