//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
//import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { firestore } from 'firebase/app';
import { FirebaseOperation, AngularFireList } from 'angularfire2/database/interfaces';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base.service';

import * as firebase from 'firebase/app';

@Injectable()
export class UserService extends BaseService{

  users: Observable<User[]>;

  constructor(
    public afd: AngularFireDatabase,
    public http: HttpClientModule
  ) {
    super();
    this.users = this.afd.list<User>('users')
      .valueChanges();
  }

  create(user: User, uuid: string) : Promise<void> {
    return this.afd.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string) : Observable<boolean> {
    return this.afd.list(`/users`, 
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(username)
    )
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
