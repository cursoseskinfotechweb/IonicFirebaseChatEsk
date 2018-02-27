import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UserService {

  constructor(
    public afd: AngularFireDatabase,
    public http: HttpClient
  ) {
    
  }

  create(user: UserModel) {
    return this.afd.list(`/users`)
      .push(user);
  }

}
