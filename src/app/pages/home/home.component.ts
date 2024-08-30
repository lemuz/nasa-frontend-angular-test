import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @Output() imageItemsChanged = new EventEmitter<any[]>();
  imageItems: any[] = [];
  imagenSeleccionada: any = null;
  sortChanged: string = 'recent';
  showDetails: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages(this.sortChanged);
  }

  onSearch(params: any) {
    this.apiService.search(params).subscribe(items => {
      this.imageItems = items;
      this.processItems(this.imageItems);
    });
  }

  loadImages(sortOption: string) {
    this.showDetails = false;
    const params: any = {
      orderBy: sortOption
    };

    this.apiService.asset('', params).subscribe(items => {
      this.imageItems = items;
      this.processItems(this.imageItems);
    });
  }

  processItems(items: any[]) {
    items.forEach(item => {
      if (item.data[0].media_type === 'video') {
        item.tieneVideo = true;
        this.apiService.asset(item.data[0].nasa_id, new HttpParams()).subscribe(archivos => {
          item.linkVideo = archivos[0].href;
        });
      } else {
        item.tieneVideo = false;
      }
    });
    this.imageItemsChanged.emit(items);
  }

  onImageClick(imagen: any) {
    this.imagenSeleccionada = imagen;
    this.showDetails = true;
    this.imageItems = [...this.imageItems];
  }

  onBackToGallery() {
    this.showDetails = false;
  }
}
