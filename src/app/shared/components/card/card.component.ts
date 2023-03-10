import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/shared/models/image.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() image: Image = {
    id: '',
    photo: '',
    text: ''
  };

  defaultImagePath: string = '../../../../assets/images/default.jpg'

  constructor() { }

  ngOnInit() {
  }

  changeSrc(event: any) {
    event.target.src = this.defaultImagePath;
  }

}
