import { Component } from '@angular/core';
import { NavController , ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CommentsPage } from '../comments/comments';
import { HomePage } from '../home/home';
import { FindFriendsPage } from '../fiend-friends/fiend-friends';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    arr:any;
    cards: any;
    category: string = 'gear';
   // tab1Root: any = HomePage;
    likesNum:any;

 
    constructor(public navCtrl: NavController , private modalCrtl: ModalController) {
         this.arr={};
        this.cards = [];
        this.likesNum;
//    firebase.database().ref('assets').child(item.id).child("likes").once('value').then(function(snapshot) {
//    snapshot.forEach(function(likeSnapshot) {
//        var waleed = likeSnapshot.val();
//   waleed;
// })
     
//      })

      firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {
        
      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;
        //this.obj=element.likes;
         element.likes=Object.keys(element.likes).length;
        this.cards.push(element);
      })
    })
 
   }
   like(item: any): void{
    
    firebase.database().ref('assets').child(item.id).child("likes").child(firebase.auth().currentUser.uid.slice(-10)).set(1);
     firebase.database().ref('assets').child(item.id).child("likes").once('value', (_snapshot: any) => {
        this.arr=[];
      _snapshot.forEach((_childSnapshot) => {
       // console.log(_childSnapshot.key)
          this.arr[_childSnapshot.key]=_childSnapshot.val();
       // console.log(x)
       //   element.likes=Object.keys(element.likes).length;
       // this.cards.push(element);
      })

    })
     item.likes=Object.keys(this.arr).length;
  // item.likes=this.cards.likes;
  }
  showComments(item: any): void{
    let modal = this.modalCrtl.create(CommentsPage,{
      comments: [item.id]
    });
    modal.present();
  }
  addFriends():void{
   let modal = this.modalCrtl.create(FindFriendsPage);
    modal.present(); 
  }
 

}