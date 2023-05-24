import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { SocketService } from './socket.service';
import { SkyTvComponent } from './sky-tv/sky-tv.component';
import { MusicCenterComponent } from './music-center/music-center.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { PlayStationComponent } from './play-station/play-station.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SkyTvComponent,
    MusicCenterComponent,
    MediaPlayerComponent,
    PlayStationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
