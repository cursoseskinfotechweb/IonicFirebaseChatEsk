//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { UserModel } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { firestore } from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
    public afd: AngularFireDatabase,
    public http: HttpClientModule
  ) {
    
  }

  create(user: UserModel) :Promise<void> {
    return this.afd.object(`/users`)
      .set(user);
  }

}
