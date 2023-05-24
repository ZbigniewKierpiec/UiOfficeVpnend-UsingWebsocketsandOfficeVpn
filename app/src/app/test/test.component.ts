import { ComponentSendService } from './../component-send.service';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SocketService } from '../socket.service';
import { Observable, Subscription, of, timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Data } from 'ws';
import { Colors } from './models';
import { Color } from './model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [SocketService],
})
export class TestComponent implements OnInit, OnDestroy {
  title = 'socketrv';
  MessageType: any;
  QueryType: any;
  ViewId: any;
  received: Observable<any[]>;
  sent: any[] = [];
  devices = [];
  AvailableViews: any[] = [];
  CurrentViewId: any[] = [];
  logInUsers: any[] = [];
  isSame: any;
  isSame2?: any;
  switchDevices: any;
  loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  lock: string = 'fa-solid fa-lock';
  isLoged: boolean = false;
  notValid: boolean = false;
  activeUser: any = '';
  welcome: boolean = false;
  avatar: boolean = false;
  logOutNow: boolean = false;
  // componentDetails: any[] = [];
  componentDetails: any[] = [];
  obs: Subscription;
  obsMessage: Subscription;
  obsmessages3: Subscription;
  obsmessagesConfig: Subscription;
  tip: boolean = false;
  dis: boolean = false;
  arrow: boolean = false;
  arrov1: string = 'fa-solid fa-caret-down';
  arrov2: string = 'fa-solid fa-caret-up';
  avatarPicture: string = '';
  dataTime: Date;
  // Stored Themes in Local Storage
  storedTheme: string = localStorage.getItem('theme-color');
  storedDeviceColor: string = localStorage.getItem('device-color');
  storedSettingsIconColor: string = localStorage.getItem('settings-icon-color');
  storedMediaPlayer: string = localStorage.getItem('media-player');
  storedFontFamily: string = localStorage.getItem('font-family');
  color: Color[] = Colors;
  // CurrentViewId:Observable<any[]>;
  constructor(
    private SocketService: SocketService,
    private comp: ComponentSendService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  // sendMsg() {
  //   let message = {
  //     MessageType: '',
  //     QueryType: '',
  //     // DeviceId: '',
  //   };
  //   message.MessageType = this.MessageType;
  //   message.QueryType = this.QueryType;

  //   this.sent.push(message);
  //   this.SocketService.messages.next(message);
  //   // console.log(this.AvailableViews + 'konsola');
  //   this.MessageType = '';
  //   this.QueryType = '';

  //   this.comp.onComponentClicked.emit(this.componentDetails);
  // }

  check(item) {
    let msg2 = {
      MessageType: 7,
      NavigationType: 3,
      ViewId: item.Id,
    };

    // this.auth.messages3.next(msg2);
    // this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
    //   if (data.CurrentViewId) {
    //     console.log(data);
    //     // this.CurrentViewId = data.Devices;
    //   }
    // });

    console.log(item);
    this.isSame2 = '';
    this.isSame = item.Id;
    // let msg = {
    //   MessageType: 7,
    //   // QueryType: '3',
    //   ViewId: item.Id,
    // };
    // this.auth.messages3.next(msg);
    // this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
    //   if (data.CurrentViewId) {
    //     console.log(data);
    //     this.CurrentViewId = data.Devices;
    //   }
    // });
    // console.log(msg);
    // this.obsMessage = this.auth.messages.subscribe((data) => {
    //   console.log(data);
    // });

    // this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
    //   if (data.CurrentViewId) {
    //     console.log(data);
    //     this.CurrentViewId = data.Devices;
    //   }
    // });

    // console.log(msg, item.Id);
    // console.log('To jest teraz obraz' + this.CurrentViewId);
    this.comp.onComponentClicked.emit(this.componentDetails);

    let msg = {
      MessageType: 7,
      NavigationType: 3,
      ViewId: item.Id,
    };

    this.auth.messages3.next(msg);
    this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
      if (data.CurrentViewId) {
        console.log(data);
        this.CurrentViewId = data.Devices;
      }
    });
  }

  showPass() {
    this.isText = !this.isText;
    this.isText
      ? (this.lock = 'fa-solid fa-lock-open')
      : (this.lock = 'fa-solid fa-lock');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  log() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.isLoged = true;
      this.notValid = false;
      this.auth.messages.next(this.loginForm.value);
      this.obsMessage = this.auth.messages.subscribe((data: any) => {
        console.log(data.ProfilePicture);
        if (data.Username) {
          console.log(this.activeUser);
          this.activeUser = data.Username;
          this.welcome = true;

          setTimeout(() => {
            this.welcome = false;
            this.userAvatar(data.Username);
          }, 3000);
        }

        if (data.ProfilePicture) {
          this.avatarPicture = data.ProfilePicture;
          console.log(data);
        }

        if (data.LoggedInUsers) {
          console.log(data.LoggedInUsers.Token);
        }

        if (data.AvailableViews) {
          this.AvailableViews = data.AvailableViews;
        }
      });
      // this.loginForm.reset();
    } else {
      console.log('Form is not valid');
      this.notValid = true;
    }
    console.log(this.avatarPicture);
  }

  logOut() {
    console.log('dziala');
    let logOut = {
      MessageType: 15,
      Username: this.activeUser,
    };
    console.log(logOut);
    this.auth.messages2.next(logOut);

    this.avatar = false;

    this.isLoged = false;

    this.CurrentViewId = null;
  }

  close() {
    this.notValid = false;
  }

  userAvatar(data: any) {
    this.avatar = true;
    this.activeUser = data;
  }

  devicesQuery(item) {
    // this.comp.onComponentClicked.emit(this.componentDetails);
    this.obsmessagesConfig = this.auth.messagesConfig.subscribe((data: any) => {
      console.log(data);
      this.componentDetails = data;
      this.comp.onComponentClicked.emit(this.componentDetails);
    });
    console.log(this.componentDetails);
    this.switchDevices = item.Label;
    this.isSame2 = item.Label;

    let msg = {
      MessageType: 2,
      QueryType: 5,
      DeviceId: item.Id,
    };
    this.auth.messagesConfig.next(msg);
    this.comp.onComponentClicked.emit(this.componentDetails);

    // this.comp.onComponentClicked.emit(this.componentDetails);
    // console.log(this.switchDevices);
  }

  changeArrow() {
    this.arrow = !this.arrow;
  }

  setColor(theme, device, settingsIcon, mediaPlayer, fontFamily) {
    localStorage.setItem('theme-color', theme);
    localStorage.setItem('device-color', device);
    localStorage.setItem('settings-icon-color', settingsIcon);
    localStorage.setItem('media-player', mediaPlayer);
    localStorage.setItem('font-family', fontFamily);
    this.storedTheme = localStorage.getItem('theme-color');
    this.storedDeviceColor = localStorage.getItem('device-color');
    this.storedSettingsIconColor = localStorage.getItem('settings-icon-color');
    this.storedMediaPlayer = localStorage.getItem('media-player');
    this.storedFontFamily = localStorage.getItem('font-family');
  }

  settings: boolean = false;
  theme: boolean = false;
  settingsSpin: boolean = false;
  numberR: any = 'rotate(' + 0 + 'deg)';
  active() {
    this.theme = !this.theme;
    // this.settings = true;
    // this.settingsSpin = !this.settingsSpin;
    this.numberR = 'rotate(' + 180 + 'deg)';

    this.settings = !this.settings;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.

  //   this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
  //     if (data.CurrentViewId) {
  //       console.log(data);
  //       this.CurrentViewId = data.Devices;
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      MessageType: ['12', Validators.required],
    });
    // this.auth.messages.subscribe((data:any)=>{
    //     if(data.Username){
    //        this.activeUser =data;
    //     }
    // })

    this.obsmessages3 = this.auth.messages3.subscribe((data: any) => {
      if (data.CurrentViewId) {
        console.log(data);
        this.CurrentViewId = data.Devices;
      }
    });

    timer(0, 1000).subscribe(() => {
      this.dataTime = new Date();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.obs.unsubscribe();
    // this.obsmessages3.unsubscribe();
    this.obsmessagesConfig.unsubscribe();
    this.obsMessage.unsubscribe();
  }

  //////clock/////////////////
}
