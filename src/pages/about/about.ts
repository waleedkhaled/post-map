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
    arr:any={};
    cards: any;
    category: string = 'gear';
   // tab1Root: any = HomePage;
    likesNum:any;
    friendsArr:any[]=[];
     picture:any;
    constructor(public navCtrl: NavController , private modalCrtl: ModalController) {
        this.cards = [];
        this.likesNum;
  
      firebase.database().ref("/userProfile").child(firebase.auth().currentUser.uid).child("friends").once('value', (_snapshot: any) => {
            let friends=[];
      _snapshot.forEach((_childSnapshot) => {
         friends.push(_childSnapshot.val())
          })
      this.friendsArr=friends;
      });
      firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {
        
      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;
        //to set the post "" if no one ...
        if(this.friendsArr.indexOf(element.owner)>-1){
           if(element.post===undefined){
             element.post={post:""};
           }

        firebase.database().ref('assets').child(element.id).child("likes").once('value',(_snapshot: any) => {
         this.arr={}
         _snapshot.forEach((_childSnapshot) => {
           this.arr[_childSnapshot.key]=1;
            //console.log(obj)
          })
         element.likes=Object.keys(this.arr).length;
         })
        //console.log(this.arr)
         
         //to get profile image ....
         var database= firebase.database().ref('userProfile').child(element.owner);
         database.child('src').on("value", function(snapshot) {
         element.src=snapshot.val();
             })
         
        //to get name of user ...
         element.user=element.email.slice(0,element.email.indexOf("@"));
         this.cards.push(element);
     
         }
      })
    })
 
   }
   like(item: any): void{
     // item.likes=Object.keys(this.arr).length;
     var data=firebase.database().ref('assets').child(item.id).child("likes");
    data.child(firebase.auth().currentUser.uid).set(1);
    data.once("value")
 .then(function(snapshot) {
   item.likes = snapshot.numChildren(); 
  
 });
   
  }
  showComments(item: any): void{
    let modal = this.modalCrtl.create(CommentsPage,{
      item: item.id
    });
    modal.present();
  }
  addFriends():void{
   let modal = this.modalCrtl.create(FindFriendsPage);
    modal.present(); 
  }
}