import { Component, ViewChild, Renderer  } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
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
  audio: any;
  title: any;
  index: any;
  surahIndex=0;
  ayahIndex=0;
  indexPlaying=0;
  isClassVisible: any;
  audioState: any;
  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public quran: Quran,
    private renderer: Renderer,
    private navParams: NavParams
  ) {
    quran.load();
    console.log("navParams.data")
    console.log(navParams.data)
    var index = false
    if (navParams.data.jump) {
        index = navParams.data.jump
    }
    this.isClassVisible = false;
    quran.getAyat(index).then(speakers => {
      this.title = "Qs "+speakers[0]+":"+speakers[1];
      this.session = speakers[2];
      this.session2 = speakers[4];
      this.index = parseInt(speakers[3], 10);
      this.surahIndex=speakers[0]
      this.ayahIndex=speakers[1]
    });
    this.audioState = "play"
    this.audio = new Audio()

  }

  getAyat() {
    if (this.isClassVisible == true) {
        setTimeout(() => {
            this.quran.nextAyat(this.index).then(speakers => {
              this.title = "Qs "+speakers[0]+":"+speakers[1];

              this.session = speakers[2];
              this.session2 = speakers[4];
              this.index = parseInt(speakers[3], 10);
              this.surahIndex=speakers[0]
              this.ayahIndex=speakers[1]

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
          this.surahIndex=speakers[0]
          this.ayahIndex=speakers[1]
        });
        this.isClassVisible = false
    }
  }
  prev() {

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
              this.surahIndex=speakers[0]
              this.ayahIndex=speakers[1]

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
          this.surahIndex=speakers[0]
          this.ayahIndex=speakers[1]
        });
        this.isClassVisible = false
    }
  }
  star(){
    this.quran.star(this.index)

  }

  changeAudioState(){
    console.log("change")

    function to3char(word) {
        var length = word.length
        var toAdd = 3 - length
        for (var i = 0; i < toAdd; i++) {
            word = "0"+word
        }
        return word
    }

    if (this.audioState === "play") {
        this.audio.src = 'http://www.everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/'+to3char(this.surahIndex)+to3char(this.ayahIndex)+'.mp3'
        console.log(this.audio.src)
        this.audio.play();
        this.audioState = "pause"
        console.log(this)
        this.audio.onended = (function(scope) {
          this.audioState = "play"
          console.log('eja play2')
        }.bind(this));

      }
    else {
      this.audioState = "play"
      this.audio.pause();


    }
  }



}
