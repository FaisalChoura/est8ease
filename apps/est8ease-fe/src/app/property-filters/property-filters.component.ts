import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterService } from '../filters.service';
import { Chip } from '../models/chip';
import { distinctUntilChanged, skip } from 'rxjs';

declare let dataLayer: any;

@Component({
  selector: 'app-property-filters',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './property-filters.component.html',
  styleUrl: './property-filters.component.scss',
})
export class PropertyFiltersComponent implements OnInit {
  @Input() isFilterPanelOpen = false;
  // TODO might need to get clean up, the logic is a bit messy for the filter open state
  @Output() filterClosed = new EventEmitter<boolean>();
  @Output() filtersChanged = new EventEmitter<void>();
  minSizeControl: FormControl = new FormControl('');
  maxSizeControl: FormControl = new FormControl('');
  minPriceControl: FormControl = new FormControl('');
  maxPriceControl: FormControl = new FormControl('');

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

    this.filterService.minSize.subscribe((size) => {
      const currentSize = this.minSizeControl.value;
      const newSize = size ? size.toString() : '';
      if (currentSize !== newSize) {
        this.minSizeControl.setValue(newSize, { emitEvent: false }); // Prevent triggering valueChanges
      }
    });

    // Listen to changes in the size control
    this.minSizeControl.valueChanges
      .pipe(
        skip(1), // Skip the first emission (initial value setting)
        distinctUntilChanged() // Prevent handling the same value multiple times
      )
      .subscribe((value: string) => {
        this.filterService.setMinSize(parseFloat(value));
        this.updateQueryParams();
        this.filtersChanged.emit();
      });

    this.filterService.maxSize.subscribe((size) => {
      const currentSize = this.minSizeControl.value;
      const newSize = size ? size.toString() : '';
      if (currentSize !== newSize) {
        this.maxSizeControl.setValue(newSize, { emitEvent: false }); // Prevent triggering valueChanges
      }
    });

    this.filterService.maxPrice.subscribe((size) => {
      const currentPrice = this.maxPriceControl.value;
      const newPrice = size ? size.toString() : '';
      if (currentPrice !== newPrice) {
        this.maxPriceControl.setValue(newPrice, { emitEvent: false }); // Prevent triggering valueChanges
      }
    });

    this.filterService.minPrice.subscribe((size) => {
      const currentPrice = this.minPriceControl.value;
      const newPrice = size ? size.toString() : '';
      if (currentPrice !== newPrice) {
        this.minPriceControl.setValue(newPrice, { emitEvent: false }); // Prevent triggering valueChanges
      }
    });

    // Listen to changes in the size control
    this.maxSizeControl.valueChanges
      .pipe(
        skip(1), // Skip the first emission (initial value setting)
        distinctUntilChanged() // Prevent handling the same value multiple times
      )
      .subscribe((value: string) => {
        this.filterService.setMaxSize(parseFloat(value));
        this.updateQueryParams();
        this.filtersChanged.emit();
      });


    this.maxPriceControl.valueChanges
      .pipe(
        skip(1), // Skip the first emission (initial value setting)
        distinctUntilChanged() // Prevent handling the same value multiple times
      )
      .subscribe((value: string) => {
        this.filterService.setMaxPrice(parseFloat(value));
        this.updateQueryParams();
        this.filtersChanged.emit();
      });

    this.minPriceControl.valueChanges
      .pipe(
        skip(1), // Skip the first emission (initial value setting)
        distinctUntilChanged() // Prevent handling the same value multiple times
      )
      .subscribe((value: string) => {
        this.filterService.setMinPrice(parseFloat(value));
        this.updateQueryParams();
        this.filtersChanged.emit();
      });
  }

  // Additional Chips
  additionalChips = [
    { label: 'Good View',value: 'good_view' , selected: false },
    { label: 'High Floor',value: 'high_floor', selected: false },
    { label: 'Chiller Free', value: 'chiller_free', selected: false },
    { label: 'Near Metro', value: 'near_public_transport', selected: false },
    { label: 'Corner Unit', value: 'corner_unit', selected: false },
    { label: 'Big Terrace', value: 'big_terrace', selected: false},
    { label: 'Brand New / Renovated', value: 'brand_new_or_renovated', selected: false },
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
