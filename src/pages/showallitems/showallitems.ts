import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { EditfooditemPage } from '../editfooditem/editfooditem';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
/**
 * Generated class for the ShowallitemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showallitems',
  templateUrl: 'showallitems.html',
})
export class ShowallitemsPage {

  public foodList:Array<any>;
  public loadedFoodList:Array<any>;
  public foodRef:firebase.database.Reference;
  public speechmatches = [];
  public isRecording;

  constructor(public navCtrl: NavController, public navParams: NavParams, private speech: SpeechRecognition, private cd: ChangeDetectorRef) {
    this.foodRef = firebase.database().ref('/foods'); //bij het inladen van deze pagina alles van database ophalen
    this.foodRef.on('value', foodList => {
      let foods = [];
      let test = [];
      foodList.forEach( food => {
        foods.push({item: food.val(), path: food.ref.path});
        test.push(food.ref.path);
        return false;
      });
      
      this.foodList = foods;
      this.loadedFoodList = foods;
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowallitemsPage');
    
  }

  

  startListening() {
    let options = {
      language: 'nl-BE'
    }
    this.speech.startListening().subscribe(matches => {
      this.speechmatches = matches;
      this.foodList = this.foodList.filter((v) => {
        if(v.item.id && matches[0]) {
          if (v.item.id.toLowerCase().indexOf(matches[0].toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
      this.cd.detectChanges();
      
    });
    this.isRecording = true;
  }
 


  initializeItems(): void {
    this.foodList = this.loadedFoodList;
  }
 
  getItems(searchbar) { //searchbar werkend
    //console.log(this.testt[0].pieces_[1]);
    
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    
    this.foodList = this.foodList.filter((v) => {
      if(v.item.id && q) {
        if (v.item.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.foodList.length);
  
  }

  editItem(fooditem) //knop om pagina te openen om product te bewerken
  {
    console.log(fooditem);
    this.navCtrl.push(EditfooditemPage, {paramfooditem: fooditem});
  }

}
