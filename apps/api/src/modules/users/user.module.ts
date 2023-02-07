import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@modules/@shared/typeorm/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
