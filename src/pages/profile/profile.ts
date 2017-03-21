import { Component } from '@angular/core';

import { AlertController, NavController ,ModalController} from 'ionic-angular';
import firebase from 'firebase';
import { Camera,Device } from 'ionic-native';
// import { LoginPage } from '../login/login';
// import { SupportPage } from '../support/support';
// import { UserData } from '../../providers/user-data';
import { AuthData } from '../../providers/auth-data';
import {LoginPage} from '../login/login';
import {FriendRequestPage} from '../friend-request/friend-request';
declare var window: any;
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
  constructor(public alertCtrl: AlertController, public nav: NavController, public authData: AuthData ,private modalCrtl:ModalController ) {

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

  makeFileIntoBlob(_imagePath) {

  // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

      fileEntry.file((resFile) => {

        var reader = new FileReader();
        reader.onloadend = (evt: any) => {
          var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
          imgBlob.name = 'sample.jpg';
          resolve(imgBlob);
        };

        reader.onerror = (e) => {
          console.log('Failed file read: ' + e.toString());
          reject(e);
        };

        reader.readAsArrayBuffer(resFile);
      });
    });
  });
}
uploadToFirebase(_imageBlob) {
  var fileName = 'sample-' + new Date().getTime() + '.jpg';

  return new Promise((resolve, reject) => {
    var fileRef = firebase.storage().ref('images/' + fileName);

    var uploadTask = fileRef.put(_imageBlob);

    uploadTask.on('state_changed', (_snapshot) => {
      console.log('snapshot progess ' + _snapshot);
    }, (_error) => {
      reject(_error);
    }, () => {
      // completion...
      resolve(uploadTask.snapshot);
    });
  });
}

saveToDatabaseAssetList(_uploadSnapshot) {
  var ref = firebase.database().ref('userProfile').child(firebase.auth().currentUser.uid).child("src");
  return new Promise((resolve, reject) => {
    alert('iam here ')
      
      
  
     var  URL= _uploadSnapshot.downloadURL // url to access file
      
      


    

    ref.set(URL, (_response) => {

      resolve(_response);
    }).catch((_error) => {
      reject(_error);
    });
     
 

    // we will save meta data of image in database

  });


}


doGetPicture() {

  // TODO:
  // get picture from camera

  console.log(Device)
  let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);




}

  updatePicture() {
   
   
   var options = {
     sourceType: 2,
     mediaType: 0
   };

   Camera.getPicture(options).then((_imagePath) => {
    alert('got image path ' + _imagePath);
    // convert picture to blob
    return this.makeFileIntoBlob(_imagePath);
  }).then((_imageBlob) => {
    alert('got image blob ' + _imageBlob);

    // upload the blob
    return this.uploadToFirebase(_imageBlob);
  }).then((_uploadSnapshot: any) => {
    alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

    // store reference to storage in database
    return this.saveToDatabaseAssetList(_uploadSnapshot);

  }).then((_uploadSnapshot: any) => {
    alert('file saved to asset catalog successfully  ');
  }, (_error) => {
    alert('Error ' + (_error.message || _error));
  });

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

  logout() {
    this.authData.logoutUser().then(() => {
    this.nav.setRoot(LoginPage);
  });

  }


   support(): void{
    let modal = this.modalCrtl.create(FriendRequestPage);
    modal.present();
  }  }

