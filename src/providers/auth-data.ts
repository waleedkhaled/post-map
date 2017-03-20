//import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
// import {Observable} from 'rxjs/Observable';
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;
  constructor() {
  this.fireAuth = firebase.auth();
  this.userProfile = firebase.database().ref('/userProfile');
  }
  loginUser(email: string, password: string): firebase.Promise<any> {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
}
signupUser(email: string, password: string,userName:string): firebase.Promise<any> {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userProfile.child(newUser.uid).set({email: email,uid:newUser.uid,user:userName,src:'http://www.hbc333.com/data/out/190/47199326-profile-pictures.png'});
      
    });
}
resetPassword(email: string): firebase.Promise<any> {
  return this.fireAuth.sendPasswordResetEmail(email);
}
logoutUser(): firebase.Promise<any> {
  return this.fireAuth.signOut();
}
}


// export class User {
//   name: string;
//   email: string;
 
//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }
// }





//@Injectable()




// export class Auth {
// currentUser: User;
//   constructor(public http: Http) {
//     console.log('Hello Auth Provider');
//   }

//  public login(credentials) {
//    console.log(credentials)
//     if (credentials.email === null || credentials.password === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       return Observable.create(observer => {
//         console.log(observer)
//         // At this point make a request to your backend to make a real check!
//         let access = (credentials.password === "pass" && credentials.email === "email");
//         // may be here will be storing the token 
//         this.currentUser = new User('Simon', 'saimon@devdactic.com');
//         observer.next(access);
//         observer.complete();
//       });
//     }
//   }


// //here i have to create a new user with backend 
//  public register(credentials) {
//     if (credentials.email === null || credentials.password === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       // At this point store the credentials to your backend!
//       return Observable.create(observer => {
//         observer.next(true);
//         observer.complete();
//       });
//     }
//   }
 
//   public getUserInfo() : User {
//     return this.currentUser;
//   }
 
//   public logout() {
//     return Observable.create(observer => {
//       this.currentUser = null;
//       observer.next(true);
//       observer.complete();
//     });
//   }

  




// }
