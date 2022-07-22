import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite,SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [SQLite,ImagePicker,Crop,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
