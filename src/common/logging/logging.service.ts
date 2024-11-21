import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { promises as fs } from 'fs';

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

  private async writeFile(message: string, type: 'LOG' | 'ERROR' | 'WARN') {
    const directoryPath = `./loggerData.txt`;
    const logMessage = `[${new Date().toISOString()}] [${type}] ${message}\n`;

    await fs.appendFile(directoryPath, logMessage, {
      encoding: 'utf8',
    });
  }
}
