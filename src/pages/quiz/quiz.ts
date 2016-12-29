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
    var audio = new Audio();
    // audio.src = "https://s3.amazonaws.com/ionic-audio/Message+in+a+bottle.mp3";
    // audio.src = "https://www.dropbox.com/home?preview=114An-nas.mp3";
    // audio.src = "https://drive.google.com/open?id=0B7bj5iU6fZENQzdYdGRJV2VxRlE";
    // audio.src = "http://flight-attendent-rabbit-73468.netlify.com/114An-nas.mp3";
    // audio.load();
    // audio.play();
    //
    // console.log(audio)


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
