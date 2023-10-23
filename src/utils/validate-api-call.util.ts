import { AxiosRequestConfig, Method } from 'axios';
import { ZodSchema, ZodTypeDef, z } from 'zod';

import api from '../api';
import { toast } from './app.utils';

interface iValidatedAPICallProps<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
> extends Omit<
    AxiosRequestConfig<TOutput>,
    'method' | 'url' | 'data' | 'params'
  > {
  body?: any;
  method?: Method;
  endpoint: string;
  hideErrorMessage?: boolean;
  customToastErrorMessage?: string;
  zodSchema: ZodSchema<TOutput, TDef, TInput>;
  params?: Record<string, Maybe<string | number | Date>>;
}

export async function validateApiCall<T>({
  body,
  endpoint,
  params,
  method = 'GET',
  customToastErrorMessage,
  zodSchema,
  hideErrorMessage,
  ...rest
}: iValidatedAPICallProps<T>) {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data: body,
      params,
      ...rest,
    });

    const responseParsedData = await zodSchema.parseAsync(response.data);

    return Promise.resolve(responseParsedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast(
        `API não respondeu da maneira esperada cheque o ENDPOINT: ${endpoint} com o método ${method}`,
        {
          status: 'error',
        }
      );
    }

    return Promise.reject(error);
  }
}
