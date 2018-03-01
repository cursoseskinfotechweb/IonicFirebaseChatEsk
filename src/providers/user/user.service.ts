//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { firestore } from 'firebase/app';
import { FirebaseOperation, AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  users: Observable<User[]>;

  constructor(
    public afd: AngularFireDatabase,
    public http: HttpClientModule
  ) {
    this.users = this.afd.list<User>('users')
      .valueChanges();
  }

  create(user: User) {
    return this.afd.object(`/users/${user.uid}`).set(user);
  }

}
