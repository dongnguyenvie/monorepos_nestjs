import { CustomRepository } from '@modules/@shared/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BlogEntity } from '../entity/blog.entity';

@CustomRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {}
