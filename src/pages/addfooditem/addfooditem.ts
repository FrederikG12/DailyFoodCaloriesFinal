import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the AddfooditemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfooditem',
  templateUrl: 'addfooditem.html',
})
export class AddfooditemPage {

  foodList: AngularFireList<any>;
  tablenames;
  singelitem;

  barcode;

  constructor(private toast: ToastController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {

    this.foodList = afDatabase.list('/foods');
    this.barcode = navParams.get('parambarcode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfooditemPage');
  }

  createFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode)
  {
    
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode);

    //const personRef: firebase.database.Reference = firebase.database().ref(branch + auth);
    newFoodRef.set({
      quantity: hoeveelheid,
      calories: calorien,
      protein: proteins,
      carbonhydrates: koolhydraten,
      fats: vetten,
      id : productNaam
    }).then (newFood => {
      this.toast.create({
        message: productNaam + ' werd aangemaakt!',
        duration: 3000
      }).present();
      this.navCtrl.pop();
    }, error => {
      this.alertCtrl.create({ 
        title: 'Oops! Er ging iets mis!',
        subTitle: "Error : " + error,
        buttons: ['OK']
      }).present(); 
    });
    
    //var foodList = ref.child("books");
    

  }

}
