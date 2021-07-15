import { Inject, Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';
import {EventEmitter} from "src/EventEmitter.js"
import Swal from "sweetalert2";
import { Anunciante } from "../models/anunciante.model";
import { Constants } from "../utils/constants";
import{HubConnectionService} from "./hubconnection.service"
import{Order} from "src/app/shared/models/order.model"

@Injectable()
export class  FCMService{
    currentMessage = new BehaviorSubject(null);
    private messaging: firebase.messaging.Messaging;
public prop: any;
    constructor(private angularFirebaseMessaging: AngularFireMessaging,
        @Inject(FirebaseApp) private _firebaseApp: firebase.app.App,
        private hub: HubConnectionService,
        ){
        this.angularFirebaseMessaging.messaging.subscribe(
            (_messaging) => {
              _messaging.onMessage = _messaging.onMessage.bind(_messaging);
              _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
              _messaging.onBackgroundMessage = _messaging.onBackgroundMessage.bind(_messaging)
              _messaging.setBackgroundMessageHandler = _messaging.setBackgroundMessageHandler.bind(_messaging)
            })
          this.messaging = firebase.messaging(this._firebaseApp);
          
    }

    requestPerm(){
        this.angularFirebaseMessaging.requestToken.subscribe((token)=>{
            console.log(token);
            let anunciante = JSON.parse(localStorage.getItem(Constants.ANUNCIANTE)) as Anunciante;
            let storagedToken = localStorage.getItem(Constants.TOKEN);
            if(anunciante && !storagedToken){
                localStorage.setItem(Constants.TOKEN, token)
                console.log(anunciante.locais[0].id);
                this.hub.setConectionToken(anunciante.locais[0].id,token)
            }
        },
        (err)=>
        {
            console.error("No Permission "+ err);
        })
    }

    receiveMessage(){
        this.angularFirebaseMessaging.messages.subscribe(
            (payload: any) => {
            let order = JSON.parse(payload.notification.body) as Order
            console.log("new message received. ",order);
            //   Swal.fire(payload)
            this.currentMessage.next(order);
        })
    }
}