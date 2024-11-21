import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { promises as fs } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  async log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    await this.writeFile(message, 'LOG');
  }

  async error(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    await this.writeFile(message, 'ERROR');
  }

  async warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    await this.writeFile(message, 'WARN');
  }

  private async rotateFile(
    filePath: string,
    directoryPath: string,
    type: 'LOG' | 'ERROR' | 'WARN',
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

  private async writeFile(message: string, type: 'LOG' | 'ERROR' | 'WARN') {
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
