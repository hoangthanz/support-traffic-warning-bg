import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {HubConnection} from "@microsoft/signalr"
import {MessageSupport} from "../../core/models/message-support";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data!: MessageSupport[];
  private hubConnection!: HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalr_domain}/notification`)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferNotificationDataListener = () => {
    this.hubConnection.on('Receive', (data) => {
      this.data = data;
      console.log(data);
    });
  }
}
