import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2/firebase.app.module';
import { LoginPage } from '../pages/login/login';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { AuthProvider } from '../providers/auth/auth';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AddfooditemPage } from '../pages/addfooditem/addfooditem';
import { AngularFireDatabase } from 'angularfire2/database';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ShowfooditemPage } from '../pages/showfooditem/showfooditem';
import { ShowallitemsPage } from '../pages/showallitems/showallitems';
import { EditfooditemPage } from '../pages/editfooditem/editfooditem';



export const globalVar1: string = '';

const FireBaseAuth = {
  apiKey: "AIzaSyA3rF5ghdssdZU3eq2cF-THuPldZiY1Vbg",
  authDomain: "dailyfoodcaloriesionic.firebaseapp.com",
  databaseURL: "https://dailyfoodcaloriesionic.firebaseio.com",
  projectId: "dailyfoodcaloriesionic",
  storageBucket: "dailyfoodcaloriesionic.appspot.com",
  messagingSenderId: "671441390404"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BarcodeScannerPage,
    AddfooditemPage,
    ShowfooditemPage,
    ShowallitemsPage,
    EditfooditemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FireBaseAuth),
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BarcodeScannerPage,
    AddfooditemPage,
    ShowfooditemPage,
    ShowallitemsPage,
    EditfooditemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireModule,
    BarcodeScanner,
    AuthProvider,
    SpeechRecognition,
    AngularFireDatabase,
    Network,
    ToastController
  ]
})
export class AppModule {}
