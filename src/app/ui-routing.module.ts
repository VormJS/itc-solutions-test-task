import { NgModule } from '@angular/core';
import { RootModule, UIRouterModule } from '@uirouter/angular';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { PagesComponent } from './components/pages/pages.component';
import { PlugComponent } from './components/plug/plug.component';
import { TableComponent } from './components/table/table.component';

const rootModule: RootModule = {
  states: [
    {
      name: 'app',
      redirectTo: 'home',
      component: AppComponent,
    },
    {
      name: "home",
      url: "/home",
      component: HomeComponent
    },
    {
      name: "pages",
      url: "/pages",
      component: PagesComponent
    },
    {
      name: "pages.table",
      url: "/table",
      component: TableComponent
    },
    {
      name: "pages.plug",
      url: "/plug",
      component: PlugComponent
    }
  ],
  useHash: true,
  otherwise: "/home"
};

@NgModule({
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class UIRoutingModule { }