import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFiltersComponent } from '../property-filters/property-filters.component';
import { FilterService } from '../filters.service';
import { dbService } from '../db.service';
import { Property } from '../models/property';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, PropertyFiltersComponent, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
})
export class PropertyListComponent implements OnInit {
  showAlertModal = false; // Control the visibility of the modal
  email = ''; // Store the user's email address
  constructor(
    private filterService: FilterService,
    private dbService: dbService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const payload = this.filterService.generateFiltersPayload(queryParams);
    this.dbService.getProperties(payload).subscribe((properties) => {
      this.properties = properties;
    });

    setTimeout(() => {
      this.showAlertModal = true;
    }, 2000);
  }

  isFilterPanelOpen = false;
  properties: Property[] = [];

  toggleFilterPanel(): void {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  getTrueKeys(extraDetails: Record<string, boolean>): string[] {
    if (!extraDetails) return [];
    return Object.keys(extraDetails).filter((key) => extraDetails[key]);
  }

  openDetails(url: string): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('URL is not available');
    }
  }

  subscribeToAlerts(): void {
    if (this.isEmailValid(this.email)) {
      alert(`You are now subscribed to alerts with email: ${this.email}`);
      this.showAlertModal = false; // Close modal
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
      !this.elementRef.nativeElement
        .querySelector('.modal-popup')
        .contains(target)
    ) {
      this.closeModal();
    }
  }
}
