//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
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
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService extends BaseService{

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;
  
  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: HttpClientModule
  ) {
    super();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`, 
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
    .map((users: User[]) => {      
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  create(user: User, uuid: string) : Promise<void> {
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string) : Observable<boolean> {
    return this.db.list(`/users`, 
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(username)
    )
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          console.log('Current User', this.currentUser);          
          this.setUsers(authUser.uid);
          console.log('Usuários', this.users);          
        }
      }
    );
}

}
