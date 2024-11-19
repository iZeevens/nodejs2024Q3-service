import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger extends Logger implements LoggerService {
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
