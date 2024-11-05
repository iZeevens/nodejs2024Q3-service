import { validate as isValidUUID } from 'uuid';

interface IuuidValidation {
  uuid: string;
  data: { id: string };
}

enum ValidationResult {
  valid = 'Valid',
  invalid = 'Invalid',
  notExist = 'Does`t exsist',
}

function uuidValidation({ uuid, data }: IuuidValidation) {
  if (!isValidUUID(uuid)) {
    return ValidationResult.invalid;
  }

  data.id === uuid ? ValidationResult.valid : ValidationResult.notExist;
}

export default uuidValidation;
