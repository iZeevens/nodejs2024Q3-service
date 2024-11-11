import { Response } from 'express';

class ResponseHelper {
  static sendOk(res: Response, data: unknown = null) {
    return res.status(200).json(data);
  }

  static sendCreated(res: Response, data: unknown = null) {
    return res.status(201).json(data);
  }

  static sendBadRequest(res: Response, message = 'Bad Request') {
    return res.status(400).json({ status: 'error', message });
  }

  static sendNotFound(res: Response, message = 'Not Found') {
    return res.status(404).json({ status: 'error', message });
  }
}

export default ResponseHelper;
