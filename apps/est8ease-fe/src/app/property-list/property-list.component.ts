import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { dbService } from '../db.service';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExtraDetails } from '../models/extra-details';
import { Properties } from '../models/properties';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFiltersComponent, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  showAlertModal = false;
  email = '';
  isFilterPanelOpen = false;
  properties: Observable<Properties> = of(new Properties([]));
  sortedProperties: Observable<Property[]> = of([]);


  // Sorting variables
  showSortFields = false; // Track visibility of sort fields
  sortOption = 'price'; // Default sort option
  sortOrder = 'asc'; // Default sort order
  private sortOptionSubject = new BehaviorSubject<string>(this.sortOption);
  private sortOrderSubject = new BehaviorSubject<string>(this.sortOrder);

  ExtraDetails = ExtraDetails;

  constructor(
    private filterService: FilterService,
    private dbService: dbService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const payload = this.filterService.generateFiltersPayload(queryParams);

    // Fetch properties
    this.properties = this.dbService.getProperties(payload).pipe(map((p) => p));

    // Combine properties with sorting options
    this.sortedProperties = combineLatest([
      this.properties,
      this.sortOptionSubject,
      this.sortOrderSubject,
    ]).pipe(
      map(([properties, sortOption, sortOrder]) => {
        const list = properties.list.slice(); // Create a copy of the list

        // Sort the list based on the selected option and order
        list.sort((a, b) => {
          let comparison = 0;
          if (sortOption === 'price') {
            comparison = a.price - b.price;
          } else if (sortOption === 'size') {
            comparison = a.size - b.size;
          } else if (sortOption === 'pricePerSqm') {
            comparison = a.priceM2 - b.priceM2;
          }

          // Reverse the order if descending
          return sortOrder === 'desc' ? -comparison : comparison;
        });

        return list;
      })
    );

    // Show alert modal after 2 seconds
    setTimeout(() => {
      this.showAlertModal = true;
    }, 2000);
  }

  // Toggle filter panel visibility
  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  // Open property details in a new tab
  openDetails(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('URL is not available');
    }
  }

  // Update sorting options
  sortProperties(): void {
    this.sortOptionSubject.next(this.sortOption);
    this.sortOrderSubject.next(this.sortOrder);
  }

  // Toggle visibility of sort fields
  toggleSortFields(): void {
    this.showSortFields = !this.showSortFields;
  }

  // Subscribe to alerts
  subscribeToAlerts(): void {
    if (this.isEmailValid(this.email)) {
      alert(`You are now subscribed to alerts with email: ${this.email}`);
      this.showAlertModal = false;
    } else {
      alert('Please enter a valid email address.');
    }
  }

  // Close modal
  closeModal(): void {
    this.showAlertModal = false;
  }

  // Validate email format
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      this.showAlertModal && // Check if the modal is open
      !this.elementRef.nativeElement.querySelector('.modal-popup')?.contains(target)
    ) {
      this.closeModal();
    }
  }


}
