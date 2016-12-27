import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { Quran } from '../../providers/quran';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  notes: any;

  constructor(
    public navCtrl: NavController,
    public quran: Quran,
  ) {
    this.quran.viewAll().then(speakers => {
      console.log(speakers)
      this.notes = speakers
      // this.title = "Qs " + speakers[0] + ":" + speakers[1];
      //
      //
      // this.session = speakers[2];
      // this.session2 = speakers[4];
      // this.index = parseInt(speakers[3], 10);

    });

  }

  clear(){
    this.quran.deleteAll()
  }


}
