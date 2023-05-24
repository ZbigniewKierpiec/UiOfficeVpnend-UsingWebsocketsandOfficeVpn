import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCenterComponent } from './music-center.component';

describe('MusicCenterComponent', () => {
  let component: MusicCenterComponent;
  let fixture: ComponentFixture<MusicCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
