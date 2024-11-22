import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { promises as fs } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

type TypeFile = 'LOG' | 'ERROR' | 'WARN' | 'DEBUG' | 'VERBOSE';
@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  constructor(private configService: ConfigService) {
    super();
  }

  async log(message: any, ...optionalParams: any[]) {
    if (this.configService.get('LOGGER_LEVEL') >= 0) {
      super.log(message, ...optionalParams);
      await this.writeFile(message, 'LOG');
    }
  }

  async error(message: any, ...optionalParams: any[]) {
    if (this.configService.get('LOGGER_LEVEL') >= 1) {
      super.warn(message, ...optionalParams);
      await this.writeFile(message, 'ERROR');
    }
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (this.configService.get('LOGGER_LEVEL') >= 2) {
      super.warn(message, ...optionalParams);
      await this.writeFile(message, 'WARN');
    }
  }

  async debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
    await this.writeFile(message, 'DEBUG');
  }

  async verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams);
    await this.writeFile(message, 'VERBOSE');
  }

  private async rotateFile(
    filePath: string,
    directoryPath: string,
    type: TypeFile,
  ) {
    try {
      const stats = await stat(filePath);
      const maxFileSize = 1 * 1024 * 1024;

      if (stats.size >= maxFileSize) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const rotatedFileName = `${type}-${timestamp}.txt`;
        const rotatedFilePath = join(directoryPath, rotatedFileName);

        await fs.rename(filePath, rotatedFilePath);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        super.error(`Error checking log file size: ${error.message}`);
      }
    }
  }

  private async writeFile(message: string, type: TypeFile) {
    const directoryPath = `./loggerData`;
    const filePath = join(directoryPath, `${type}.txt`);
    const logMessage = `[${new Date().toISOString()}] [${type}] ${message}\n`;

    await this.rotateFile(filePath, directoryPath, type);
    await fs.mkdir(directoryPath, { recursive: true });
    await fs.appendFile(filePath, logMessage, {
      encoding: 'utf8',
    });
  }
}
