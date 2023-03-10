import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Image } from 'src/app/shared/models/image.interface';
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

  onIonInfinite(ev: any) {
    this.getImages();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnDestroy() {
    this.imagesSubscription.next();
    this.imagesSubscription.complete();
  }

  private getImages() {
    this.imageService.getRandomImages()
      .pipe(takeUntil(this.imagesSubscription))
      .subscribe({
        next: images => {
          this.images = images;
          this.filterImages = this.images;
        },
        error: error => { console.error('Ha ocurrido un error inesperado', error) }
      });
  }

}
