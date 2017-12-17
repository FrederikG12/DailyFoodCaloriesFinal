import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
foodList: AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase, private alertCtrl: AlertController) {
    this.fooditem = navParams.get('paramfooditem');
    this.foodList = afDatabase.list('/foods');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditfooditemPage');
  }

  updateFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode)
  {
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode);
    newFoodRef.update({
      quantity: hoeveelheid,
      calories: calorien,
      protein: proteins,
      carbonhydrates: koolhydraten,
      fats: vetten,
      id : productNaam
    }).then (newFood => {
      this.navCtrl.pop();
    }, error => {
      this.alertCtrl.create({ 
        title: 'Oops! Er ging iets mis!',
        subTitle: "Error : " + error,
        buttons: ['OK']
      }).present(); 
    });
  }

  deleteFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode)
  {
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode);
    newFoodRef.remove();
    this.navCtrl.pop();
  }

}
