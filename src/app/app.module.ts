import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { UserService } from '../providers/user/user.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseAppConfig } from '../environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../providers/auth/auth.service';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SigninPage } from '../pages/signin/signin';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage, 
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService,
    ChatService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AngularFireAuth,
  ]
})
export class AppModule {}

