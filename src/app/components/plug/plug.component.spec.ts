import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugComponent } from './plug.component';
import { By } from '@angular/platform-browser';

describe('PlugComponent', () => {
  let component: PlugComponent;
  let fixture: ComponentFixture<PlugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlugComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain "kitty" text', () => {
    expect(fixture.debugElement.query(By.css('.plug-container')).nativeElement.textContent).toContain("kitty");
  });
  it('should contain image', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('img').length).toBeGreaterThan(0);
  });
});
