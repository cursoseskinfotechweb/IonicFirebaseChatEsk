import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
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

}
