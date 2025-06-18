import { Injectable } from '@nestjs/common';
import { UserModel } from '../../databases/models/user.model';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HashEncryptService } from '../../auth/services/hash-encrypt/hash-encrypt.service';

@Injectable()
export class UserRepoService {
  constructor(@InjectModel(UserModel) public userModel: typeof UserModel, protected hashService: HashEncryptService) {}

  /**
   * Find by email or returns null when not found
   * @param email
   * @param transaction
   */
  public async findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    return await this.userModel
      .findOne({ where: { email }, transaction })
      .then((result) => (!!result ? result : null));
  }

  /**
   * Find user by email or fail
   * @param email
   * @param transaction
   */
  public findByEmailOrFail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return this.userModel.findOne({
      where: { email },
      transaction,
      rejectOnEmpty: true,
    });
  }

  /**
   * Finds the user or fails
   * @param id
   * @param transaction
   */
  public findOrFail(id: number, transaction?: Transaction): Promise<UserModel> {
    return this.userModel.findByPk(id, { transaction, rejectOnEmpty: true });
  }

  /**
   * Creates a new user
   * @param registrationData
   * @param transaction
   */
  public async create(
    registrationData: Pick<UserModel, 'email' | 'password' | 'first_name' | 'last_name'>,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return await this.userModel
      .build()
      .setAttributes(registrationData)
      .setAttributes({
        password: await this.hashService.createHash(registrationData.password),
      })
      .save({ transaction });
  } 
}
