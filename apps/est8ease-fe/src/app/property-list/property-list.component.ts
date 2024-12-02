import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { dbService } from '../db.service';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFiltersComponent],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {

  constructor(private filterService: FilterService, private dbService: dbService, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const payload = this.filterService.generateFiltersPayload(queryParams);
    this.dbService.getProperties(payload).subscribe((properties) => {
      this.properties = properties;
    });

  }

  isFilterPanelOpen = false;
  properties: Property[] = [];

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  getTrueKeys(extraDetails: Record<string, boolean>): string[] {
    if (!extraDetails) return [];
    return Object.keys(extraDetails).filter(key => extraDetails[key]);
  }

  openDetails(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('URL is not available');
    }
  }
}
