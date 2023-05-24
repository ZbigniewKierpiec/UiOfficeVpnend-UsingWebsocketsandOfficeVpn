import { Component, Input, OnInit } from '@angular/core';
import { ComponentSendService } from '../component-send.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit {
  @Input() nameComp: string;
  @Input() storedMediaPlayer: string;
  @Input() storedFontFamily: string;
  media: any[] = [];
  media2: any[] = [];
  media3: any[] = [];
  gridMediaX;
  gridMediaY;
  gridMediaWidth;
  gridMediaHeight;

  grid2MediaX;
  grid2MediaY;
  grid2MediaWidth;
  grid2MediaHeight;

  grid3MediaX;
  grid3MediaY;
  grid3MediaWidth;
  grid3MediaHeight;

  constructor(private comp: ComponentSendService) {
    this.comp.onComponentClicked.subscribe((data: any) => {
      // console.log(data.ModuleConfigs)
      this.getMedia(data.ModuleConfigs);
    });
  }

  // getMedia(data: any) {
  //   console.log(data);

  //   if (Array.isArray(data)) {
  //     // console.log(data);
  //     const filteredData = data.filter((item) => item.ModuleId == 1);
  //     const filteredData2 = data.filter((item) => item.ModuleId == 2);
  //     const filteredData3 = data.filter((item) => item.ModuleId == 3);
  //     this.media = filteredData;
  //     this.media2 = filteredData2;
  //     this.media3 = filteredData3;
  //     for (const iterator of filteredData) {
  //       // console.log(iterator.GridDetails.X);
  //       this.gridMediaX = iterator.GridDetails.X;
  //       this.gridMediaY = iterator.GridDetails.Y;
  //       this.gridMediaWidth = iterator.GridDetails.Width;
  //       this.gridMediaHeight = iterator.GridDetails.Height;
  //     }

  //     for (const iterator of filteredData2) {
  //       this.grid2MediaX = iterator.GridDetails.X;
  //       this.grid2MediaY = iterator.GridDetails.Y;
  //       this.grid2MediaWidth = iterator.GridDetails.Width;
  //       this.grid2MediaHeight = iterator.GridDetails.Height;
  //     }

  //     for (const iterator of filteredData3) {
  //       this.grid3MediaX = iterator.GridDetails.X;
  //       this.grid3MediaY = iterator.GridDetails.Y;
  //       this.grid3MediaWidth = iterator.GridDetails.Width;
  //       this.grid3MediaHeight = iterator.GridDetails.Height;
  //     }
  //   } else {
  //     console.error('data is not an array');
  //   }
  // }

  // getMediaOne() {
  //   return {
  //     'grid-column-start': `${this.gridMediaX}`,
  //     'grid-column-end': `${this.gridMediaX + this.gridMediaWidth}`,
  //     'grid-row-start': `${this.gridMediaY}`,
  //     'grid-row-end': `${this.gridMediaY + this.gridMediaHeight}`,
  //   };
  // }

  // getMediaTwo() {
  //   return {
  //     'grid-column-start': `${this.grid2MediaX}`,
  //     'grid-column-end': `${this.grid2MediaX + this.grid2MediaWidth}`,
  //     'grid-row-start': `${this.grid2MediaY}`,
  //     'grid-row-end': `${this.grid2MediaY + this.grid2MediaHeight}`,
  //   };
  // }

  // getMediaThree() {
  //   return {
  //     'grid-column-start': `${this.grid3MediaX}`,
  //     'grid-column-end': `${this.grid3MediaX + this.grid3MediaWidth}`,
  //     'grid-row-start': `${this.grid3MediaY}`,
  //     'grid-row-end': `${this.grid3MediaY + this.grid3MediaHeight}`,
  //   };
  // }

  getMedia(data: any) {
    console.log(data);

    if (!Array.isArray(data)) {
      console.error('data is not an array');
      return;
    }

    this.media = [];
    this.media2 = [];
    this.media3 = [];

    for (const item of data) {
      switch (item.ModuleId) {
        case 1:
          this.media.push(item);
          break;
        case 2:
          this.media2.push(item);
          break;
        case 3:
          this.media3.push(item);
          break;
      }
    }

    if (this.media.length > 0) {
      const iterator = this.media[0];
      this.gridMediaX = iterator.GridDetails.X;
      this.gridMediaY = iterator.GridDetails.Y;
      this.gridMediaWidth = iterator.GridDetails.Width;
      this.gridMediaHeight = iterator.GridDetails.Height;
    }

    if (this.media2.length > 0) {
      const iterator = this.media2[0];
      this.grid2MediaX = iterator.GridDetails.X;
      this.grid2MediaY = iterator.GridDetails.Y;
      this.grid2MediaWidth = iterator.GridDetails.Width;
      this.grid2MediaHeight = iterator.GridDetails.Height;
    }

    if (this.media3.length > 0) {
      const iterator = this.media3[0];
      this.grid3MediaX = iterator.GridDetails.X;
      this.grid3MediaY = iterator.GridDetails.Y;
      this.grid3MediaWidth = iterator.GridDetails.Width;
      this.grid3MediaHeight = iterator.GridDetails.Height;
    }
  }

  getMediaGrid(module: number) {
    const grid = {};

    switch (module) {
      case 1:
        grid['grid-column-start'] = `${this.gridMediaX}`;
        grid['grid-column-end'] = `${this.gridMediaX + this.gridMediaWidth}`;
        grid['grid-row-start'] = `${this.gridMediaY}`;
        grid['grid-row-end'] = `${this.gridMediaY + this.gridMediaHeight}`;
        break;
      case 2:
        grid['grid-column-start'] = `${this.grid2MediaX}`;
        grid['grid-column-end'] = `${this.grid2MediaX + this.grid2MediaWidth}`;
        grid['grid-row-start'] = `${this.grid2MediaY}`;
        grid['grid-row-end'] = `${this.grid2MediaY + this.grid2MediaHeight}`;
        break;
      case 3:
        grid['grid-column-start'] = `${this.grid3MediaX}`;
        grid['grid-column-end'] = `${this.grid3MediaX + this.grid3MediaWidth}`;
        grid['grid-row-start'] = `${this.grid3MediaY}`;
        grid['grid-row-end'] = `${this.grid3MediaY + this.grid3MediaHeight}`;
        break;
    }

    return grid;
  }

  ngOnInit(): void {
    console.log(this.storedMediaPlayer);
  }
}
