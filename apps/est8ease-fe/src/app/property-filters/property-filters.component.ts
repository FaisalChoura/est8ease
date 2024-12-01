import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyFilterChangeObject } from '../models/property-filter-change-object';
import { Interest } from '../models/interest';
import { dbService } from '../db.service';
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
    { label: 'Good View',value: 'good_view' , selected: false },
    { label: 'High Floor',value: 'high_floor', selected: false },
    { label: 'Chiller Free', value: 'chiller_free', selected: false },
    { label: 'Near Metro', value: 'near_metro', selected: false },
    { label: 'Corner Unit', value: 'corner_unit', selected: false },
    { label: 'Recently Renovated', value: 'recently_renovated', selected: false },
    { label: 'Big Terrace', value: 'big_terrace', selected: false},
    { label: 'Brand New Unit', value: 'brand_new_unit', selected: false },
    { label: 'Easy Sheikh Zayed Road Access', value: 'easy_access_to_sheikh_zayed_road', selected: false },
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
