import { SocialAuthService } from '@modules/auth/service/social-auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IIncomingRequest, RequestCtx } from '@shared/request';

@Controller('auth/facebook')
export class FacebookController {
  constructor(public readonly service: SocialAuthService) {}

  @Get('')
  @UseGuards(AuthGuard('facebook'))
  facebooLogin(@Req() req: any) {}

  @Get('callback')
  @UseGuards(AuthGuard('facebook'))
  async facebooLoginCallback(@RequestCtx() requestCtx: IIncomingRequest, @Res() res) {
    const { user } = requestCtx;

    const result = await this.service.validateOAuthLoginEmail(user);
    const isSuccess = !!result.data;
    const { token, id } = result?.data || {};
    return this.service.routeRedirect(!!isSuccess, { token: token, userId: id }, res);
  }
}
