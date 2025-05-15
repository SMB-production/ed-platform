/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObjectType = Record<string, any>;

export type AnyFunctionType = (...args: any[]) => any;

export type ResponseWithResult<T> = { result: T };

export type Nullable<T> = T | undefined | null;

export type AxiosErrorResponse = {
  message: string;
  error?: string;
};
