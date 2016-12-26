import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
// import { TutorialPage } from '../pages/tutorial/tutorial';
import { QuizPage } from '../pages/quiz/quiz';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { Quran } from '../providers/quran';
import { LocalNotifications } from 'ionic-native';
import * as moment from 'moment';

// import { Quran } from '../providers/quran';


// declare var Papa: any;


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
    { title: 'Quiz', component: QuizPage, icon: 'calendar' },
    // { title: 'Schedule', component: TabsPage, icon: 'calendar' },
    // { title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts' },
    // { title: 'Map', component: TabsPage, index: 2, icon: 'map' },
    // { title: 'About', component: TabsPage, index: 3, icon: 'information-circle' },
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any = QuizPage;

  notifyTime: any;
   notifications: any[] = [];
   days: any[];
   chosenHours: number;
   chosenMinutes: number;

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
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();

    this.notifyTime = moment(new Date()).format();

        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();

        this.days = [
            {title: 'Monday', dayCode: 1, checked: false},
            {title: 'Tuesday', dayCode: 2, checked: false},
            {title: 'Wednesday', dayCode: 3, checked: false},
            {title: 'Thursday', dayCode: 4, checked: false},
            {title: 'Friday', dayCode: 5, checked: false},
            {title: 'Saturday', dayCode: 6, checked: false},
            {title: 'Sunday', dayCode: 0, checked: false}
        ];
  }

  tes() {
    // console.log(this.nav);
    console.log(this.menu);

    let firstNotificationTime = new Date();


    let notification = {
      id: 1,
      title: 'Hey!',
      text: 'You just got notified :)',
      at: firstNotificationTime,
      every: 'week'
    };

    this.notifications.push(notification);
    LocalNotifications.schedule(this.notifications);
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



  addNotifications() {

    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    for (let day of this.days) {

      if (day.checked) {

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if (dayDifference < 0) {
          dayDifference = dayDifference + 7; // for cases where the day is in the following week
        }

        // firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        // firstNotificationTime.setHours(this.chosenHours);
        // firstNotificationTime.setMinutes(this.chosenMinutes);

        let notification = {
          id: 1,
          title: 'Hey!',
          text: 'You just got notified :)',
          at: firstNotificationTime,
          every: 'week'
        };

        this.notifications.push(notification);

      }

    }

    console.log("Notifications to be scheduled: ", this.notifications);

    if (this.platform.is('cordova')) {

      // Cancel any existing notifications
      LocalNotifications.cancelAll().then(() => {

        // Schedule the new notifications
        LocalNotifications.schedule(this.notifications);

        this.notifications = [];

        let alert = this.alertCtrl.create({
          title: 'Notifications set',
          buttons: ['Ok']
        });

        alert.present();

      });

    }

  }
}
