import { Inject, Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire";
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';
import Swal from "sweetalert2";
import { Anunciante } from "../models/anunciante.model";
import { Constants } from "../utils/constants";
import{HubConnectionService} from "./hubconnection.service"
import{Order} from "src/app/shared/models/order.model"
import { Local } from "../models/local.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { EventEmitter }  from 'src/app/shared/helpers/EventeHelper';
import { OrderService } from "./order.service";
import { LocalStorageService } from "./local-storage.service";
import { Title } from "@angular/platform-browser";


@Injectable()
export class  FCMService{
    currentMessage = new BehaviorSubject(null);
    private messaging: firebase.messaging.Messaging;
    private receivedMessage = false;
public prop: any;
    constructor(private angularFirebaseMessaging: AngularFireMessaging,
        @Inject(FirebaseApp) private _firebaseApp: firebase.app.App,
        private orderService: OrderService,
        private localStorageService: LocalStorageService,
        private hub: HubConnectionService,
        private router: Router,
        private title :Title
        ){
        this.angularFirebaseMessaging.messaging.subscribe(
            (_messaging) => {
              _messaging.onMessage = _messaging.onMessage.bind(_messaging);
              _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
              _messaging.onBackgroundMessage = _messaging.onBackgroundMessage.bind(_messaging)
              _messaging.setBackgroundMessageHandler = _messaging.setBackgroundMessageHandler.bind(_messaging)
            })
          this.messaging = firebase.messaging(this._firebaseApp);
          setInterval(()=>{this.verifyNewOrderByTime()}, 20000);
    }

    requestPerm(){
        this.angularFirebaseMessaging.requestToken.subscribe((token)=>{
            let anunciante = JSON.parse(localStorage.getItem(Constants.ANUNCIANTE)) as Anunciante;
            let local = JSON.parse(localStorage.getItem(Constants.LOCAL)) as Local;
            let storagedToken = localStorage.getItem(Constants.TOKEN);
            if(anunciante && !storagedToken){
                localStorage.setItem(Constants.TOKEN, token)
                this.hub.setConectionToken(local!=null ? local.id : anunciante.locais[0].id,token).subscribe(item=>{
                    console.log(item)

                },error=>{
                    console.log(error)
                })
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
                if(!this.receivedMessage){
                    this.receivedMessage = true;
                    this.title.setTitle("Novo pedido em aberto")
                    this.playAudio()
                    Swal.fire('Recebemos um novo pedido! ',
                    'Fique atento para o formato de pagamento e lembre-se de sinalizar que o pedido saiu para entrega.',
                    'success').then(()=>{
                        if(!this.router.isActive("/dashboard/orders", true)){
                            this.router.navigate(['/dashboard/orders']);
                        }
                        else{
                            let local =  this.localStorageService.getLocal();
                            if(local !=null){
                                this.orderService.getAll(local.id).subscribe(item=>{
                                    EventEmitter.emit('newOrder',item);
                                })
                            }
                        }
                        this.title.setTitle("Mobo - Painel do Anunciante")
                        this.receivedMessage = false;
                    })
                }
            
            
        })
    }
    verifyNewOrderByTime(){
        let local =  this.localStorageService.getLocal();
        let order = this.localStorageService.getOrder();
        if(local != null){
            let localId =  local.id;
            this.orderService.getAll(localId).subscribe(item=>{
                if((item != null && order == null) || (item.value.length > order.value.length)){
                    this.receivedMessage = true;
                    this.playAudio()
                    this.title.setTitle("Novo pedido em aberto")
                    Swal.fire('Recebemos um novo pedido! ',
                    'Fique atento para o formato de pagamento e lembre-se de sinalizar que o pedido saiu para entrega.',
                    'success').then(()=>{
                        if(!this.router.isActive("/dashboard/orders", true)){
                            this.router.navigate(['/dashboard/orders']);
                        }
                        else{
                            EventEmitter.emit('newOrder',item);
                        }
                        this.title.setTitle("Mobo - Painel do Anunciante")
                        this.receivedMessage = false;
                    })
                }
                
            })
        }
    }
    playAudio(){
        let audio = new Audio();
        audio.src = "../../../assets/audio/NewMessage.mp3";
        audio.load();
        audio.play();
      }
}