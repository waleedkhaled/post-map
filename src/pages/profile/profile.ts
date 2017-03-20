import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Camera,Device } from 'ionic-native';
// import { LoginPage } from '../login/login';
// import { SupportPage } from '../support/support';
// import { UserData } from '../../providers/user-data';
import { AuthData } from '../../providers/auth-data';
import {LoginPage} from '../login/login';



@Component({
  selector: 'page-account',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: string;
  email : string;
  src : string; 
   userId = firebase.auth().currentUser.uid
// , public userData: UserData
  constructor(public alertCtrl: AlertController, public nav: NavController, public authData: AuthData) {

  }

  // ngAfterViewInit() {
  //   this.getUsername();
  // }
    ionViewDidLoad(){


  let user =  firebase.database().ref('/userProfile').child(this.userId).on('value', (_snapshot: any) => {
      this.username = _snapshot.val().user;
      this.email= _snapshot.val().email;
      this.src = _snapshot.val().src;
      })
}

  

  updatePicture() {
   
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log(data)
        firebase.database().ref('/userProfile').child(this.userId).set({user:data.username,email:this.email,src:this.src});
      //  this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    // this.userData.getUsername().then((username) => {
    //   this.username = username;
    // });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authData.logoutUser().then(() => {
    this.nav.setRoot(LoginPage);
  });
    // this.userData.logout();
    // this.nav.setRoot(LoginPage);
  }

  support() {
    // this.nav.push(SupportPage);
  }
}
