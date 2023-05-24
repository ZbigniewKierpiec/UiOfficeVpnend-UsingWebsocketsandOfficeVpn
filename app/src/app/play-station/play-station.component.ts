import { Component, Input, OnInit } from '@angular/core';
import { ComponentSendService } from '../component-send.service';

@Component({
  selector: 'app-play-station',
  templateUrl: './play-station.component.html',
  styleUrls: ['./play-station.component.scss'],
})
export class PlayStationComponent implements OnInit {
  @Input() nameComp: string;
  playstation: any[] = [];
  playstation3: any[] = [];
  @Input() storedMediaPlayer: string;
  gridPlaystationX;
  gridPlaystationY;
  gridPlaystationWidth;
  gridPlaystationHeight;
  grid2PlaystationX;
  grid2PlaystationY;
  grid2PlaystationWidth;
  grid2PlaystationHeight;
  constructor(private comp: ComponentSendService) {
    this.comp.onComponentClicked.subscribe((data: any) => {
      // console.log(data.ModuleConfigs)
      this.getPlaystation(data.ModuleConfigs);
    });
  }

  getPlaystation(data: any) {
    // console.log(data);

    if (Array.isArray(data)) {
      // console.log(data);
      const filteredData = data.filter((item) => item.ModuleId == 1);
      const filteredData3 = data.filter((item) => item.ModuleId == 3);

      this.playstation = filteredData;
      this.playstation3 = filteredData3;

      for (const iterator of filteredData) {
        // console.log(iterator.GridDetails.X);
        this.gridPlaystationX = iterator.GridDetails.X;
        this.gridPlaystationY = iterator.GridDetails.Y;
        this.gridPlaystationWidth = iterator.GridDetails.Width;
        this.gridPlaystationHeight = iterator.GridDetails.Height;
      }

      for (const iterator of filteredData3) {
        // console.log(iterator.GridDetails.X);
        this.grid2PlaystationX = iterator.GridDetails.X;
        this.grid2PlaystationY = iterator.GridDetails.Y;
        this.grid2PlaystationWidth = iterator.GridDetails.Width;
        this.grid2PlaystationHeight = iterator.GridDetails.Height;
      }
    } else {
      console.error('data is not an array');
    }
  }

  getPlaystation1() {
    return {
      'grid-column-start': `${this.gridPlaystationX}`,
      'grid-column-end': `${this.gridPlaystationX + this.gridPlaystationWidth}`,
      'grid-row-start': `${this.gridPlaystationY}`,
      'grid-row-end': `${this.gridPlaystationY + this.gridPlaystationHeight}`,
    };
  }

  getPlaystation2() {
    return {
      'grid-column-start': `${this.grid2PlaystationX}`,
      'grid-column-end': `${
        this.grid2PlaystationX + this.grid2PlaystationWidth
      }`,
      'grid-row-start': `${this.grid2PlaystationY}`,
      'grid-row-end': `${this.grid2PlaystationY + this.grid2PlaystationHeight}`,
    };
  }

  ngOnInit(): void {
    this.comp.onComponentClicked.subscribe((data) => {
      // console.log(data)
      this.getPlaystation(data);
    });
  }
}
