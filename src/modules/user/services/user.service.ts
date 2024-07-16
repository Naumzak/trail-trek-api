import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user';
import { UserEntity } from '../entities/user.entity';
import { ICreateUserParams } from '../interfaces/create-user-params';
import { IDeleteUserParams } from '../interfaces/delete-user-params';
import { IUpdateUserParams } from '../interfaces/update-user-params';
import { IGetUserParams } from '../interfaces/get-user-params';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userDao.find({});
    return users;
  }

  async getUser(params: IGetUserParams): Promise<UserEntity> {
    const user = await this.userDao.findOne({ where: params });
    return user;
  }

  async createUser(params: ICreateUserParams): Promise<UserEntity> {
    const user = await this.userDao.save(params);
    return user;
  }

  async deleteUser(params: IDeleteUserParams): Promise<UserEntity> {
    const user = await this.userDao.findOneBy({ ...params });
    const removedEntity = await this.userDao.remove(user);
    return { ...removedEntity, ...params };
  }

  async updateUser({ id, ...params }: IUpdateUserParams): Promise<UserEntity> {
    await this.userDao.update({ id }, params);
    return this.userDao.findOneBy({ id });
  }
}
