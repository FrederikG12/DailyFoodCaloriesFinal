import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the EditfooditemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editfooditem',
  templateUrl: 'editfooditem.html',
})
export class EditfooditemPage {
fooditem;
foodList: AngularFireList<any>; //variabelen declareren
  constructor(private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase, private alertCtrl: AlertController) {
    this.fooditem = navParams.get('paramfooditem'); //parameter navigatie opvragen
    this.foodList = afDatabase.list('/foods'); //database connectie met /foods
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditfooditemPage');
  }

  updateFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode) //product updaten
  {
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode);
    newFoodRef.update({ //referentie met barcode als hoofdpuntje
      quantity: hoeveelheid,
      calories: calorien,
      protein: proteins,
      carbonhydrates: koolhydraten,
      fats: vetten,
      id : productNaam
    }).then (newFood => {
      this.toast.create({
        message: productNaam + ' geüpdate!', //melding dat het gelukt is
        duration: 3000
      }).present();
      this.navCtrl.pop();
    }, error => {
      this.alertCtrl.create({ 
        title: 'Oops! Er ging iets mis!',//melding dat het fout gelopen is
        subTitle: "Error : " + error,
        buttons: ['OK']
      }).present(); 
    });
  }

  deleteFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode) //voedsel deleten
  {
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode); 
    newFoodRef.remove();
    this.toast.create({
      message: productNaam + ' verwijderd!', //melding dat het verwijderd is
      duration: 3000
    }).present();
    this.navCtrl.pop();
    
  }

}
