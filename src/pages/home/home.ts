import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireList } from 'angularfire2/database';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<UserModel[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {
  }

  ionViewDidLoad() {
    this.users =  this.userService.users
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
  }

  onChatCreate(user: UserModel) : void {
    console.log(user)
  }

}
