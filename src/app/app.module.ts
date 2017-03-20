import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { InfoModalPage } from '../pages/info-modal/info-modal' ;
import { UploadPage } from '../pages/upload/upload';
import { ItemComponent } from './../pages/upload/upload';
import { AuthData } from '../providers/auth-data';
import { FriendsPage } from '../pages/friends/friends'; 
import { ProfilePage } from '../pages/profile/profile';
import { CommentsPage } from '../pages/comments/comments';
import { FindFriendsPage } from '../pages/fiend-friends/fiend-friends';
//import { EmailValidator } from './validators/email-validator';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InfoModalPage,
    LoginPage,
    UploadPage,
    ItemComponent,
    ResetPasswordPage,
    SignupPage,
    FriendsPage,
    ProfilePage,
    CommentsPage,
    FindFriendsPage
   // EmailValidator 
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    InfoModalPage,
    TabsPage,
    LoginPage,
    UploadPage,
    ItemComponent,
     ResetPasswordPage,
    SignupPage,
    FriendsPage,
    ProfilePage,
    CommentsPage,
    FindFriendsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AuthData]
})
export class AppModule {}
