import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebRequestsService} from "./web-requests.service";
import {ApiMethod} from "../models/ApiMethod";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private webRequestsService: WebRequestsService
  ) {
  }

  getSchema(formData: FormData, headers: HttpHeaders) {
    return this.webRequestsService.getSchema(formData, headers);
  }

  getSchemaByUrl(url: string) {
    return this.webRequestsService.getSchemaByUrl(url);
  }

  sendSchema(formData: FormData, headers: HttpHeaders) {
    this.webRequestsService.sendSchema(formData, headers);
  }

  sendSchemaByUrl(url: string, result: Array<ApiMethod>) {
    this.webRequestsService.sendSchemaByUrl(url, result);
  }
}
