import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyFilterChangeObject } from '../models/property-filter-change-object';

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-filters.component.html',
  styleUrl: './property-filters.component.css',
})
export class PropertyFiltersComponent {
  interestForm!: FormGroup;
  interestSuccess = false;
  interestExists = false;
  formSubmitted = false;
  @Output() changes = new EventEmitter<PropertyFilterChangeObject>();

  constructor(private fb: FormBuilder) {
    this.interestForm = this.fb.group({
      bedrooms: [1, Validators.required],
      minPrice: [null, [Validators.required, Validators.min(1)]],
      maxPrice: [null, [Validators.required, Validators.min(1)]],
      estimatedSize: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.interestForm.valueChanges.subscribe((form: PropertyFilterChangeObject) => {
      this.interestSuccess = false;
      this.interestExists = false;
      this.formSubmitted = false;
      this.changes.emit(form);
    });
  }


  changeBedroomSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);
    this.interestForm.patchValue({ bedrooms: selectedValue });
  }
}
