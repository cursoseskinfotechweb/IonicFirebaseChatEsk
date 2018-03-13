import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseService } from '../base.service';

@Injectable()
export class AuthService extends BaseService{

  constructor(
    public afAuth: AngularFireAuth,
    public http: HttpClient
  ) {
    super();
    console.log('Hello AuthService service');
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
      .catch(this.handlePromiseError);
  }

  signWithEmail(user: {email: string, password: string}): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        console.log(user);
        return user != null;
      })
      .catch(this.handlePromiseError);
  }
 
  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .first()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }

}
