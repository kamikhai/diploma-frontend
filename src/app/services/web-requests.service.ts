import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiMethod} from "../models/ApiMethod";
import { saveAs } from 'file-saver';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getFileName} from "../utils/get-file-name";

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {
  readonly ROOT_URL;

  constructor(
    private http: HttpClient
  ) {
    this.ROOT_URL = 'http://localhost:8180';
  }

  getSchema(formData: FormData, headers: HttpHeaders): Observable<Map<string, Array<ApiMethod>>> {
    return this.http.post<Map<any, any>>(`${this.ROOT_URL}/api/v1/parse/schema`, formData, {headers: headers});
  }

  getSchemaByUrl(url: string): Observable<Map<string, Array<ApiMethod>>> {
    return this.http.post<Map<any, any>>(`${this.ROOT_URL}/api/v1/parse/url/schema?url=` + url, null);
  }

  sendSchema(formData: FormData, headers: HttpHeaders): void {
    this.http.post(`${this.ROOT_URL}/api/v1/parse`, formData, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    }).subscribe(res => {
      saveAs(res.body as Blob, getFileName(res.headers));
    });
  }

  sendSchemaByUrl(url: string, result: Array<ApiMethod>): void {
    this.http.post(`${this.ROOT_URL}/api/v1/parse/url?url=` + url, result, {
      responseType: 'blob',
      observe: 'response'
    }).subscribe(res => {
      saveAs(res.body as Blob, getFileName(res.headers));
    });
  }

}
