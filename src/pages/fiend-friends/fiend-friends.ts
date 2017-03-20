import { Component ,Pipe, PipeTransform, Injectable } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
   selector: 'page-fiend-friends',
  templateUrl: 'fiend-friends.html'
})
export class FindFriendsPage{
  assetCollection: any[] = [];
  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    this.initializeItems();
  }
  initializeItems() {
  
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;
          if(this.assetCollection.indexOf(element)===-1){
            this.assetCollection.push(element.email);
          }
        
        
      });

  });
 }
 getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.assetCollection = this.assetCollection.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  close(){
    this.viewCtrl.dismiss();
  }

 
}




