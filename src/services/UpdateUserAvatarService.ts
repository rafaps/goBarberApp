import { getRepository } from 'typeorm';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { id } from 'date-fns/locale';

import AppError from '../errors/AppError';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userUpdated = await usersRepository.findOne(user_id);

    if (!userUpdated) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (userUpdated.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        userUpdated.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    userUpdated.avatar = avatarFilename;

    await usersRepository.save(userUpdated);

    return userUpdated;
  }
}

export default UpdateUserAvatarService;
