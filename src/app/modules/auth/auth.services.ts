import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';

import { User } from '../user/user.model';
import { ILogingUser } from './auth.interface';

const loginUser = async (payload: ILogingUser) => {
  const { id, password } = payload;

  const user = new User();

  // check user exist

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Match password

  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

    // create access to get
  }

  return {};
};

export const AuthService = {
  loginUser,
};

// check user exist
// const isUserExist = await User.findOne({id}, {id:1, password:1, needsPasswordChange:1}).lean()

// Match password
// const isPasswordMatched = await bcrypt.compare(password,isUserExist?.password)
