import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() textChange = new EventEmitter();

  filterForm = this.formBuilder.group({
    filter: ['']
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.filterForm) {
      this.filterForm?.get('filter')?.valueChanges
        .subscribe(text => {
          this.textChange.emit(text);
        })
    }
  }

}
