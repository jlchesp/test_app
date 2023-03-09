import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Image } from 'src/app/models/image.interface';
import { ImageService } from 'src/app/services/image.service';

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

  getImages() {
    this.imageService.getRandomImages()
      .pipe(takeUntil(this.imagesSubscription))
      .subscribe(images => {
        this.images = images;
        this.filterImages = this.images;
      });
  }

  filterChange(text: string): void {
    if (!text) {
      this.images = this.filterImages;
      return;
    }

    this.images = this.filterImages.filter(image => image.id.includes(text) || image.text.toLowerCase().includes(text.toLowerCase()));
  }

  onIonInfinite(ev: any) {
    this.getImages();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnDestroy(): void {
    this.imagesSubscription.next();
    this.imagesSubscription.complete();
  }

}
