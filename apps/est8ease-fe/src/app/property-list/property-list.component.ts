import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { dbService } from '../db.service';
import { Property } from '../models/property';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFiltersComponent],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {

  constructor(private filterService: FilterService, private dbService: dbService) {
  }


  ngOnInit(): void {
    const payload = this.filterService.generateFiltersPayload();
    this.dbService.getProperties(payload).subscribe((properties) => {
      this.properties = properties;
    });

  }

  isFilterPanelOpen = false;
  properties: Property[] = [];

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }
}
