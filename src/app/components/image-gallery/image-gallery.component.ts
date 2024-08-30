import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {
  @Input() imageItems: any[] = [];
  @Output() imagenClick = new EventEmitter<any>();


  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  viewDetails(item: any) {
    if (item.data[0].media_type === 'video') {
      this.apiService.asset(item.data[0].nasa_id, {}).subscribe(videos => {
        item.tieneVideo = true;
        item.linkVideo = videos[0].href;
        item.isVideoPlaying = false;
      });
    } else {
      item.tieneVideo = false;
    }
    item.url = this.extractUrls(item.data[0].description)[0];
    this.imagenClick.emit(item);
  }

  extractUrls(text: string): string[] {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const matches = text.match(urlRegex);
    return matches ? matches : [];
  }

  onImageClick(imagen: any) {
    this.imagenClick.emit(imagen);
  }
}
