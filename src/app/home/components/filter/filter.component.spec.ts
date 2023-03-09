import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { FilterComponent } from './filter.component';
import { IonicModule } from '@ionic/angular';

export class FormBuilderMock {
  group() {
    return new FormGroup({
      filter: new FormControl()
    })
  }
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilderMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.textChange = new EventEmitter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init filter', fakeAsync(() => {
    const textChangeSpy = spyOn(component.textChange, 'emit');

    component.filterForm.get('filter')?.setValue('text');
    tick();
    expect(textChangeSpy).toHaveBeenCalled();
  }));
});
