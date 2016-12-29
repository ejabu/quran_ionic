import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Quran } from '../../providers/quran';
import { QuizPage } from '../quiz/quiz';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  todo: any;
  notes: any;

  constructor(
    public navCtrl: NavController,
    public quran: Quran,
    public storage: Storage,
  ) {
    this.quran.viewAll().then(speakers => {
      this.notes = speakers
    });
    console.log(this.todo)

  }

  clear(){
    this.quran.deleteAll()
  }
  jump(){
    console.log(this.todo)
    console.log(typeof(this.todo))
    this.storage.set('index', parseInt(this.todo));
    this.navCtrl.push(QuizPage, {'jump': parseInt(this.todo)});
  }

}
