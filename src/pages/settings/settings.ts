import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private androidPermissions: AndroidPermissions ,private alertCtrl: AlertController ,private speech: SpeechRecognition ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  getMicPermission() { //microfoon permissie vragen
    this.speech.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speech.requestPermission();
          this.alertCtrl.create({  //permissie is ok
            title: 'Permissie OK',
            buttons: ['OK'] 
          }).present(); 
        }
        else{
          this.alertCtrl.create({ 
            title: 'Permissie OK!', //melding dat permissie ok is
            buttons: ['OK'] 
          }).present(); 
        }
      });
  }

  getCamPermission()
  {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then( //permissie voor camera
      result => this.alertCtrl.create({ //toon aan dat het gelukt is
        title: 'Permissie OK!',
        subTitle: result.hasPermission,
        buttons: ['OK'] 
      }).present(),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA) //anders permissie vragen
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]); //permissie vragen

  }

}
