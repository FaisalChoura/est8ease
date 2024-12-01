import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFiltersComponent],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent {
  isFilterPanelOpen = false;
  properties = [
    {
      title: 'Spacious 2-bedroom Apartment',
      features: { view: 'Good View', floor: '15th Floor' },
      description: '15th-floor apartment with city skyline views.',
      price: '$1,500/month',
      size: '900 sqft',
    },
    {
      title: 'Cozy Studio Apartment',
      features: { view: 'Park View', floor: '5th Floor' },
      description: 'Studio apartment with nearby park access.',
      price: '$900/month',
      size: '450 sqft',
    },
    // Add more properties as needed
  ];

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }
}
