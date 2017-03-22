import { Component, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera, Device } from 'ionic-native';
import * as firebase from 'firebase';
import { Geolocation} from 'ionic-native'
import {googlemaps} from 'googlemaps'; 
import { SignupPage } from '../signup/signup';

declare var window: any;


@Component({
  templateUrl: 'upload.html',
})
export class UploadPage {

  assetCollection
  userAuth: any
  userName: any
  newPost:any={};
  constructor(public navCtrl: NavController,
    public platform: Platform,
    private http: Http,
    private zone: NgZone
  ) {
 
  }

  trackByFunction(index, item) {
    return item.id
  }

  /**
   * here we will initialize the component
   */
  ionViewDidLoad() {
          this.loadData();
  }

  /** 
   * called after the user has logged in to load up the data
   */
  loadData() {
    var result = [];
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (_snapshot: any) => {

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        result.push(element);
      });

      this.assetCollection = result;
  

  });
}
makeFileIntoBlob(_imagePath) {
alert("1")
  // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
      alert("2")
      fileEntry.file((resFile) => {
        alert("3")
        var reader = new FileReader();
        alert("4")
        reader.onloadend = (evt: any) => {
          alert("5")
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
  var ref = firebase.database().ref('assets');
  return new Promise((resolve, reject) => {
    alert('iam here ')
      Geolocation.getCurrentPosition().then((position) => {
      alert(this.newPost) 
     var dataToSave = {
      'URL': _uploadSnapshot.downloadURL, // url to access file
      'name': _uploadSnapshot.metadata.name, // name of the file
      'owner': firebase.auth().currentUser.uid,
      'latitude':position.coords.latitude,
      'longitude':position.coords.longitude,
      'email': firebase.auth().currentUser.email,
      'lastUpdated': new Date().getTime(),
      'likes':0,
      'post':this.newPost,
      'comments':"hello"

    };
    alert("go") 

    ref.push(dataToSave, (_response) => {

      resolve(_response);
      this.newPost=undefined;
    }).catch((_error) => {
      reject(_error);
    });
     
 
    }, (err) => {
      console.log(err);
    });

    // we will save meta data of image in database

  });


}


doGetPicture() {

  // TODO:
  // get picture from camera

  console.log(Device)
  let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);

  Camera.getPicture({
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: imageSource,
    targetHeight: 640,
    correctOrientation: true
  }).then((_imagePath) => {
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
}

@Component({
  selector: "item-component",
  template: `
      <p>{{i}} - {{item.name}}</p>
      <p>{{item.lastUpdated}}</p>
      <img [src]=item.URL width="180px" class="padding"/>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: any;

  constructor() {

  }
}