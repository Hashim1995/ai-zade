/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import {
  ILogin,
  IUserData,
  IUserLoggedData,
  IUserRegister
} from '@/models/user';
import { IGlobalResponse } from '@/models/common';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IGetMeResponse extends IGlobalResponse {
  data: IUserLoggedData;
}
export interface ILoginResponse extends IGlobalResponse {
  data: IUserData;
}
export interface IRegisterResponse extends IGlobalResponse {
  data: IUserRegister;
}

export class AuthService {
  // eslint-disable-next-line no-use-before-define
  private static instance: AuthService | null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!this.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance!;
  }

  public async getMe(onError?: ErrorCallBack): Promise<IGetMeResponse> {
    const res = await HttpUtil.get(
      'api/client/user/Details',
      null,
      false,
      onError
    );
    return res;
  }

  public async login(
    body: ILogin,
    onError?: ErrorCallBack
  ): Promise<ILoginResponse> {
    const res = await HttpUtil.post('api/client/user/Login', body, onError);
    return res;
  }

  public async register(
    body: IUserRegister,
    onError?: ErrorCallBack
  ): Promise<IRegisterResponse> {
    const res = await HttpUtil.post('api/client/user/Register', body, onError);
    return res;
  }
}
