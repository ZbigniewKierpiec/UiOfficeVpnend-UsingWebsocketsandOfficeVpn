import { WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestowyService {
  private webSocket$: WebSocketSubject<any>;
  private wsUrl =
    'ws://10.100.203.21:8080/Remote?clientId=AttemptNewMethodToConnectZee';
  private token: string;
  constructor() {
    this.connect();
  }

  private connect(): void {
    this.webSocket$ = new WebSocketSubject(this.wsUrl);
    this.webSocket$.subscribe(
      (message) => {
        if (message.MessageType === 14) {
          this.token = message.LoggedInUsers[0].Token;
          console.log('Token:', this.token);
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket connection closed');
      }
    );
  }

  public login(username: string, password: string): Observable<boolean> {
    const loginMessage = {
      MessageType: 1,
      Username: username,
      Password: password,
    };

    return new Observable((observer) => {
      this.webSocket$.next(loginMessage);
      setTimeout(() => {
        observer.next(!!this.token);
        observer.complete();
      }, 2000);
    });
  }

  public getToken(): string {
    return this.token;
  }
}
