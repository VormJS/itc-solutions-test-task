import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidenavComponent,
        HomeComponent
      ],
      imports: [
        UIRouterModule.forRoot({
          states: [
            {
              name: 'app',
              redirectTo: 'home',
              component: AppComponent,
            },{
              name: "home",
              url: "/home",
              component: HomeComponent
            }
          ]
        }),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'itc-solutions-test-task'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('itc-solutions-test-task');
  });

  it('should render sidenav', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-sidenav')).toBeTruthy();
  });
  
  it('should render main container div', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.main-container'))).toBeTruthy();
  });
});
