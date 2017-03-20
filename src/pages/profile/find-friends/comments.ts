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

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams
  ) {
    this.comments = this.params.get('comments');
//     let ref = firebase.database().ref('/assets').child(this.comments.id).child("likes");
  
// ref.on("value", function(snapshot) {
//  console.log(snapshot.val());
// }, function (errorObject) {
//  console.log("The read failed: " + errorObject.code);
// });
  }

  close(){
    this.viewCtrl.dismiss();
  }

  addComment(){
    this.newComment.user = {
      "username": "nicobytes",
      "avatar": "images/nicobytes.jpg"
    }
    this.arr.push( this.newComment );
    // firebase.database().ref('assets').child(this.comments).child("comments").push(this.newComment);
    this.newComment = {};
  }

}
