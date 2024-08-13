import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsService } from './interests.service';
import { ActivatedRoute } from '@angular/router';
import { Interest } from '../models/interest';
import { Observable, of } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CheckBoxRendererComponent } from '../cell-renderers/check-box/check-box-renderer.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css',
})
export class InterestsComponent implements OnInit {
  interests$: Observable<Interest[]> = of([]);
  email = '';
  constructor(
    private interestsService: InterestsService,
    private activatedRoute: ActivatedRoute
  ) {}
  colDefs: ColDef[] = [
    {
      headerName: 'Active',
      field: 'active',
      cellRenderer: CheckBoxRendererComponent,
      width: 100,
      cellRendererParams: {
        onChange: this.onCheckboxChange.bind(this),
      },
    },
    { field: 'name_of_area', width: 200 },
    { field: 'max_price' },
    { field: 'min_price' },
    { field: 'size' },
    { field: 'number_of_bedrooms' },
    { field: 'createdAt' },
  ];

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.queryParams['email'];
    this.interests$ = this.interestsService.findInterestsByEmail(this.email);
  }

  onCheckboxChange(params: any) {
    const data = params.data;
    data.active = !data.active;
    console.log(data);

    // Send HTTP request to update the value in the backend
    this.interestsService.update(data).subscribe();
  }
}
