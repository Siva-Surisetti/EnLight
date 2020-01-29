import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public logError(message: string) {
    //TODO : Replace with server side logging
    console.log(message);
  }
}
