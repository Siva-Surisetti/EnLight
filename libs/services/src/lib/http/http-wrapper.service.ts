import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError as observableThrowError } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import {
  HttpResponseOptions,
  HttpObserveOptions,
  IRequestOptions
} from './http-requestoptions.interface';
import { LoggerService } from '../logger/logger.service';

declare type Headers = HttpHeaders | { [header: string]: string | string[] };
declare type Query = object | string;
declare type Body = object | string;

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {
  private OBSERVE_TYPE: HttpObserveOptions = 'response';
  private RESPONSE_TYPE: HttpResponseOptions = 'json';

  constructor(
    @Inject(HttpClient) private http,
    private loggerService: LoggerService
  ) {}

  public get(
    url: string,
    headers?: Headers,
    query?: Query,
    body?: Body
  ): Observable<any> {
    return this.request('GET', url, headers, query, body);
  }

  public post(
    url: string,
    headers?: Headers,
    query?: Query,
    body?: Body
  ): Observable<any> {
    return this.request('POST', url, headers, query, body);
  }

  public request<T>(
    method: string,
    url: string,
    headers?: Headers,
    query?: Query,
    body?: Body
  ): Observable<T> {
    const processedUrl = query && this.processQuery(url, query);
    const options: IRequestOptions = {
      headers: headers && this.processHeaders(headers),
      body: body && headers && this.processBody(body, headers),
      reportProgress: false,
      responseType: this.RESPONSE_TYPE,
      observe: this.OBSERVE_TYPE
    };
    return this.http.request(method, processedUrl, options).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(method, processedUrl, options);
        return observableThrowError(error);
      })
    );
  }

  private serialize(object: Object): HttpParams {
    let serializedObject: HttpParams = new HttpParams();
    for (const key of Object.keys(object)) {
      const value = object[key];
      serializedObject = serializedObject.append(key, value);
    }
    return serializedObject;
  }

  private processQuery(url: string, query: Query): string {
    const qs: HttpParams | string =
      typeof query === 'object' ? this.serialize(query) : query;
    url = url.indexOf('?') > 0 ? `${url}&${qs}` : `${url}?${qs}`;
    return url;
  }

  private processHeaders(headers: Headers): HttpHeaders {
    let requestHeaders: HttpHeaders;
    if (headers instanceof HttpHeaders) {
      requestHeaders = headers;
    } else {
      let httpHeaders: HttpHeaders = new HttpHeaders();
      for (const key of Object.keys(headers)) {
        httpHeaders = httpHeaders.append(key, headers[key]);
      }
      requestHeaders = httpHeaders;
    }
    return requestHeaders;
  }

  private processBody(body: Body, headers: Headers): Body {
    let requestBody: Body = body;
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      requestBody = typeof body === 'object' ? this.serialize(body) : body;
    }
    return requestBody;
  }

  private handleError(
    method?: string,
    processedUrl?: string,
    options?: IRequestOptions
  ) {
    return (error: any) => {
      this.loggerService.logError(
        `${method} failed for URL : ${processedUrl} with : ${options} - ${error.message}`
      );
    };
  }
}
