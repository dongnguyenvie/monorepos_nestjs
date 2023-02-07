import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { GqlThrottlerGuard } from '@shared/guards/gql-throttler.guard';
import { GraphqlDescription } from '@noinghe/shared/dist/helpers/description.helper';
import { SigninIntput, SigninOutput, SignupIntput, SignupOutput } from '../dtos';
import { AuthGuard } from '@nestjs/passport';
import { SocialAuthService } from '../service/social-auth.service';
import { SigninByGoogleIntput } from '../dtos/signin-by-gg.dto';
import { PoliciesGuard } from '@shared/guards/policies.guard';
import { ReqUser } from '@shared/dtos';
import { CurrentUser } from '@shared/request';
import { MeOutput } from '../dtos/me.dto';

@Resolver()
export class AuthResolver {
  constructor(public authSvc: AuthService, public socialAuthSvc: SocialAuthService) {}

  @PoliciesGuard()
  @Query((_) => MeOutput, {
    description: GraphqlDescription.API()
      .withPublic()
      .withTitle('Get me')
      .withGroup('user')
      .withDefault()
      .build(),
  })
  async me(@CurrentUser() user: ReqUser) {
    return user;
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation((_) => SigninOutput, {
    description: GraphqlDescription.API().withPublic().withTitle('Đăng nhập').withGroup('auth').build(),
  })
  signin(@Args('input') user: SigninIntput, @Context() ctx: any) {
    return this.authSvc.signin(ctx, user);
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation((_) => SignupOutput, {
    description: GraphqlDescription.API().withPublic().withTitle('Đăng kí').withGroup('auth').build(),
  })
  signup(@Args('input') user: SignupIntput) {
    return this.authSvc.signup(user);
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation((_) => SigninOutput, {
    description: GraphqlDescription.API().withPublic().withTitle('Đăng nhập by gg').withGroup('auth').build(),
  })
  signinByGoogle(@Args('input') payload: SigninByGoogleIntput, @Context() ctx: any) {
    return this.socialAuthSvc.signinByGG(ctx, payload.token);
  }
}
