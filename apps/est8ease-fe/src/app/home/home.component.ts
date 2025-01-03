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
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');

  // Map for areas with display-friendly names
  areas = {
    Down_Town: 'Down Town',
    Marina: 'Marina',
    Palm_Jumeirah: 'Palm Jumeirah',
    Business_Bay: 'Business Bay',
    Jumierah_Lake_Towers: 'Jumeirah Lake Towers',
    Jumierah_Beach_Residence: 'Jumeirah Beach Residence',
    Al_Barsha: 'Al Barsha',
    Dubai_Hills: 'Dubai Hills',
    City_Walk: 'City Walk',
    Jumeirah_Village_Circle: 'Jumeirah Village Circle',
    Dubai_Silicon_Oasis: 'Dubai Silicon Oasis',
    Greens: 'Greens',
    Dubai_Sports_City: 'Dubai Sports City',
    Emaar_Beach_Front: 'Emaar Beach Front'
  };

  filteredAreas: { key: string, value: string }[] = [];
  selectedArea: string | null = null;
  isDropdownVisible = false;

  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getSelectedBedrooms().subscribe((bedrooms) => {
      this.bedroomFilterChips.forEach((chip) => {
        chip.selected = bedrooms.includes(typeof chip.value === 'number' ? chip.value : 10);
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

  // Bedroom Chips
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
    this.filteredAreas = Object.entries(this.areas)
      .filter(([key, value]) => value.toLowerCase().includes(query))
      .map(([key, value]) => ({ key, value }));
    this.isDropdownVisible = this.filteredAreas.length > 0;
  }

  onSearchFocus(): void {
    const query = this.searchControl.value?.toLowerCase() || '';
    this.filteredAreas = Object.entries(this.areas)
      .filter(([key, value]) => value.toLowerCase().includes(query))
      .map(([key, value]) => ({ key, value }));
    this.isDropdownVisible = true; // Show dropdown
  }

  // Select an area and close the dropdown
  onSelectArea(area: { key: string, value: string }): void {
    this.searchControl.setValue(area.value);
    this.filterService.setAreaName(area.key);
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
      this.filterService.addBedroom(chip.value);
    } else {
      this.filterService.removeBedroom(chip.value);
    }
  }

  // Toggle Filter Panel
  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  // Submit Filters
  submitFilters(): void {
    const searchData = this.filterService.generateFiltersPayload();

    this.router.navigate(['/property_list'], {
      queryParams: searchData.toQueryParams(),
    });
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
