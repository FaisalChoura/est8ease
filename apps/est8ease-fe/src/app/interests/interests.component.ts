import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsService } from './interests.service';
import { ActivatedRoute } from '@angular/router';
import { Interest } from '../models/interest';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
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
