import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the ShowfooditemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showfooditem',
  templateUrl: 'showfooditem.html',
})
export class ShowfooditemPage {
  food;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

    this.food = navParams.get('param1'); //parameter ophalen
    this.alertCtrl.create({  //alert dat het item al in collectie zit
      title: 'Opgelet!',
      subTitle: "Dit iten zit al in uw collectie. Pas het aan in Collectie via het menu.",
      buttons: ['OK']
    }).present(); 
    
    
    console.log(this.food);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowfooditemPage');
  }

}
