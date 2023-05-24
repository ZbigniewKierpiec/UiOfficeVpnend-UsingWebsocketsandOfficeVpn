import { Injectable } from '@angular/core';
import { Message } from 'google-protobuf';
import { map, Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
const CHAT_URL =
  'ws://10.100.203.21:8080/Remote?clientId=AttemptNewMethodToConnectZee';

export interface Login {
  UserName: string;
  Password: string;
  MessageType: string;
}
export interface logOut {
  MessageType: number;
  Username: string;
}
export interface Check {
  MessageType: number;
  // QueryType:string,
  ViewId: string;
}

export interface configDevices {
  MessageType: number;
  QueryType: number;
  DeviceId: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Login>;
  public messages2: Subject<logOut>;
  public messages3: Subject<Check>;
  public messagesConfig: Subject<configDevices>;

  constructor() {
    this.messages = <Subject<Login>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Login => {
        //  if(response.data == ''){

        //  }

        let data = JSON.parse(response.data);

        return data;
      })
    );

    this.messages2 = <Subject<logOut>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): logOut => {
        //  if(response.data == ''){

        //  }

        let data = JSON.parse(response.data);

        return data;
      })
    );

    this.messages3 = <Subject<Check>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Check => {
        //  if(response.data == ''){

        //  }

        let data = JSON.parse(response.data);

        return data;
      })
    );

    this.messagesConfig = <Subject<configDevices>>this.connect(CHAT_URL).pipe(
      map((response: MessageEvent): configDevices => {
        //  if(response.data == ''){

        //  }

        let data = JSON.parse(response.data);

        return data;
      })
    );
  }

  public connect(url): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        // console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
