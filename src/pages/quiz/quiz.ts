import { Component, ViewChild, Renderer  } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Quran } from '../../providers/quran';


import { SignupPage } from '../signup/signup';
import { UserData } from '../../providers/user-data';

declare var OriDomi: any;

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
  @ViewChild('sketchElement') sketchElement: any;

  session: any;
  session2: any;
  isClassVisible: any;
  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public quran: Quran,
    private renderer: Renderer,
  ) {
    quran.load();
    this.isClassVisible = false;
    quran.getAyat().then(speakers => {
      this.session = speakers[0];
      this.session2 = speakers[1];
    });
  }

  getAyat() {
    if (this.isClassVisible == true) {
        setTimeout(() => {
            this.quran.getAyat().then(speakers => {
              this.session = speakers[0];
              this.session2 = speakers[1];
            });
        }, 500);
        this.isClassVisible = false
    }
    else{
        this.quran.getAyat().then(speakers => {
          this.session = speakers[0];
          this.session2 = speakers[1];
        });
        this.isClassVisible = false
    }
  }

  getAyat2() {
      this.getAyat()
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
