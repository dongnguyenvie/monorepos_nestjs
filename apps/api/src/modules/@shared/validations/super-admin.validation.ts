import { FORBIDDEN_ERROR } from '@noinghe/shared/dist/constants';
import { Privilege } from '@noinghe/shared/dist/enums';
import { ReqUser } from '@shared/dtos';
import { UserEntity } from '@shared/entities';
import { SvForbiddenError } from '@shared/errors';

export const superAdminValid = ({
  user,
  reqUser,
  isNotAllow = false,
}: {
  user: UserEntity;
  reqUser?: ReqUser;
  isNotAllow?: boolean;
}) => {
  if (!(user.privilege || []).includes(Privilege.SuperAdmin)) return;
  if (isNotAllow) {
    new SvForbiddenError(FORBIDDEN_ERROR);
  }
  if (!reqUser || user.id !== reqUser.id) {
    return new SvForbiddenError(FORBIDDEN_ERROR);
  }
};
