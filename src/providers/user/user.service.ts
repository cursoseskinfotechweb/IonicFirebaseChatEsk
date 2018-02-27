import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class UserService {

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    console.log('Hello UserProvider Provider');
  }

}
