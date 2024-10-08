import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imageItems: any[] = [];
  sortOption: string = 'recent';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadImages(this.sortOption);
  }

  onSearch(params: any) {
    this.apiService.search(params).subscribe(items => {
      this.imageItems = items;
      this.processItems(this.imageItems);
    });
  }

  loadImages(sortOption: string) {
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
  }
}
