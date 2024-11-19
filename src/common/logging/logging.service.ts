import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }
}
