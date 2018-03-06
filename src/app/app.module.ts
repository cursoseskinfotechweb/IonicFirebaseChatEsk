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

import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../pages/signin/signin';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AngularFireAuth,
  ]
})
export class AppModule {}

