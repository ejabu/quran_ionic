import { Component, ViewChild, Renderer  } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Quran } from '../../providers/quran';


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
  title: any;
  index: any;
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
      this.title = "Qs "+speakers[0]+":"+speakers[1];
      this.session = speakers[2];
      this.session2 = speakers[4];
      this.index = parseInt(speakers[3], 10);
    });
  }

  getAyat() {
    if (this.isClassVisible == true) {
        setTimeout(() => {
            this.quran.nextAyat(this.index).then(speakers => {
              this.title = "Qs "+speakers[0]+":"+speakers[1];

              this.session = speakers[2];
              this.session2 = speakers[4];
              this.index = parseInt(speakers[3], 10);

            });
        }, 500);
        this.isClassVisible = false
    }
    else{
        this.quran.nextAyat(this.index).then(speakers => {
          this.title = "Qs "+speakers[0]+":"+speakers[1];

          this.session = speakers[2];
          this.session2 = speakers[4];
          this.index = parseInt(speakers[3], 10);
        });
        this.isClassVisible = false
    }
  }
  prev() {
    if (this.isClassVisible == true) {
        setTimeout(() => {
            this.quran.prevAyat(this.index).then(speakers => {
              this.title = "Qs "+speakers[0]+":"+speakers[1];


              this.session = speakers[2];
              this.session2 = speakers[4];
              this.index = parseInt(speakers[3], 10);

            });
        }, 500);
        this.isClassVisible = false
    }
    else{
        this.quran.prevAyat(this.index).then(speakers => {
          this.title = "Qs "+speakers[0]+":"+speakers[1];

          this.session = speakers[2];
          this.session2 = speakers[4];
          this.index = parseInt(speakers[3], 10);
        });
        this.isClassVisible = false
    }
  }
  star(){
    this.quran.star(this.index)

  }



}
