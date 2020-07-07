import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://github.com/steptosoft/demoInsertion';
const getDataUrl = URL + '/' + 'sheet';
const addDataUrl = URL + '/' + 'sheet';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getSheetData() {
    return this.http.get(getDataUrl);
  }

  saveSheetData(payload) {
    return this.http.post(addDataUrl, payload);
  }

}