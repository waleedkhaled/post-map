import { Component } from '@angular/core';
import {  ViewController} from 'ionic-angular';

/*
  Generated class for the InfoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html'
})
export class InfoModalPage {

  constructor( public viewCtrl:ViewController) {}

  ionViewDidLoad() {
   
  }
   dismiss() {
   this.viewCtrl.dismiss();
 }

}
