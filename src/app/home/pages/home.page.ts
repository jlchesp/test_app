import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Image } from 'src/app/models/image.interface';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  images: Image[] = [];
  filterImages: Image[] = [];

  imagesSubscription: Subject<void> = new Subject<void>();

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getImages();
  }

  filterChange(text: string) {
    this.images = (!text || text === '') ? this.filterImages : this.filterImages.filter(image => image.id.includes(text) || image.text.toLowerCase().includes(text.toLowerCase()));
  }

  ngOnDestroy() {
    this.imagesSubscription.next();
    this.imagesSubscription.complete();
  }

  private getImages() {
    this.imageService.getRandomImages()
      .pipe(takeUntil(this.imagesSubscription))
      .subscribe(images => {
        this.images = images;
        this.filterImages = this.images;
      });
  }

}
