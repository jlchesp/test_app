import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '../models/image.interface';
import { RandomTextService } from './random-text.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    // La url del enunciado aparece como 'https://i.picsum.photos', pero no funciona, en cambio si la siguiente

    private apiUrl = 'https://picsum.photos';
    private totalImages = 4000;

    constructor(private randomTextService: RandomTextService) { }

    getRandomImages(): Observable<Image[]> {
        const imageList = [];

        for (let element = 0; element < this.totalImages; element++) {

            const randomId = Math.round(Math.random() * 200 + 1);
            const randomText = this.randomTextService.getRandomText();
            const url = `${this.apiUrl}/id/${randomId}/500/500.jpg`;

            const image: Image = {
                id: element.toString(),
                photo: url,
                text: randomText
            }

            imageList.push(image);
        }

        return of(imageList);
    }
}