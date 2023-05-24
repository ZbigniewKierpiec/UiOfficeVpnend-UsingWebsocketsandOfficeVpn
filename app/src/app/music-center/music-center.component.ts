import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentSendService } from '../component-send.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-center',
  templateUrl: './music-center.component.html',
  styleUrls: ['./music-center.component.scss'],
  // providers: [ComponentSendService],
})
export class MusicCenterComponent implements OnInit , OnDestroy {
  @Input()   nameComp:string;
  music: any[] = [];
  gridMusicX: any = '';
  gridMusicY: any = '';
  gridMusicWidth: any = '';
  gridMusicHeight: any = '';
  opComp:Subscription;
  constructor(private comp: ComponentSendService) {
   this.opComp = this.comp.onComponentClicked.subscribe((data:any) => {
      // console.log(data.ModuleConfigs);
      // this.music = data;
      this.getMusicGrid(data.ModuleConfigs);
    });
  }

  getMusicGrid(data: any) {
    if (Array.isArray(data)) {
      // console.log(data);
      this.music = data;
      ;
      for (const iterator of data) {
        // console.log(iterator.GridDetails.X);
        this.gridMusicX = iterator.GridDetails.X;
        this.gridMusicY = iterator.GridDetails.Y;
        this.gridMusicWidth = iterator.GridDetails.Width;
        this.gridMusicHeight = iterator.GridDetails.Height;
      }

    } else {
      console.error('data is not an array');
    }
  }

  getMusic() {
    return {
      'grid-column-start': `${this.gridMusicX}`,
      'grid-column-end': `${this.gridMusicX + this.gridMusicWidth}`,
      'grid-row-start': `${this.gridMusicY}`,
      'grid-row-end': `${this.gridMusicY + this.gridMusicHeight}`,
    };
  }

  ngOnInit(): void {



  }
 ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
    this.opComp.unsubscribe();
 }
}
