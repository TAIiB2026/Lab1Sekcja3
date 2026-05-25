import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Second } from './second/second';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDirective } from './my-directive';
import { Menu } from './menu/menu';
import { SterownikLicznika } from './sterownik-licznika/sterownik-licznika';
import { Licznik } from './licznik/licznik';
import { LicznikGlobalny } from './services/licznik-globalny';
import { Formularz } from './formularz/formularz';
import { PEOPLE_REPOSITORY_TOKEN } from './tokens/people-repository.token';
import { PeopleRepository } from './people-repository';
import { provideHttpClient } from '@angular/common/http';
import { PeopleWebapi } from './people-webapi';

@NgModule({
  declarations: [App, Second, MyDirective, Menu, SterownikLicznika, Licznik, Formularz],
  imports: [BrowserModule, CommonModule, AppRoutingModule, 
    FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(), 
    LicznikGlobalny,
    //{ provide: PEOPLE_REPOSITORY_TOKEN, useClass: PeopleRepository },
    { provide: PEOPLE_REPOSITORY_TOKEN, useClass: PeopleWebapi },
    provideHttpClient()
  ],
  bootstrap: [App],
})
export class AppModule {}
