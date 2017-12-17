import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser;
  //foodList: FirebaseListObservable<any[]>;
  constructor(private network: Network, public afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public afDatabase: AngularFireDatabase) {
    //this.foodList = afDatabase.list('/foods').valueChanges();
    this.currentUser = this.afAuth.auth.currentUser;
  }


  

  ionViewDidEnter()
  {
    
  }

  logoutUser(): Promise<void> {
    this.navCtrl.setRoot(LoginPage);
    return this.afAuth.auth.signOut();
    
  }

}
