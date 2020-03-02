import axios from 'axios';

export class HapiHttpFactory {
  static create() {
    return axios;
  }
}

export class HapiHttpClient {
  public static async invokeApi<T, U>(request: HttpRequest<T>): Promise<U> {
    try {
      const httpService = HapiHttpFactory.create();
      const response = await httpService(request);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export interface HttpRequest<T> {
  baseURL: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [headerName: string]: string };
  timeout?: number;
  data?: T;
  params?: {};
}
