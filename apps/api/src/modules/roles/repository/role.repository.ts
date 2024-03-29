import { CustomRepository } from '@shared/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entity/role.entity';

@CustomRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
