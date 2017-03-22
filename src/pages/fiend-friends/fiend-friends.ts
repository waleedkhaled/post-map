import { Component ,Pipe, PipeTransform, Injectable } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
   selector: 'page-fiend-friends',
  templateUrl: 'fiend-friends.html'
})
export class FindFriendsPage{
  assetCollection1: any[] = [];
  assetCollection2: any[]=[];
  friendsArr:any[]=[];
  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
firebase.database().ref("/userProfile").child(firebase.auth().currentUser.uid).child("friends").once('value', (_snapshot: any) => {
            let friends=[];
      _snapshot.forEach((_childSnapshot) => {
         friends.push(_childSnapshot.val())
          })
         this.friendsArr=friends;
       });
  console.log(this.friendsArr)
        firebase.database().ref("/userProfile").once('value', (_snapshot: any) => {
            let arr=[];
      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
          var element = _childSnapshot.val();
          element.id = _childSnapshot.key;
          console.log(element)
          if(element.email!==firebase.auth().currentUser.email&&this.friendsArr.indexOf(element.uid)===-1){
            element.email=element.email.slice(0,element.email.indexOf('@'));
            arr.push(element);
          }
      });
           this.assetCollection1=arr;
           this.assetCollection2=arr; 
     }); 
  }
  initializeItems() {
    this.assetCollection1=this.assetCollection2;

 }
 getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if(!val){
      return;
    }

    // if the value is an empty string don't filter the items
      this.assetCollection1 = this.assetCollection1.filter((item) => {
        if (val && item) {
         if(item.email.toLowerCase().indexOf(val.toLowerCase()) > -1){
            return true;
         }
      
       return false;
     }
      })
    
  }

  close(){
    this.viewCtrl.dismiss();
  }
  addFriend(x){
     var userName;
    firebase.database().ref("/userProfile").child(firebase.auth().currentUser.uid).child('user').on("value", function(snapshot) {
    userName=snapshot.val();
    console.log(userName)
    })
   
    if(userName){
    var database=firebase.database().ref("/userProfile").child(x).child("friendRequests").child(firebase.auth().currentUser.uid).set(userName);
     }
    else{
     alert("error friend hasn't been added please try again")
     }
  }


 
}




