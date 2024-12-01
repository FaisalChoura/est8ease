import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dbService } from './db.service';
import { FiltersPayload } from './models/filters-payload';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // BehaviorSubject to store selected filters
  private selectedExtraDetailsFiltersSubject = new BehaviorSubject<string[]>([]);
  private selectedExtraDetailsFilter$ = this.selectedExtraDetailsFiltersSubject.asObservable();

  private selectedBedroomsSubject = new BehaviorSubject<string[]>([]);
  private selectedBedrooms$ = this.selectedBedroomsSubject.asObservable();

  private selectedAreaNameSubject = new BehaviorSubject<string>('');
  private selectedAreaName$ = this.selectedAreaNameSubject.asObservable();

  constructor(private dbService: dbService) {
  }

  getSelectedBedrooms(): Observable<string[]> {
    return this.selectedBedrooms$;
  }

  // Get the observable to listen for filter changes
  getSelectedFilters(): Observable<string[]> {
    return this.selectedExtraDetailsFilter$;
  }

  getAreaName(): Observable<string> {
    return this.selectedAreaName$;
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

  setAreaName(areaName: string): void {
    this.selectedAreaNameSubject.next(areaName);
  }

  generateFiltersPayload(): FiltersPayload {
    return new FiltersPayload(
      this.selectedBedroomsSubject.value.map(bedroom => parseInt(bedroom)),
      this.selectedAreaNameSubject.value,
      this.selectedExtraDetailsFiltersSubject.value.reduce((acc, filter) => {
        acc.set(filter, true);
        return acc;
      }, new Map<string,boolean>)
    );
  }

}
