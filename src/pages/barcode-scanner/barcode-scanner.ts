import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AddfooditemPage } from '../addfooditem/addfooditem';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';
import { ShowfooditemPage } from '../showfooditem/showfooditem';


/**
 * Generated class for the BarcodeScannerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html'
})
export class BarcodeScannerPage {

  foodList: AngularFireList<any>; //variabele declareren
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private afDatabase: AngularFireDatabase) {

    this.foodList = afDatabase.list('/foods', ); //database connectie met /foods

  }

  

  Scan() //scanner in camera openen als hier op gedrukt wordt
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      
      if(barcodeData.text != "")
      {
        this.CheckItemInDatabase(barcodeData.text); //als barcode gevonden is dit uirvoeren
      }
      
      
     }, (err) => {
         console.log(err); //anders is er een error
     });
  }

  addFood()
  {
    this.navCtrl.push(AddfooditemPage);
  }

  CheckItemInDatabase(barcode) //check het product met dus de barcode in de database
  {
      const foodRef: firebase.database.Reference = firebase.database().ref(`/foods/`+barcode);
      foodRef
        .once('value').then(snapshot => {
          let food = [];
          //let food:Array<any>;
          
          if(snapshot.val() != null) //als de waarde in de database bestaat gaat er een nieuwe pagina geopend worden.
          {
            food.push(snapshot.val());
            this.navCtrl.push(ShowfooditemPage, {param1: food, param2: barcode});
          }
          else
          {
            let confirm = this.alertCtrl.create({ //anders krijg je de optie om een product toe te voegen
              title: 'product niet gevonden in collectie!',
              message: ' Wilt u het product toevoegen aan uw collectie?',
              buttons: [
                {
                  text: 'Annuleer',
                  handler: () => {
                    
                  }
                },
                {
                  text: 'Toevoegen',
                  handler: () => {
                    
                    this.navCtrl.push(AddfooditemPage, {parambarcode: barcode});
                    
                  }
                }
              ]
            });
            confirm.present();
          }
          
          
          
            
          
    
    }).catch( (error) => { //anders ook toevoegen van nieuw product.
      let confirm = this.alertCtrl.create({
        title: 'Barcode niet gevonden!',
        message: error + ' Wilt u het product toevoegen aan uw collectie?',
        buttons: [
          {
            text: 'Annuleer',
            handler: () => {
              
            }
          },
          {
            text: 'Toevoegen',
            handler: () => {
              
              this.navCtrl.push(AddfooditemPage, {parambarcode: barcode});
              
            }
          }
        ]
      });
      confirm.present();
    });
  }

}
