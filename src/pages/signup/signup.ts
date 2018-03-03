import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

@Injectable()
export class SignupPage {

  signupForm : FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, 
                    Validators.pattern(emailRegex)])
             ],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(): void {
    
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    
    console.log(formUser);

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          })
          .then((authUser: firebase.User) => {
      
            delete formUser.password;
            formUser.uid = authUser.uid;
      
            this.userService.create(formUser)
            .then(() => {
              console.log('Usuário cadastrado com sucesso!')
              loading.dismiss();
            })
            .catch((error: any) => {
              console.log(error)
              loading.dismiss();
              this.showAlert(error);
            })
          })
          .catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });

        } else {
          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();
        }
      }); 

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
