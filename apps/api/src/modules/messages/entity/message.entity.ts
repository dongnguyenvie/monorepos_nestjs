import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@modules/users/entity/user.entity';
import { CoreEntity } from '@shared/entities';

@ObjectType()
@Entity({ name: 'messages' })
export class MessageEntity extends CoreEntity {
  @Field({})
  @Column({ type: 'text', name: 'message' })
  message: string;

  @OneToOne(() => UserEntity, { lazy: true })
  @JoinColumn()
  user: UserEntity;
}
