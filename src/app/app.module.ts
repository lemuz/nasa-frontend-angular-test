import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './pages/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchBarComponent,
    ImageGalleryComponent,
    ImageDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
