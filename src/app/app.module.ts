import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {GeneratorComponent} from './components/generator/generator.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FileComponent} from './components/file/file.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'generate', component: GeneratorComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, GeneratorComponent, HomeComponent, NotFoundComponent, FileComponent
  ],
  imports: [
    BrowserModule,
    NgxDropzoneModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
