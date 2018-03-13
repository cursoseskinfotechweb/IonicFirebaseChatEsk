import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
  }

  ionViewCanEnter() {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      }
    );
  }

}
