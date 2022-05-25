import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../types/LoginRequest';
import { PagingData } from '../types/PagingData';
import { SuDungData } from '../types/SuDungData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private api = 'http://localhost:8080/api';

  login(data: LoginRequest) {
    return this.http.post(this.api + '/login', data);
  }

  refreshAccessToken(data: any) {
    return this.http.post(this.api + '/token/refresh', data);
  }

  addRecord(data: SuDungData) {
    return this.http.post(this.api + '/sudung', data);
  }

  getRecord(data: SuDungData) {
    return this.http.post(this.api + '/sudung/search', data);
  }

  //procedure
  getRecordProcedure(data: SuDungData) {
    return this.http.post(this.api + '/sudung/procedure', data);
  }

  editRecord(data: SuDungData) {
    return this.http.post(this.api + '/sudung', data);
  }

  deleteRecord(id: Number) {
    return this.http.delete(this.api + `/sudung/${id}`);
  }

  //paging
  paging(data: PagingData) {
    return this.http.post(this.api + '/sudung/paging', data);
  }
}
