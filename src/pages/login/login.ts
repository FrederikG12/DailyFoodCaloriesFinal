import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  @ViewChild('username') user;
  @ViewChild('password') passw;



  
  constructor(private toast: ToastController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  ionViewDidEnter()
  {
    
    
  }

  alertLoggedin(message: string)
  {
    this.alertCtrl.create({
      title: 'Daily Food Calories',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  Login()
  {
    console.log('sign in with : ', this.user.value, this.passw.value);
    if (this.user.value != "" && this.passw.value != "")
    {

    
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.passw.value)
    .then( data => {
      console.log("got some data", this.fire.auth.currentUser);
      //this.alertLoggedin(this.fire.auth.currentUser.email + ", U bent ingelogd!");
      this.navCtrl.setRoot( HomePage );
    })
    .catch(error => {
      console.log("got an error", error);
      this.alertLoggedin("Error "+error.message);
      this.navCtrl.setRoot( LoginPage );
      //this.navCtrl.setRoot(RegisterPage);
    });
  }
  else
  {
    this.navCtrl.setRoot(LoginPage);
  }
  }
  
  register ={};
  
  registerForm()
  {
    
    console.log(this.register['email']);
    if (this.register['email'] != "" && this.register['password'] != "")
    {
      this.fire.auth.createUserWithEmailAndPassword(this.register['email'], this.register['password'])
      .then( data => {
          this.navCtrl.setRoot(HomePage);
      })
      .catch( error => {
        this.alertLoggedin("Error :" +error.message);
      });
    }
    
  }

}
