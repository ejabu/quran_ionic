import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { QuizPage } from '../pages/quiz/quiz';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { Quran } from '../providers/quran';


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Read', component: QuizPage, icon: 'ios-book' },
    { title: 'Log', component: LoginPage, icon: 'clipboard' },
  ];

  rootPage: any = QuizPage;

  constructor(
    public events: Events,
    public userData: UserData,
    public Quran: Quran,
    public menu: MenuController,
    public platform: Platform,
    confData: ConferenceData,
    public alertCtrl: AlertController,
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();
    // quran.load();
    Quran.findLastIndex()
    console.log("this.appPages")
    console.log(this.appPages)
    this.enableMenu(false);
    this.listenToLoginEvents();
  }



  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }




}
