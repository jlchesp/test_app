import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.interface';

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

  constructor() { }

  ngOnInit() {
  }

}
