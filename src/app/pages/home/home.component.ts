import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  imagenes: any[] = [];
  imagenSeleccionada: any = null;
  sortChanged: string = 'recent';
  showDetails: boolean = false;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadImages(this.sortChanged);
  }

  onSearch(params: any) {
    this.showDetails = false;
    this.apiService.search(params).subscribe(items => {
      this.imagenes = items;
      this.processItems(this.imagenes);
    });
  }

  loadImages(sortOption: string) {
    this.showDetails = false;
    const params: any = {
      orderBy: sortOption
    };

    this.apiService.asset('', params).subscribe(items => {
      this.imagenes = items;
      this.processItems(this.imagenes);
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
  }

  onImageClick(imagen: any) {
    this.imagenSeleccionada = imagen;
    this.showDetails = true;
    this.imagenes = [...this.imagenes];
  }

  onBackToGallery() {
    this.showDetails = false;
  }
}
