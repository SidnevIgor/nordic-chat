import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() { }

  public convertObjToArr(obj) {
    if(obj) {
      let arr = [];
      Object.keys(obj).forEach((key) => {
        arr.push({...obj[key]})
      })
      return arr;
    }
    else {
      return [];
    }
  }
}
