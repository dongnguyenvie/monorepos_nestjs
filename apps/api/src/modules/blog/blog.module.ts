import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@modules/@shared/typeorm/typeorm-ex.module';
import { BlogRepository } from './repository/blog.repository';
import { BlogService } from './service/blog.service';
import { BlogResolver } from './resolver/blog.resolver';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BlogRepository])],
  controllers: [],
  providers: [BlogService, BlogResolver],
  exports: [BlogService],
})
export class BlogModule {}
