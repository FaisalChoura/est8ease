import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterService } from '../filters.service';
import { Chip } from '../models/chip';

declare let dataLayer: any;

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './property-filters.component.html',
  styleUrl: './property-filters.component.scss',
})
export class PropertyFiltersComponent implements OnInit {
  @Input() isFilterPanelOpen = false;
  // TODO might need to get clean up, the logic is a bit messy for the filter open state
  @Output() filterClosed = new EventEmitter<boolean>();
  @Output() filtersChanged = new EventEmitter<void>();

  bedroomFilterChips = [
    new Chip('Studio', 0, false),
    new Chip('1 BR', 1, false),
    new Chip('2 BR', 2, false),
    new Chip('3 BR', 3, false),
  ];

  constructor(private router: Router, private route: ActivatedRoute, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getSelectedBedrooms().subscribe((bedrooms) => {
      this.bedroomFilterChips.forEach((chip) => {
        chip.selected = bedrooms.includes(typeof chip.value === 'number' ? chip.value : 10);
      });
    })

    this.filterService.getSelectedFilters().subscribe((filters) => {
      this.additionalChips.forEach((chip) => {
        chip.selected = filters.includes(chip.value);
      });
    });
  }

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
    if (chip.selected) {
      this.filterService.addFilter(chip.value);
    } else {
      this.filterService.removeFilter(chip.value);
    }
    this.updateQueryParams();
    this.filtersChanged.emit();
  }

  selectBedroom(chip: any): void {
    chip.selected = !chip.selected;
    if (chip.selected) {
      this.filterService.addBedroom(chip.value);
    } else {
      this.filterService.removeBedroom(chip.value);
    }
    this.updateQueryParams();
    this.filtersChanged.emit();
  }

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
    this.filterClosed.emit(this.isFilterPanelOpen);
  }

  private updateQueryParams() {
    const filterData = this.filterService.generateFiltersPayload()

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filterData.toQueryParams(),
    });
  }
}
