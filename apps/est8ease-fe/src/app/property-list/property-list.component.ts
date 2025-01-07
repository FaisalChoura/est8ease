import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { dbService } from '../db.service';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExtraDetails } from '../models/extra-details';
import { Properties } from '../models/properties';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  from,
  fromEvent,
  mergeMap,
  Observable,
  of,
  switchMap
} from 'rxjs';
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
  private propertiesSubject = new BehaviorSubject<Properties>(new Properties([]));
  properties: Observable<Properties> = this.propertiesSubject
  sortedProperties: Observable<Property[]> = of([]);
  currentPage = 1; // Current page number
  isLoading = false; // Track loading state

  // Sorting variables
  showSortFields = false; // Track visibility of sort fields
  sortOption = ''; // Default sort option
  sortOrder = ''; // Default sort order
  private sortOptionSubject = new BehaviorSubject<string>(this.sortOption);
  private sortOrderSubject = new BehaviorSubject<string>(this.sortOrder);
  transformedFilters$: Observable<string[]> = of([])

  @ViewChild('filterButton', { static: true }) filterButton!: ElementRef;
  showFloatingFilterButton = false;


  ExtraDetails = ExtraDetails;

  constructor(
    public filterService: FilterService,
    private dbService: dbService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  fetchProperties() {
    this.isLoading = true;
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const payload = this.filterService.generateFiltersPayload(queryParams);
    // Fetch properties
    combineLatest([
      this.sortOptionSubject,
      this.sortOrderSubject,
    ]).pipe(
      switchMap(([sortOption, sortOrder]) => {
        return this.dbService.getProperties(payload, this.currentPage, sortOption, sortOrder)
      })
    ).subscribe((properties) => {
      // TODO change the is loading to finally
      this.isLoading = false;
      // this.propertiesSubject.next(properties);
      const concatenatedList = [...this.propertiesSubject.value.list, ...properties.list];
      const newPropertyAggregate = new Properties(concatenatedList, properties.count, properties.avgCostPerSqm);
      this.propertiesSubject.next(newPropertyAggregate); // Emit new properties
    });
  }

  ngOnInit(): void {
    this.fetchProperties();

    this.transformedFilters$ = this.filterService.getSelectedFilters().pipe(
      map(filters => filters.map(filter => ExtraDetails.getExtraDetail(filter).text) )
    )

    fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => this.onScroll());
  }

  resetProperties(): void {
    this.propertiesSubject.next(new Properties([]));
    this.currentPage = 1;
  }

  // @HostListener('window:mousewheel', [])
  // @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;

    const isBottomReached = scrollTop + clientHeight >= scrollHeight - 200;

    if (isBottomReached && !this.isLoading) {
      const properties = this.propertiesSubject.value;

      if (properties.list.length < properties.count) {
        console.log('Loading more properties...');
        this.currentPage++;
        this.fetchProperties();
      }
    }
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
    this.resetProperties();
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
      const interests = this.filterService.generateInterest(this.email);
      this.fireGtmEvent('Alerts subscribed', {interests});
      from(interests)
        .pipe(
          // Use mergeMap to process each interest concurrently or concatMap to process them sequentially
          mergeMap(interest => this.dbService.addInterest(interest))
        )
        .subscribe({
          next: response => console.log('Interest added successfully', response),
          error: error => console.error('Error adding interest', error),
          complete: () => {
            this.showAlertModal = false;
          }
        });

    } else {
      alert('Please enter a valid email address.');
    }
  }

  // Open modal
  openNotificationModal(): void {
    this.showAlertModal = true;
    console.log(this.showAlertModal)
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

  onFilterChange() {
    this.resetProperties();
    this.fetchProperties();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const filterButton = this.filterButton.nativeElement;
    const rect = filterButton.getBoundingClientRect();

    // Check if the "Filter Properties" button is out of view
    this.showFloatingFilterButton = rect.top + rect.height < 0;
  }

  // TODO create service for this
  // TODO create service for this
  fireGtmEvent(eventName: string, eventParams: any = {}) {
    window.gtag('event', eventName, {...eventParams});
  }

}
