import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input() imagenClick: any;
  @Input() imageItems: any[] = [];
  @Output() loadGallery = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
}

  goBack() {
    this.loadGallery.emit();
  }

  playVideo() {
    this.imagenClick.isVideoPlaying = true;
  }
}
