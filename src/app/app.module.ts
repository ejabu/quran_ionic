import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { QuizPage } from '../pages/quiz/quiz';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import { Quran } from '../providers/quran';

@NgModule({
  declarations: [
    ConferenceApp,
    LoginPage,
    QuizPage
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    LoginPage,
    QuizPage
  ],
  providers: [ConferenceData, UserData, Quran, Storage]
})
export class AppModule {}
