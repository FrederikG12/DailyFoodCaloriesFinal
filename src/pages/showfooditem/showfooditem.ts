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

    this.food = navParams.get('param1');
    
    
    this.alertCtrl.create({
      title: 'object ...',
      subTitle: this.food[0].name + 'test2',
      buttons: ['OK']
    }).present(); 
    console.log(this.food);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowfooditemPage');
  }

}
