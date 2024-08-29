import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-access.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  item: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.item = JSON.parse(localStorage.getItem('item') || '{}');
}

  goBack() {
    this.router.navigate(['/']);
  }

  playVideo() {
    this.item.isVideoPlaying = true;
  }
}
