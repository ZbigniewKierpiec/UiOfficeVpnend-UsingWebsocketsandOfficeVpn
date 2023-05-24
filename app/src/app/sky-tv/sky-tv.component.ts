import { ComponentSendService } from './../component-send.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SocketService } from '../socket.service';
import { Observable, Subscription, of } from 'rxjs';
@Component({
  selector: 'app-sky-tv',
  templateUrl: './sky-tv.component.html',
  styleUrls: ['./sky-tv.component.scss'],
  // providers:[ComponentSendService]
})
export class SkyTvComponent implements OnInit {
  @Input()   nameComp:string;
  Dots: any[] = [];
  Dial: any[] = [];
  Player: any[] = [];
  gridDotsX: any = '';
  gridDotsY: any = '';
  gridDotsWidth: any = '';
  gridDotsHeight: any = '';
  gridDialX = '';
  gridDialY = '';
  gridDialWidth = '';
  gridDialHeight = '';

  gridPlayerX = '';
  gridPlayerY = '';
  gridPlayerWidth = '';
  gridPlayerHeight = '';

  constructor(private comp: ComponentSendService) {
    this.comp.onComponentClicked.subscribe((data: any) => {
      // let zee = data.find((data) => data.ModuleId == 1);

      this.getDots(data.ModuleConfigs);
      this.getDial(data.ModuleConfigs);
      this.getPlayer(data.ModuleConfigs);
      // console.log(data);
      // console.log(this.Dots);
    });
  }
  getDots(data: any) {
    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => item.ModuleId == 1);
      this.Dots = filteredData;
      for (const iterator of filteredData) {
        // console.log(iterator.GridDetails.X);
        this.gridDotsX = iterator.GridDetails.X;
        this.gridDotsY = iterator.GridDetails.Y;
        this.gridDotsWidth = iterator.GridDetails.Width;
        this.gridDotsHeight = iterator.GridDetails.Height;
      }
    } else {
      // console.error('data is not an array');
    }

    // let zee = data.filter((data)=>data.ModuleId==1)
    //  console.log(zee)
  }

  getDial(data: any) {
    // console.log(data);

    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => item.ModuleId == 3);
      this.Dial = filteredData;
      // console.log(this.Dial);
      for (const iterator of filteredData) {
        // console.log(iterator.GridDetails.X);
        this.gridDialX = iterator.GridDetails.X;
        this.gridDialY = iterator.GridDetails.Y;
        this.gridDialWidth = iterator.GridDetails.Width;
        this.gridDialHeight = iterator.GridDetails.Height;
      }
    } else {
      // console.error('data is not an array');
    }
  }

  getPlayer(data: any) {
    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => item.ModuleId == 4);
      this.Player = filteredData;
      // console.log(this.Player);
      for (const iterator of filteredData) {
        // console.log(iterator.GridDetails.X);
        this.gridPlayerX = iterator.GridDetails.X;
        this.gridPlayerY = iterator.GridDetails.Y;
        this.gridPlayerWidth = iterator.GridDetails.Width;
        this.gridPlayerHeight = iterator.GridDetails.Height;
      }
    } else {
      // console.error('data is not an array');
    }
  }

  getDotsGrid() {
    return {
      'grid-column-start': `${this.gridDotsX}`,
      'grid-column-end': `${this.gridDotsX + this.gridDotsWidth}`,
      'grid-row-start': `${this.gridDotsY}`,
      'grid-row-end': `${this.gridDotsY + this.gridDotsHeight}`,
    };
  }

  getDialGrid() {
    return {
      'grid-column-start': `${this.gridDialX}`,
      'grid-column-end': `${this.gridDialX + this.gridDialWidth}`,
      'grid-row-start': `${this.gridDialY}`,
      'grid-row-end': `${this.gridDialY + this.gridDialHeight}`,
    };
  }

  getDialPlayer() {
    return {
      'grid-column-start': `${this.gridPlayerX}`,
      'grid-column-end': `${this.gridPlayerX + this.gridPlayerWidth}`,
      'grid-row-start': `${this.gridPlayerY}`,
      'grid-row-end': `${this.gridPlayerY + this.gridPlayerHeight}`,
    };
  }

  dialCheck(item: any) {
    console.log(item.Label + item.SecondaryLabel);
  }

  checkPlayer(item: any) {
    console.log(item.Icon);
  }

  checkDots(item: any) {
    console.log(item.Colour);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.comp.onComponentClicked.subscribe((data: any) => {
      // let zee = data.find((data) => data.ModuleId == 1);

      this.getDots(data.ModuleConfigs);
      this.getDial(data.ModuleConfigs);
      this.getPlayer(data.ModuleConfigs);
      // console.log(data);
      // console.log(this.Dots);
    });
  }
}
