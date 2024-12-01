import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { Chip } from '../models/chip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PropertyFiltersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  areas = [
    'Downtown',
    'Uptown',
    'Suburbs',
    'Beachside',
    'City Center',
    'Hilltop',
  ];
  filteredAreas: string[] = [];
  selectedArea: string | null = null;
  isDropdownVisible = false;

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getSelectedBedrooms().subscribe((bedrooms) => {
      this.bedroomFilterChips.forEach((chip) => {
        chip.selected = bedrooms.includes(chip.label);
      });
    });
    this.filterService.getSelectedFilters().subscribe((filters) => {
      this.filterChips.forEach((chip) => {
        chip.selected = filters.includes(chip.value);
      });
    });
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-bar')) {
      this.isDropdownVisible = false;
    }
  }

  // bedroom Chips
  bedroomFilterChips = [
    new Chip('Studio', 0, false),
    new Chip('1 BR', 1, false),
    new Chip('2 BR', 2, false),
    new Chip('3 BR', 3, false),
  ];

  // Filter Chips
  filterChips = [
    { label: 'Good View', value: 'good_view', selected: false },
    { label: 'High Floor', value: 'high_floor', selected: false },
    { label: 'Chiller Free', value: 'chiller_free', selected: false },
    { label: 'Near Metro', value: 'near_metro', selected: false },
  ];

  // Filter Panel State
  isFilterPanelOpen = false;

  // Update filteredAreas and show dropdown
  onSearchInput(): void {
    const query = this.searchControl.value?.toLowerCase() || '';
    this.filteredAreas = this.areas.filter((area) =>
      area.toLowerCase().includes(query)
    );
    this.isDropdownVisible = this.filteredAreas.length > 0;
  }

  onSearchFocus(): void {
    const query = this.searchControl.value?.toLowerCase() || '';
    this.filteredAreas = this.areas.filter((area) =>
      area.toLowerCase().includes(query)
    );
    this.isDropdownVisible = true; // Show dropdown
  }

  // Select an area and close the dropdown
  onSelectArea(area: string): void {
    this.searchControl.setValue(area);
    this.filteredAreas = [];
    this.isDropdownVisible = false;
  }

  // Toggle Filter Chips
  toggleChip(chip: any): void {
    chip.selected = !chip.selected;
    if (chip.selected) {
      this.filterService.addFilter(chip.value);
    } else {
      this.filterService.removeFilter(chip.value);
    }
  }

  // Toggle Filter Chips
  selectBedroom(chip: any): void {
    chip.selected = !chip.selected;
    if (chip.selected) {
      this.filterService.addBedroom(chip.label);
    } else {
      this.filterService.removeBedroom(chip.label);
    }
  }

  // Toggle Filter Panel
  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  // Submit Filters
  submitFilters(): void {
    const selectedChips = [
      ...this.filterChips.filter((chip) => chip.selected),
      // ...this.additionalChips.filter((chip) => chip.selected)
    ].map((chip) => chip.label);

    const searchData = {
      area: this.selectedArea,
      filters: selectedChips,
      // priceRange: this.selectedPriceRange,
      // bedrooms: this.selectedBedrooms
    };

    console.log('Search Data:', searchData);
    this.router.navigate(['/property_list'], {
      queryParams: { search: searchData },
    });

    // Example HTTP Request
    // this.http.post('/api/search', searchData).subscribe(response => {
    //   console.log('Search Response:', response);
    // });
  }
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
