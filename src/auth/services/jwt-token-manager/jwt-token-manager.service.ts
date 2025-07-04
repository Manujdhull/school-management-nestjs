import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory, JwtSecretRequestType } from '@nestjs/jwt';
import { constants as fsConstants, promises as fsPromises } from 'fs';
import { join } from 'node:path';
import { Buffer } from 'buffer';
import { cwd } from 'node:process';

@Injectable()
export class JwtTokenManagerService implements JwtOptionsFactory {
  /**
   * Create jwt root sync settings for JwtModule
   */
  async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secretOrKeyProvider: async (requestType, tokenOrPayload, options) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return {key: await this.privateKey(), passphrase: ''}
          case JwtSecretRequestType.VERIFY:
            return {key: await this.publicKey(), passphrase: ''}
        }
      }
      // publicKey: await this.publicKey(),
      // privateKey: await this.privateKey(),
    };
  }

  /**
   * Returns key path for the file
   * @param fileName
   */
  public keyPath(fileName: string): string {
    return join(cwd(), 'storage', fileName);
  }

  /**
   * Creates empty content file if not exists
   * @param file
   */
  public async createFileIfNotExists(file: string): Promise<boolean> {
    let result = false;
    try {
      await fsPromises.access(file, fsConstants.F_OK);
      result = true;
    } catch {
      await fsPromises.writeFile(file, '');
    }

    return result;
  }

  /**
   * Returns public key content as buffer
   */
  public async publicKey(): Promise<Buffer> {
    const filePath = this.keyPath('public-key.pem');
    await this.createFileIfNotExists(filePath);
    return fsPromises.readFile(filePath);
  }

  /**
   * Returns private key content as buffer
   */
  public async privateKey(): Promise<Buffer> {
    const filePath = this.keyPath('private-key.pem');
    await this.createFileIfNotExists(filePath);
    return fsPromises.readFile(filePath);
  }
}
