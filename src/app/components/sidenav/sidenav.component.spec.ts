import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from 'src/app/material.module';
import { By } from '@angular/platform-browser';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have links', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('a').length).toBeGreaterThan(0);
  });
  it('should be fixed', () => {
    expect(getComputedStyle(fixture.debugElement.query(By.css('.fixed-panel')).nativeElement).position).toBe("fixed");
  });
});
