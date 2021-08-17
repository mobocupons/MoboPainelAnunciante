import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: any[];
private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://dev.mobo.com.br/PedidoHub',{
                                headers:{
                                    "Content-Type": "application/json",
                                    "clienteId":"59", 
                                    "tipoCliente":"Anunciante",
                                },
                                withCredentials: (false),
                              })
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public addTransferChartDataListener(){
    this.hubConnection.on('receberPedido', (data) => {
      this.data = data;
      
    });
  }
  public disconect(){
    this.hubConnection.stop()
  }
}
