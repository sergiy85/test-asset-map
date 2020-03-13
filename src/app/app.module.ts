import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// google maps module
import { AgmCoreModule } from '@agm/core';
// routing module
import { AppRoutingModule } from './app-routing.module';
// server module
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// services
import { InMemoryDataService } from './services/in-memory-data.service';
import { TruckService } from './services/truck.service';
import { ShareService } from './services/share.service';
//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';
import { TrucksComponent } from './trucks/trucks.component';
import { AgmMapComponent } from './agm-map/agm-map.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddAssetComponent,
    DeleteAssetComponent,
    TrucksComponent,
    AgmMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB06xjagMuNXf6BwJHwKTFE67rDhao9xYQ'
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [TruckService, ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
