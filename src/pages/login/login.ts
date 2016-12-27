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
      this.notes = speakers
    });

  }

  clear(){
    this.quran.deleteAll()
  }


}
