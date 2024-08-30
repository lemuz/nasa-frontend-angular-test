import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  filterImages: boolean = true;
  filterVideos: boolean = true;

  @Output() searchInitiated = new EventEmitter<any>();

  onSearch() {
    const params = {
      q: this.searchQuery,
      media_type: this.getMediaType()
    };
    this.searchInitiated.emit(params);
  }

  getMediaType(): string {
    const types: string[] = [];
    if (this.filterImages) types.push('image');
    if (this.filterVideos) types.push('video');
    return types.join(',');
  }
}
