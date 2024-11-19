import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logging.service';

export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { url, query, body, method } = req;

    this.logger.log(
      `Incoming Request: ${method} ${url} - Query: ${JSON.stringify(
        query,
      )} - Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Response: ${method} ${url} - Status: ${statusCode}`);
    });

    next();
  }
}
