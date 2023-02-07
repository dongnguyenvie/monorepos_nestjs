import { AuthModule } from '@modules/auth/auth.module';
import { BlogModule } from '@modules/blog/blog.module';
import { ChatModule } from '@modules/chat/chat.module';
import { MessageModule } from '@modules/messages/message.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '@shared/casl/casl-ability.module';
import { configuration } from '@shared/configs/configuration';
import { typeOrmModuleOptions } from '@shared/configs/orm.config';
import { envFilePath } from '@shared/configs/system.config';
import { MyGraphQLModule } from '@shared/graphql/graphql.module';
import { MemoryCacheModule } from '@shared/packages/memory-cache/memory-cache.module';
import { PubsubModule } from '@shared/packages/pubsub/pubsub.module';
import { AppController } from './app.controller';
import { RoleModule } from './modules/roles/role.module';
import { RoomModule } from './modules/rooms/room.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      load: [configuration],
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    TypeOrmModule.forRoot({
      // charset: 'utf8mb4',
      ...typeOrmModuleOptions,
      // type: 'postgres',
      // host: process.env.DATABASE_HOST || '127.0.0.1',
      // port: Number(process.env.DATABASE_PORT || 5432),
      // username: process.env.DATABASE_USERNAME,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      // autoLoadEntities: true,
      // synchronize: process.env.NODE_ENV === 'development',
      // logger: 'advanced-console',
      // logging: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : 'all',
      // cache: true,
      // dropSchema: false,
      // migrationsTableName: 'migration_table',
      // entities: ['dist/**/*.entity.js'],
      // migrations: ['dist/migration/*.js'],
      // maxQueryExecutionTime: 1000,
      // migrationsRun: false,
      // ssl: false,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ttl: +config.get('THROTTLE_TTL'),
          limit: +config.get('THROTTLE_LIMIT'),
        };
      },
    }),
    MyGraphQLModule,
    CaslModule,
    UserModule,
    AuthModule,
    MessageModule,
    RoomModule,
    RoleModule,
    ChatModule,
    BlogModule,
    MemoryCacheModule,
    PubsubModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
