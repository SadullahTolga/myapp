import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { LandingComponent } from './component/landing/landing.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import { CharacterDetailsComponent } from './component/character-details/character-details.component';
import {NgxsModule} from "@ngxs/store";
import {RickandmortyState} from "./state/rickandmorty.state";
import { FavoriteCharacterComponent } from './component/favorite-character/favorite-character.component';
import {FilterPipe} from "./pipes/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    CharacterDetailsComponent,
    FavoriteCharacterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxsModule.forRoot([RickandmortyState]),
    ToastrModule.forRoot(),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp({
      "projectId": "login-1337d",
      "appId": "1:444942573439:web:458ffab3a2a67ad0f6c44a",
      "storageBucket": "login-1337d.appspot.com",
      "apiKey": "AIzaSyCFywfCPzl57f87HT2onEYPf9vPw_WQkNc",
      "authDomain": "login-1337d.firebaseapp.com",
      "messagingSenderId": "444942573439",
      "measurementId": "G-BD6K9SVSTM"
    })),
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
