import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";
import {ApiMethod} from "../../models/ApiMethod";
import {ViewportScroller} from "@angular/common";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html'
})
export class FileComponent implements OnInit {

  tags: Map<string, Array<ApiMethod>>;
  tagsActivity: Map<string, boolean>;
  tagsExpanded: Map<string, boolean>;
  hidden: boolean = true;
  url: string = '';
  file: File = null;
  buttonDisabled = true;
  @ViewChild('f') myInputVariable: ElementRef;

  constructor(private fileService: FileService, private scroller: ViewportScroller) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.url = '';
    this.hidden = true;
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    } else {
      this.file = null;
    }
  }

  getSwaggerSchema() {
    if (this.file) {
      let formData: FormData = new FormData();
      formData.append('file', this.file);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.fileService.getSchema(formData, headers).subscribe((response: Map<string, Array<ApiMethod>>) => {
        this.loadSchema(response);
      })
    } else {
      this.fileService.getSchemaByUrl(this.url).subscribe((response: Map<string, Array<ApiMethod>>) => {
        this.loadSchema(response);
      })
    }
  }

  loadSchema(response: Map<string, Array<ApiMethod>>) {
    const resp = new Map<string, Array<ApiMethod>>();
    const tAct = new Map<string, boolean>();
    const tExp = new Map<string, boolean>();
    Object.keys(response).forEach(function (key) {
      let value = response[key].map(function (apiModel: any): ApiMethod {
        apiModel.checked = true;
        if (apiModel.operation == 'GET') {
          apiModel.color = 'rgba(37,43,241,0.5)';
          apiModel.colorTransparent = 'rgba(37,43,241,0.1)';
        } else if (apiModel.operation == 'POST') {
          apiModel.color = 'rgba(48,203,0,0.5)';
          apiModel.colorTransparent = 'rgba(48,203,0,0.1)';
        } else if (apiModel.operation == 'PUT') {
          apiModel.color = 'rgba(241,189,29,0.5)';
          apiModel.colorTransparent = 'rgba(241,189,29,0.1)';
        } else if (apiModel.operation == 'DELETE') {
          apiModel.color = 'rgba(255,82,82,0.5)';
          apiModel.colorTransparent = 'rgba(255,82,82,0.1)';
        } else {
          apiModel.color = 'rgba(140,82,255,0.5)';
          apiModel.colorTransparent = 'rgba(140,82,255,0.1)';
        }
        return apiModel;
      });
      tAct.set(key, true)
      tExp.set(key, false)
      resp.set(key, value);
    });
    this.tags = resp;
    this.tagsActivity = tAct;
    this.tagsExpanded = tExp;
    this.hidden = false;
    this.scroller.scrollToAnchor("schema");
  }

  setAll(completed: boolean, tag: string) {

    this.tagsExpanded.set(tag, !this.tagsExpanded.get(tag));
    this.tagsActivity.set(tag, completed);
    let value = this.tags.get(tag).map(function (apiModel: any): ApiMethod {
      apiModel.checked = completed;
      return apiModel;
    });
    this.tags.set(tag, value);
  }

  checkTag(checked: boolean, tag: string, path: string, operation: string) {
    this.tags.get(tag).forEach(function (value) {
      if (value.path == path && value.operation == operation) {
        value.checked = checked;
      }
    })

    function allEqual(value, index, array) {
      return value.checked == checked;
    }

    if (this.tags.get(tag).every(allEqual)) {
      this.tagsActivity.set(tag, checked);
    }
  }

  changeExpanded(expanded: boolean, key: string) {
    this.tagsExpanded.set(key, expanded);
  }

  sendSchema() {
    const result = new Array<any>();
    this.tags.forEach(function (value, key) {
      value.forEach(function (apiModel) {
        if (apiModel.checked) {
          result.push(apiModel);
        }
      });
    });

    if (this.file) {
      let formData: FormData = new FormData();
      formData.append('file', this.file);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const mData = JSON.stringify(result);
      formData.append("data", mData);
      this.fileService.sendSchema(formData, headers);
    } else {
      this.fileService.sendSchemaByUrl(this.url, result);
    }
  }

  async updateUrl() {
    this.myInputVariable.nativeElement.value = '';
    this.file = null;
    this.hidden = true;
  }

  checkButtonDisable() {
    if (this.url == '' && this.file == null) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }
}
