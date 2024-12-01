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
  styleUrl: './property-filters.component.scss',
})
export class PropertyFiltersComponent {
  @Input() isFilterPanelOpen = false;
  // Additional Chips
  additionalChips = [
    { label: 'Furnished', selected: false },
    { label: 'Parking Included', selected: false },
    { label: 'Gym Access', selected: false }
  ];

  // // Dropdown Filters
  // priceRanges = ['< $1,000', '$1,000 - $2,000', '$2,000 - $3,000', '> $3,000'];
  // selectedPriceRange: string = '';
  //
  // bedroomOptions = ['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms'];
  // selectedBedrooms: string = '';
  toggleChip(chip: any): void {
    chip.selected = !chip.selected;
  }

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }
}
