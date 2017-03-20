import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  timeline: any[] = [];
  posts
  result
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
}
  ionViewDidLoad() {

   this.frindsPost();
     }

  frindsPost(){
    let arr=[];
    let users=[]
   this.result=[];
    this.posts=[];
    // load data from firebase...
       firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

           _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
             var element = _childSnapshot.val();
              element.id = _childSnapshot.key;

              this.result.push(element);
              // console.log(this.result)
           })
             }); 
     let database=firebase.database().ref("/userProfile");
     let friends=database.child(firebase.auth().currentUser.uid).child('friends');
  //let friends=database.child("userProfile").child(firebase.auth().currentUser.uid).child('friends');
 console.log(this.result)
 friends.once("value").then(function(x){
   console.log(x.val());
   for(var k in x.val()){
    // console.log("x.val()");
       // for(var i=0;i<this.result.length;i++){
       //    if(k===(this.result[i]['owner'].slice(-10))){
       //       console.log("jjjjjj")
       //       // for(var img in this.result){
       //       //   if(this.result[img]["owner"].slice(-10) === k){
       //       //     this.posts.push(this.result[img])
       //       //     console.log("lllll"+this.result[img])
       //       //   }

       //      }
             
       //  }
       
        }
     // }
    });
 // });
  // console.log(this.posts)
     }
  }

