import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {Topnavbar} from "./components/topnavbar/topnavbar.component";
import {Navigation} from "./components/navigation/navigation.component";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {HttpClientModule} from '@angular/common/http';

import {HomeComponent} from "./pages/home/home.component";
import { EventComponent } from './pages/event/event.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { DealsComponent } from './pages/deals/deals.component';
import { ProfileComponent } from './components/profile/profile.component';

import { safeContent } from './safeContent.pipe';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { SlideshowModule } from 'ng-simple-slideshow';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UtilsService } from "./utils.service";
import { Utils2Service } from "./utils2.service";

import {

    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule


} from '@angular/material';

import { SearchComponent } from './pages/search/search.component';
import { SavedComponent } from './pages/saved/saved.component';
import { AllowLocationDialogComponent } from './components/allow-location-dialog/allow-location-dialog.component';
import { ItemInfoDialogComponent } from './components/item-info-dialog/item-info-dialog.component';
import { SessionDialogComponent } from './components/session-dialog/session-dialog.component';
import { LocalComponent } from './pages/local/local.component';
import { MyoffersComponent } from './pages/myoffers/myoffers.component';


@NgModule({
  declarations: [
    AppComponent,
    Navigation,
    Topnavbar,
    HomeComponent,
    EventComponent,
    CouponComponent,
    WishlistComponent,
    DealsComponent,
    ProfileComponent,
    safeContent,
    SearchComponent,
    SavedComponent,
    AllowLocationDialogComponent,
    ItemInfoDialogComponent,
    SessionDialogComponent,
    LocalComponent,
    MyoffersComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SlideshowModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    LoadingBarHttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

  ],
  providers: [
    UtilsService,
    Utils2Service
  ],
  bootstrap: [
    AppComponent, 
  ],
  entryComponents: [
    AllowLocationDialogComponent,
    ItemInfoDialogComponent,
    SessionDialogComponent
  ]

})
export class AppModule { }
