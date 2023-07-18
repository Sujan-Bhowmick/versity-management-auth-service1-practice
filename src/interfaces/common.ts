import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | undefined;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
