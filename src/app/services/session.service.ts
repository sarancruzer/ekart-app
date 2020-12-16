import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setLocal(key: any, value: any): any{
    localStorage.setItem(key, value);
  }

  getLocal(key: any): any{
    return localStorage.getItem(key);
  }

  clearLocal(): any{
    localStorage.clear();
  }
}
