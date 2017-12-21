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

  barcode; // variabelen instantieren

  constructor(private toast: ToastController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {

    this.foodList = afDatabase.list('/foods'); //connectie maken met database met /foods waar de barcodes inzitten
    this.barcode = navParams.get('parambarcode'); //parameter ophalen
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfooditemPage');
  }

  createFood(productNaam, calorien, hoeveelheid, proteins, koolhydraten, vetten, barcode) //product in database toevoegen
  {
    
    const newFoodRef: firebase.database.Reference = firebase.database().ref('/foods/' + barcode);

    //const personRef: firebase.database.Reference = firebase.database().ref(branch + auth);
    newFoodRef.set({ //referentie met de barcode als hoofdpuntje
      quantity: hoeveelheid,
      calories: calorien,
      protein: proteins,
      carbonhydrates: koolhydraten,
      fats: vetten, //al deze dingen in database opslaan
      id : productNaam
    }).then (newFood => {
      this.toast.create({
        message: productNaam + ' werd aangemaakt!', //melding dat het gelukt is
        duration: 3000
      }).present();
      this.navCtrl.pop();
    }, error => {
      this.alertCtrl.create({ 
        title: 'Oops! Er ging iets mis!', //melding dat er iets fout gegaan is
        subTitle: "Error : " + error,
        buttons: ['OK']
      }).present(); 
    });
    
    //var foodList = ref.child("books");
    

  }

}
