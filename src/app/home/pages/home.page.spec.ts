import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ImageService } from 'src/app/shared/services/image.service';
import { FilterComponent } from '../components/filter/filter.component';

import { HomePage } from './home.page';

export class ImageServiceMock {
  getRandomImages() {
    return of(
      [
        {
          id: '1',
          photo: 'https://picsum.photos/id/1/500/500.jpg',
          text: 'text'
        },
        {
          id: '2',
          photo: 'https://picsum.photos/id/2/500/500.jpg',
          text: 'text2'
        },
      ]
    )
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, FilterComponent],
      imports: [
        IonicModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ImageService, useClass: ImageServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init images', fakeAsync(() => {
    tick();

    expect(component.images).toEqual([
      {
        id: '1',
        photo: 'https://picsum.photos/id/1/500/500.jpg',
        text: 'text'
      },
      {
        id: '2',
        photo: 'https://picsum.photos/id/2/500/500.jpg',
        text: 'text2'
      },
    ]);

    expect(component.filterImages).toEqual([
      {
        id: '1',
        photo: 'https://picsum.photos/id/1/500/500.jpg',
        text: 'text'
      },
      {
        id: '2',
        photo: 'https://picsum.photos/id/2/500/500.jpg',
        text: 'text2'
      },
    ]);
  }));

  it('should filter id images list', () => {
    component.filterChange('1');
    expect(component.images).toEqual([
      {
        id: '1',
        photo: 'https://picsum.photos/id/1/500/500.jpg',
        text: 'text'
      },
    ])
  });

  it('should filter text images list', () => {
    component.filterChange('text2');
    expect(component.images).toEqual([
      {
        id: '2',
        photo: 'https://picsum.photos/id/2/500/500.jpg',
        text: 'text2'
      },
    ])
  });

  it('should emprty filter', () => {
    component.filterChange('');
    expect(component.images).toEqual([
      {
        id: '1',
        photo: 'https://picsum.photos/id/1/500/500.jpg',
        text: 'text'
      },
      {
        id: '2',
        photo: 'https://picsum.photos/id/2/500/500.jpg',
        text: 'text2'
      },
    ])
  });
});
