import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'comments.html',
})
export class CommentsPage {
  arr:any[]=[];
  comments: any;
  newComment: any = {};
   item :any;
  constructor(
    private viewCtrl: ViewController,
    private params: NavParams
  ) {
    this.item = this.params.get('item');
 
   // 
     firebase.database().ref('assets').child(this.item).child("comments").once('value', (_snapshot: any) => {
        this.arr=[];
      _snapshot.forEach((_childSnapshot) => {
      // var obj={}
        // obj[_childSnapshot.key]=_childSnapshot.val();
       for(var i in _childSnapshot.val()){
         this.arr.push(_childSnapshot.val()[i]);
         console.log(_childSnapshot.val()[i])
       }
      
      
       //   element.likes=Object.keys(element.likes).length;
       // this.cards.push(element);
      })
  })
   }

  close(){
    this.viewCtrl.dismiss();
  }

  addComment(){
    var x=firebase.auth().currentUser.email
    this.newComment.user = {
      "username": x.slice(0,x.indexOf("@")),
      "avatar": "images/nicobytes.jpg"
    }
   if(this.newComment.comments!==undefined){
   this.arr.push(this.newComment) 
   firebase.database().ref('assets').child(this.item).child("comments").child(firebase.auth().currentUser.uid.slice(-10)).push(this.newComment);
    }
    this.newComment = {};
  }

}
