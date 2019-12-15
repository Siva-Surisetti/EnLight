import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {}

  public logError(message: string) {
    //TODO : Replace with server side logging
    console.log(message);
  }
}
