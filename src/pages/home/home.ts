import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser;
  //foodList: FirebaseListObservable<any[]>;
  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController) {
    //this.foodList = afDatabase.list('/foods').valueChanges();
    this.currentUser = this.afAuth.auth.currentUser;
  }


  

  ionViewDidEnter()
  {
    
  }

  logoutUser(): Promise<void> {
    this.navCtrl.setRoot(LoginPage);
    return this.afAuth.auth.signOut(); //user uitloggen
    
  }

}
