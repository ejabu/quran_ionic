import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


declare var Papa: any;

@Injectable()
export class Quran {
  lastIndex: any;
  data: any;

  constructor(public http: Http,public storage: Storage) { }
  findLastIndex(){
    console.log('hahahaha')
    this.storage.get('index').then((value) => {
      // return value;
      console.log("valuesetstorage")
      console.log(value)
      this.lastIndex=value
    });
  }
  load() {
    if (this.data) {
      // already loaded data
      console.log("ALREADY")
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log("FIRST LOAD")

      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('assets/data/yaya2.txt').subscribe((res) => {
      // this.http.get('assets/data/quran.csv').subscribe((res) => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = this.processData(res);
        resolve(this.data);
      });
    });
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    data = Papa.parse(data['_body'], {
      // quotes: false,
      delimiter: "\t",
      // newline: "\r\n"
    })
    return data;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min) - 1;
    max = Math.floor(max) - 1;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getAyat() {
    return this.load().then(data => {
      let index = this.getRandomInt(0, 1147)
      console.log("this.lastIndex")
      console.log(this.lastIndex)
      if (this.lastIndex) {
          return data['data'][this.lastIndex];
      }
      else{
        return data['data'][1];

      }
    });
  }
  nextAyat(index) {
    console.log('next')
    this.storage.set('index', index);
    // this.storage.get('index').then((value) => {
    //   // return value;
    //   console.log("valuesetstorage")
    //   console.log(value)
    // });
    console.log(index)
    return this.load().then(data => {
      console.log("this.index")
      console.log(index)

      return data['data'][index];
    });
  }

}
