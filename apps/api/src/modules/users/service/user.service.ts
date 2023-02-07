import { Injectable } from '@nestjs/common';
import { ReqUser } from '@shared/dtos';
import { RoleEntity } from '@shared/entities';
import { SvPermissionDeniedError } from '@shared/errors';
import { CoreService } from '@shared/services/core.service';
import { superAdminValid } from '@shared/validations/super-admin.validation';
import { FindOptionsWhere, In } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService extends CoreService<UserEntity> {
  constructor(private readonly userRepo: UserRepository) {
    super(userRepo);
  }

  async findUsersByIds(ids: string[]) {
    return this.userRepo.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findOneByEmail(email: string, condition: FindOptionsWhere<UserEntity> = {}): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { ...condition, email } });
  }

  async loginByEmail(email: string) {
    return this.userRepo.loginByEmail(email);
  }

  async findUserWithoutSuperAdmin(id: string) {
    const userFound = await this.userRepo.findOneBy({ id: id });
    superAdminValid({ user: userFound, isNotAllow: true });
    return userFound;
  }

  async selfUpdate(user: UserEntity, reqUser: ReqUser) {
    if (user.id !== reqUser.id) {
      return new SvPermissionDeniedError();
    }
    const userFound = await this.userRepo.findOneBy({ id: user.id });
    this.userRepo.merge(userFound, user);
    return this.userRepo.save(userFound);
  }

  // System
  async updateByAdmin(user: UserEntity, reqUser: ReqUser) {
    const userFound = await this.userRepo.findOneBy({ id: user.id });
    superAdminValid({ user: userFound, reqUser: reqUser });
    if (user.roles) {
      user.roles = user.roles.map((role) => new RoleEntity(role));
    }
    this.userRepo.merge(userFound, user);
    return this.userRepo.save(userFound);
  }
}
