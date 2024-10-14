import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyFilterChangeObject } from '../models/property-filter-change-object';
import { Interest } from '../models/interest';
import { FirestoreService } from '../firestore.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type BRs = 'oneBR' | 'twoBR' | 'threeBR' | 'studio';
declare let dataLayer: any;

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './property-filters.component.html',
  styleUrl: './property-filters.component.css',
})
export class PropertyFiltersComponent {
  interestForm!: FormGroup;
  interestSuccess = false;
  interestExists = false;
  formSubmitted = false;
  @Output() changes = new EventEmitter<PropertyFilterChangeObject>();
  @Input() area = '';
  @Input() bedrooms: BRs = 'oneBR';

  constructor(private fb: FormBuilder,
              private firestoreService: FirestoreService,
              ) {
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
    this.interestForm.patchValue({ bedrooms: selectElement.value });
  }

  sendInterest() {
    this.formSubmitted = true;
    if (!this.interestForm.valid) {
      this.interestForm.markAllAsTouched();
      return;
    }

    const interest = new Interest(
      this.interestForm.controls['email'].value,
      this.area,
      parseFloat(this.interestForm.controls['maxPrice'].value),
      parseFloat(this.interestForm.controls['estimatedSize'].value),
      this.numOfBedroomsMapper(this.bedrooms),
      parseFloat(this.interestForm.controls['minPrice'].value)
    );
    this.fireGtmEvent(`Interest sent`);
    this.firestoreService.addInterest(interest).subscribe({
      next: () => {
        this.interestSuccess = true;
      },
      error: (error) => {
        if (error.message === 'Interest already exists') {
          this.interestExists = true;
        } else {
          console.error('An unexpected error occurred:', error);
        }
      },
    });
  }

  fireGtmEvent(eventName: string, eventParams: any = {}) {
    dataLayer = dataLayer || [];
    dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  numOfBedroomsMapper(bedroomsSelection: BRs): number {
    switch (bedroomsSelection) {
      case 'oneBR':
        return 1;
      case 'twoBR':
        return 2;

      case 'threeBR':
        return 3;

      case 'studio':
        return 0;
      default:
        return 2;
    }
  }
}
