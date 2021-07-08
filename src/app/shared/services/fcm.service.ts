import { Inject, Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class  FCMService{
    currentMessage = new BehaviorSubject(null);
    private messaging: firebase.messaging.Messaging; 
    constructor(private angularFirebaseMessaging: AngularFireMessaging,
        @Inject(FirebaseApp) private _firebaseApp: firebase.app.App){
        this.angularFirebaseMessaging.messaging.subscribe(
            (_messaging) => {
              _messaging.onMessage = _messaging.onMessage.bind(_messaging);
              _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
          )

          this.messaging = firebase.messaging(this._firebaseApp);
     
    }

    requestPerm(){
        this.angularFirebaseMessaging.requestToken.subscribe((token)=>{
            console.log(token);
        },
        (err)=>
        {
            console.error("No Permission "+ err);
        })
    }

    receiveMessage(){
        this.angularFirebaseMessaging.messages.subscribe(
            (payload) => {
              console.log("new message received. ", payload);
              this.currentMessage.next(payload);
            })
            this.angularFirebaseMessaging.messaging.subscribe(
                (m) => {
                  m.onBackgroundMessage
                  
                })
            
    }
}