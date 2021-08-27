import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './guest/cases/cases.component';
import { CompareComponent } from './guest/compare/compare.component';
import { StatedataComponent } from './guest/statedata/statedata.component';
import { TotaldataComponent } from './guest/totaldata/totaldata.component';
import { IndiatrendComponent } from './guest/trenddata/indiatrend/indiatrend.component';
import { StatetrendComponent } from './guest/trenddata/statetrend/statetrend.component';
import { TrenddataComponent } from './guest/trenddata/trenddata.component';
import { ViewoptionsComponent } from './guest/viewoptions/viewoptions.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminloginComponent } from './login/adminlogin/adminlogin.component';
import { GuestloginComponent } from './login/guestlogin/guestlogin.component';
import { AdminguardService } from './services/adminguard.service';
import { GuestguardService } from './services/guestguard.service';
import { DailycasesComponent } from './updatecases/dailycases/dailycases.component';
import { OptiondetailComponent } from './updatecases/optiondetail/optiondetail.component';
import { TotalcasesComponent } from './updatecases/totalcases/totalcases.component';
import { UpdatecasesComponent } from './updatecases/updatecases.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'login/admin', component: AdminloginComponent },
  { path: 'login/guest', component: GuestloginComponent },
  {
    path: 'update',
    component: UpdatecasesComponent,
    canActivate: [AdminguardService],
    children: [
      { path: 'options', component: OptiondetailComponent },
      { path: 'totalcases', component: TotalcasesComponent },
      { path: 'dailycases', component: DailycasesComponent },
    ],
  },
  {
    path: 'cases',
    component: CasesComponent,
    canActivate: [GuestguardService],
    children: [
      { path: 'view', component: ViewoptionsComponent },
      { path: 'totaldata', component: TotaldataComponent },
      { path: 'statedata', component: StatedataComponent },
      { path: 'compare', component: CompareComponent },
      {
        path: 'trenddata',
        component: TrenddataComponent,
        children: [
          { path: 'India', component: IndiatrendComponent },
          {
            path: 'India/:state',
            component: StatetrendComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
