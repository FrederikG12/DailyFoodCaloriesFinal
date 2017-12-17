import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { EditfooditemPage } from '../editfooditem/editfooditem';

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
  public testt:Array<any>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.foodRef = firebase.database().ref('/foods');
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
      this.testt = test;
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowallitemsPage');
    
  }

  

  initializeItems(): void {
    this.foodList = this.loadedFoodList;
  }

  getItems(searchbar) {
    console.log(this.testt[0].pieces_[1]);
    
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    
    this.foodList = this.foodList.filter((v) => {
      if(v.id && q) {
        if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.foodList.length);
  
  }

  editItem(fooditem)
  {
    console.log(fooditem);
    this.navCtrl.push(EditfooditemPage, {paramfooditem: fooditem});
  }

}
