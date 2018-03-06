import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth/auth.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
                    Validators.pattern(emailRegex)])
             ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    this.authService.signWithEmail(this.signinForm.value)
      .then((isLogged:boolean) => {
        if (isLogged) {
          this.navCtrl.push(HomePage);
          loading.dismiss();
        }
      })
      .catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
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

  onHomePage(): void {
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado: '+hasAccess);
      })
      .catch(err => {
        console.log('Não autorizado: ', err);
      });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
