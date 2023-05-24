import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyTvComponent } from './sky-tv.component';

describe('SkyTvComponent', () => {
  let component: SkyTvComponent;
  let fixture: ComponentFixture<SkyTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkyTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
