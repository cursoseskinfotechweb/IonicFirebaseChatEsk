import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireList } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth/auth.service';
import { SigninPage } from '../signin/signin';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService
  ) {
  }

  ionViewCanEnter() : Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.users =  this.userService.users
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User) : void {
    console.log(user)
  }

}
