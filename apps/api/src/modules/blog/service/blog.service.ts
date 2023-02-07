import { Injectable } from '@nestjs/common';
import { ReqUser } from '@shared/dtos';
import { SvUnknownError } from '@shared/errors';
import { CoreService } from '@shared/services/core.service';
import { DeleteBlogInput, CreateBlogInput } from '../dtos';
import { BlogEntity } from '../entity/blog.entity';
import { BlogRepository } from '../repository/blog.repository';

@Injectable()
export class BlogService extends CoreService<BlogEntity> {
  constructor(private readonly blogRepo: BlogRepository) {
    super(blogRepo);
  }

  async createNewBlog(newBlog: CreateBlogInput, user: ReqUser) {
    try {
      const blogInstance = this.blogRepo.create({
        title: newBlog.title,
        createdById: user.id,
      });
      return this.blogRepo.save(blogInstance);
    } catch (error) {
      throw new SvUnknownError('Create new blog is error');
    }
  }
}
