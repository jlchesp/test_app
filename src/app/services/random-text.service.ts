import { Injectable } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
    providedIn: 'root'
})
export class RandomTextService {

    private lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 10,
            min: 5
        },
        wordsPerSentence: {
            max: 20,
            min: 5
        }
    });

    constructor() { }

    getRandomText(): string {
        return this.lorem.generateSentences(1);
    }

}
