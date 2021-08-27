import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AdminloginComponent } from './login/adminlogin/adminlogin.component';
import { GuestloginComponent } from './login/guestlogin/guestlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { UpdatecasesComponent } from './updatecases/updatecases.component';
import { TotalcasesComponent } from './updatecases/totalcases/totalcases.component';
import { DailycasesComponent } from './updatecases/dailycases/dailycases.component';
import { OptiondetailComponent } from './updatecases/optiondetail/optiondetail.component';
import { CasesComponent } from './guest/cases/cases.component';
import { ViewoptionsComponent } from './guest/viewoptions/viewoptions.component';
import { TotaldataComponent } from './guest/totaldata/totaldata.component';
import { StatedataComponent } from './guest/statedata/statedata.component';
import { CompareComponent } from './guest/compare/compare.component';
import { TrenddataComponent } from './guest/trenddata/trenddata.component';
import { IndiatrendComponent } from './guest/trenddata/indiatrend/indiatrend.component';
import { StatetrendComponent } from './guest/trenddata/statetrend/statetrend.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    AdminloginComponent,
    GuestloginComponent,
    AlertComponent,
    UpdatecasesComponent,
    TotalcasesComponent,
    DailycasesComponent,
    OptiondetailComponent,
    CasesComponent,
    ViewoptionsComponent,
    TotaldataComponent,
    StatedataComponent,
    CompareComponent,
    TrenddataComponent,
    IndiatrendComponent,
    StatetrendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
