import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { AngularFireAuth } from 'angularfire2/auth';
import { ShowallitemsPage } from '../pages/showallitems/showallitems';
import { AddfooditemPage } from '../pages/addfooditem/addfooditem';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(private toast: ToastController, private network: Network, public platform: Platform, public afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Barcode Scanner', component: BarcodeScannerPage },
      { title: 'Collectie', component: ShowallitemsPage }
      
    ];
    
    this.activePage = this.pages[0];

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

  }


  DisplayNetworkUpdate(connectionState: String)
  {
    let networkType = this.network.type;
    if (networkType == "none")
    {
      networkType = "Geen verbinding";
    }
    this.toast.create({
        message: 'u bent nu ' + connectionState + ' : ' + networkType,
        duration: 3000
    }).present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.network.onConnect().subscribe(data => 
      this.DisplayNetworkUpdate(data.type)
      ,
      error => ""
      
    );

    this.network.onDisconnect().subscribe(data => 
      this.DisplayNetworkUpdate(data.type)
      ,
      error => ""
      
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page)
  {
    return page == this.activePage;
  }
}
