import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dbService } from './db.service';
import { FiltersPayload } from './models/filters-payload';
import { Params } from '@angular/router';
import { Interest } from './models/interest';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // BehaviorSubject to store selected filters
  private selectedExtraDetailsFiltersSubject = new BehaviorSubject<string[]>(
    []
  );
  private selectedExtraDetailsFilter$ =
    this.selectedExtraDetailsFiltersSubject.asObservable();

  private selectedBedroomsSubject = new BehaviorSubject<number[]>([]);
  private selectedBedrooms$ = this.selectedBedroomsSubject.asObservable();

  private selectedAreaNameSubject = new BehaviorSubject<string>('');
  private selectedAreaName$ = this.selectedAreaNameSubject.asObservable();

  private minSizeSubject = new BehaviorSubject<number>(0);
  private minSize$ = this.minSizeSubject.asObservable();

  constructor(private dbService: dbService) {}

  getSelectedBedrooms(): Observable<number[]> {
    return this.selectedBedrooms$;
  }

  // Get the observable to listen for filter changes
  getSelectedFilters(): Observable<string[]> {
    return this.selectedExtraDetailsFilter$;
  }

  getAreaName(): Observable<string> {
    return this.selectedAreaName$;
  }

  get size(): Observable<number> {
    return this.minSize$;
  }

  setSize(size: number): void {
    this.minSizeSubject.next(size);
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
    this.selectedExtraDetailsFiltersSubject.next(
      currentFilters.filter((f) => f !== filter)
    );
  }

  addBedroom(filter: number): void {
    const currentFilters = this.selectedBedroomsSubject.value;
    if (!currentFilters.includes(filter)) {
      this.selectedBedroomsSubject.next([...currentFilters, filter]);
    }
  }

  // Remove a filter from the list
  removeBedroom(filter: number): void {
    const currentFilters = this.selectedBedroomsSubject.value;
    this.selectedBedroomsSubject.next(
      currentFilters.filter((f) => f !== filter)
    );
  }

  // Clear all filters
  clearFilters(): void {
    this.selectedExtraDetailsFiltersSubject.next([]);
  }

  setAreaName(areaName: string): void {
    this.selectedAreaNameSubject.next(areaName);
  }

  generateFiltersPayload(params: Params = {}): FiltersPayload {
    // if all behaviour subjects are empty then populate from filters
    if (
      this.selectedBedroomsSubject.value.length === 0 &&
      !this.selectedAreaNameSubject.value &&
      this.selectedExtraDetailsFiltersSubject.value.length === 0 &&
      Object.keys(params).length > 0
    ) {
      this.populateFiltersFromParams(params);
    }

    return new FiltersPayload(
      this.selectedBedroomsSubject.value.map((bedroom) => bedroom),
      this.selectedAreaNameSubject.value,
      this.selectedExtraDetailsFiltersSubject.value.reduce((acc, filter) => {
        acc.set(filter, true);
        return acc;
      }, new Map<string, boolean>()),
      this.minSizeSubject.value
    );
  }

  generateInterest(email: string): Interest {
    return new Interest(
      email,
      this.selectedAreaNameSubject.value,
      10000000,
      0,
      this.selectedBedroomsSubject.value[0],
      0,
      this.selectedExtraDetailsFiltersSubject.value.reduce((acc, filter) => {
        acc.set(filter, true);
        return acc;
      }, new Map<string, boolean>())
    );
  }

  private populateFiltersFromParams(params: Params): void {
    // Set area name
    if (params['area']) {
      this.setAreaName(params['area']);
    }

    // Set bedrooms (multiple possible)
    if (params['bedrooms']) {
      const bedrooms = Array.isArray(params['bedrooms'])
        ? params['bedrooms']
        : [params['bedrooms']];
      bedrooms.forEach((bedroom) => this.addBedroom(parseInt(bedroom, 10)));
    }

    if (params['minSize']) {
      this.setSize(parseInt(params['minSize'], 10));
    }

    // Set other filters (all keys except 'area' and 'bedrooms')
    Object.keys(params).forEach((key) => {
      if (key !== 'area' && key !== 'bedrooms') {
        this.addFilter(key);
      }
    });
  }
}
