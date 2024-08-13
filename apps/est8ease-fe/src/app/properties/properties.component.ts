import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, debounceTime, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe, NgFor } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { LinkComponent } from '../cell-renderers/link/link.component';
import { areaPricePerSqm } from '../average_price_per_sqm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Property } from '../models/property';
import { Interest } from '../models/interest';

type BRs = 'oneBR' | 'twoBR' | 'threeBR' | 'studio';

@Component({
  selector: 'properties',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgFor,
    JsonPipe,
    AgGridAngular,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  title = '';
  pricePerSqm = 0;
  properties$: Observable<any> | undefined;
  bedrooms: BRs = 'oneBR';
  area = '';
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  interestForm!: FormGroup;

  maxPriceControl = new FormControl();
  minPriceControl = new FormControl();
  estimatedSizeControl = new FormControl();
  emailControl = new FormControl();
  selectedPctControl = new FormControl();

  colDefs: ColDef[] = [
    { field: 'address', flex: 2 },
    { field: 'price' },
    { field: 'size' },
    { field: 'priceM2', headerName: 'Price/m²' },
    { field: 'url', headerName: 'Property Link', cellRenderer: LinkComponent },
    {
      headerName: '% difference with avg Price/m²',
      valueGetter: (params) => {
        const propertyPricePerSqm = params.data.priceM2;
        this.pricePerSqm;
        return propertyPricePerSqm
          ? (100 - (propertyPricePerSqm / this.pricePerSqm) * 100).toFixed(2)
          : 'N/A';
      },
    },
    // { field: 'updated_at', cellRenderer: TimeStampDataComponent },
  ];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.interestForm = this.fb.group({
      bedrooms: [this.bedrooms, Validators.required],
      minPrice: [null, [Validators.required, Validators.min(1)]],
      maxPrice: [null, [Validators.required, Validators.min(1)]],
      estimatedSize: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.interestForm.valueChanges.subscribe((form) => {
      let filteredProperties = this.properties;

      if (form['maxPrice'] != null && form['maxPrice'] > 0) {
        const maxPrice = form['maxPrice'];
        if (!isNaN(maxPrice)) {
          filteredProperties = filteredProperties.filter(
            (property) => property.price <= maxPrice
          );
        }
      }

      if (form['minPrice'] != null && form['minPrice'] > 0) {
        const minPrice = form['minPrice'];
        if (!isNaN(minPrice)) {
          filteredProperties = filteredProperties.filter(
            (property) => property.price >= minPrice
          );
        }
      }

      if (form['estimatedSize'] != null && form['estimatedSize'] > 0) {
        const size = form['estimatedSize'];
        if (!isNaN(size)) {
          filteredProperties = filteredProperties.filter((property) => {
            return (
              property.size < size + size * 0.05 &&
              property.size > size - size * 0.05
            );
          });
        }
      }

      this.filteredProperties = filteredProperties;
    });

    this.selectedPctControl.setValue(10);
    this.area = this.route.snapshot.paramMap.get('id') ?? '';
    this.title = this.area.replaceAll('_', ' ');

    this.route.paramMap.subscribe((params) => {
      this.area = params.get('id') ?? '';
      this.fetchProperties(this.area, this.bedrooms);
    });

    this.selectedPctControl.valueChanges.subscribe((x) =>
      this.fetchProperties(this.area, this.bedrooms)
    );

    combineLatest([
      this.maxPriceControl.valueChanges.pipe(
        startWith(this.maxPriceControl.value || ''), // Start with the current value or an empty string
        debounceTime(300)
      ),
      this.estimatedSizeControl.valueChanges.pipe(
        startWith(this.estimatedSizeControl.value || ''), // Start with the current value or an empty string
        debounceTime(300)
      ),
      this.minPriceControl.valueChanges.pipe(
        startWith(this.estimatedSizeControl.value || ''), // Start with the current value or an empty string
        debounceTime(300)
      ),
    ]).subscribe(
      ([maxPriceValue, sizeValue, minPriceValue]: [number, number, number]) => {
        let filteredProperties = this.properties;

        if (maxPriceValue != null && maxPriceValue > 0) {
          const maxPrice = maxPriceValue;
          if (!isNaN(maxPrice)) {
            filteredProperties = filteredProperties.filter(
              (property) => property.price <= maxPrice
            );
          }
        }

        if (minPriceValue != null && minPriceValue > 0) {
          const minPrice = minPriceValue;
          if (!isNaN(minPrice)) {
            filteredProperties = filteredProperties.filter(
              (property) => property.price >= minPrice
            );
          }
        }

        if (sizeValue != null && sizeValue > 0) {
          const size = sizeValue;
          if (!isNaN(size)) {
            filteredProperties = filteredProperties.filter((property) => {
              return (
                property.size < size + size * 0.05 &&
                property.size > size - size * 0.05
              );
            });
          }
        }

        this.filteredProperties = filteredProperties;
      }
    );
  }

  changeBedroomSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.interestForm.patchValue({ bedrooms: selectElement.value });
    this.bedrooms = selectedValue as BRs;
    this.maxPriceControl.reset();
    this.estimatedSizeControl.reset();
    this.fetchProperties(this.area, this.bedrooms);
  }

  fetchProperties(area: string, bedrooms: BRs) {
    this.pricePerSqm =
      areaPricePerSqm.get(area) == undefined
        ? 0
        : areaPricePerSqm.get(area)![bedrooms];

    this.firestoreService
      .getProperties(
        area,
        this.pricePerSqm,
        this.numOfBedroomsMapper(bedrooms),
        this.selectedPctControl.value / 100
      )
      .subscribe((x) => {
        this.properties = x.map((y) => new Property(y));
        this.filteredProperties = x.map((y) => new Property(y));
      });
  }

  numOfBedroomsMapper(bedroomsSelection: BRs): number {
    switch (bedroomsSelection) {
      case 'oneBR':
        return 1;
      case 'twoBR':
        return 2;

      case 'threeBR':
        return 3;

      case 'studio':
        return 0;
      default:
        return 2;
    }
  }

  sendInterest() {
    if (!this.interestForm.valid) {
      this.interestForm.markAllAsTouched();
      return;
    }
    const interest = new Interest(
      this.emailControl.value,
      this.area,
      parseFloat(this.maxPriceControl.value),
      parseFloat(this.estimatedSizeControl.value),
      this.numOfBedroomsMapper(this.bedrooms),
      parseFloat(this.minPriceControl.value)
    );
    this.firestoreService.addInterest(interest).subscribe();
  }

  onAreaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    // Navigate to the same page with the selected value as an ID in the URL
    this.router.navigate([`/properties/${selectedValue}`]);
  }
}
