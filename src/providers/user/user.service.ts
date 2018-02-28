//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { UserModel } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { firestore } from 'firebase/app';
import { FirebaseOperation, AngularFireList } from 'angularfire2/database/interfaces';

@Injectable()
export class UserService {

  users: AngularFireList<UserModel[]>;

  constructor(
    public afd: AngularFireDatabase,
    public http: HttpClientModule
  ) {
    
  }

  create(user: UserModel) {
    return this.afd.list(`/users`)
      .push(user);
  }

}
