import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite,SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import {Camera} from '@awesome-cordova-plugins/camera/ngx'
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [SQLite,ImagePicker,Crop,Camera,File,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
