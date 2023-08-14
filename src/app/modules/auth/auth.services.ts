import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';

import { User } from '../user/user.model';
import { ILoginUserResponse, ILogingUser } from './auth.interface';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILogingUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Match password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};

// check user exist
// const isUserExist = await User.findOne({id}, {id:1, password:1, needsPasswordChange:1}).lean()

// Match password
// const isPasswordMatched = await bcrypt.compare(password,isUserExist?.password)
