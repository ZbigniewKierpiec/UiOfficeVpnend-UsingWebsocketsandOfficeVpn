import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStationComponent } from './play-station.component';

describe('PlayStationComponent', () => {
  let component: PlayStationComponent;
  let fixture: ComponentFixture<PlayStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
