import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // BehaviorSubject to store selected filters
  private selectedExtraDetailsFiltersSubject = new BehaviorSubject<string[]>([]);
  private selectedExtraDetailsFilter$ = this.selectedExtraDetailsFiltersSubject.asObservable();

  private selectedBedroomsSubject = new BehaviorSubject<string[]>([]);
  private selectedBedrooms$ = this.selectedBedroomsSubject.asObservable();

  getSelectedBedrooms(): Observable<string[]> {
    return this.selectedBedrooms$;
  }

  // Get the observable to listen for filter changes
  getSelectedFilters(): Observable<string[]> {
    return this.selectedExtraDetailsFilter$;
  }

  // Add a filter to the list
  addFilter(filter: string): void {
    const currentFilters = this.selectedExtraDetailsFiltersSubject.value;
    if (!currentFilters.includes(filter)) {
      this.selectedExtraDetailsFiltersSubject.next([...currentFilters, filter]);
    }
  }

  // Remove a filter from the list
  removeFilter(filter: string): void {
    const currentFilters = this.selectedExtraDetailsFiltersSubject.value;
    this.selectedExtraDetailsFiltersSubject.next(currentFilters.filter(f => f !== filter));
  }

  addBedroom(filter: string): void {
    const currentFilters = this.selectedBedroomsSubject.value;
    if (!currentFilters.includes(filter)) {
      this.selectedBedroomsSubject.next([...currentFilters, filter]);
    }
  }

  // Remove a filter from the list
  removeBedroom(filter: string): void {
    const currentFilters = this.selectedBedroomsSubject.value;
    this.selectedBedroomsSubject.next(currentFilters.filter(f => f !== filter));
  }

  // Clear all filters
  clearFilters(): void {
    this.selectedExtraDetailsFiltersSubject.next([]);
  }
}
