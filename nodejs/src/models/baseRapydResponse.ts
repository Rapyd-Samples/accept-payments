export class RapydResponse<T> {
  status: Status;
  data: T;
}

export class Status {
  error_code: string;
  status: string;
  message: string;
  response_code: string;
  operation_id: string;
}
