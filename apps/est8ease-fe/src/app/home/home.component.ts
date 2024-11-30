import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchControl = new FormControl('');
  areas = ['Downtown', 'Uptown', 'Suburbs', 'Beachside', 'City Center', 'Hilltop'];
  filteredAreas: string[] = [];
  selectedArea: string | null = null;

  // Filter Chips
  filterChips = [
    { label: 'Good View', selected: false },
    { label: 'High Floor', selected: false },
    { label: 'Near Public Transport', selected: false },
    { label: 'Pet Friendly', selected: false }
  ];

  // Additional Chips
  additionalChips = [
    { label: 'Furnished', selected: false },
    { label: 'Parking Included', selected: false },
    { label: 'Gym Access', selected: false }
  ];

  // Dropdown Filters
  priceRanges = ['< $1,000', '$1,000 - $2,000', '$2,000 - $3,000', '> $3,000'];
  selectedPriceRange: string = '';

  bedroomOptions = ['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms'];
  selectedBedrooms: string = '';

  // Filter Panel State
  isFilterPanelOpen = false;

  // Filter Area Autocomplete
  onSearchInput(): void {
    const query = this.searchControl.value?.toLowerCase() || '';
    this.filteredAreas = this.areas.filter((area) =>
      area.toLowerCase().includes(query)
    );
  }

  onSelectArea(area: string): void {
    this.searchControl.setValue(area);
    this.selectedArea = area;
    this.filteredAreas = [];
  }

  // Toggle Filter Chips
  toggleChip(chip: any): void {
    chip.selected = !chip.selected;
  }

  // Toggle Filter Panel
  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  // Submit Filters
  submitFilters(): void {
    const selectedChips = [
      ...this.filterChips.filter((chip) => chip.selected),
      ...this.additionalChips.filter((chip) => chip.selected)
    ].map((chip) => chip.label);

    const searchData = {
      area: this.selectedArea,
      filters: selectedChips,
      priceRange: this.selectedPriceRange,
      bedrooms: this.selectedBedrooms
    };

    console.log('Search Data:', searchData);

    // Example HTTP Request
    // this.http.post('/api/search', searchData).subscribe(response => {
    //   console.log('Search Response:', response);
    // });
  }
}
