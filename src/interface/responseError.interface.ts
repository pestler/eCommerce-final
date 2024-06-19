export interface BadRequest {
  body: IResponseError;
  code: number;
  headers: Record<string, string>;
  message: string;
  name: string;
  originalRequest: Record<string, string>;
  retryCount: number;
  status: number;
  statusCode: number;
}

export interface IResponseError {
  statusCode: number;
  message: string;
  errors: IError[];
}

export interface IError {
  code: string;
  message: string;
  duplicateValue: string;
  field: string;
}
