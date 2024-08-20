import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClicksService } from './clicks.service';
import { ActivatedRoute } from '@angular/router';
import { Click } from '../models/click';

@Component({
  selector: 'app-clicks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clicks.component.html',
  styleUrl: './clicks.component.css',
})
export class ClicksComponent implements OnInit {
  constructor(
    private readonly clicksService: ClicksService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const email = this.activatedRoute.snapshot.queryParams['email'];

    const metaData = {
      bedrooms: this.activatedRoute.snapshot.queryParams['bedrooms'],
      name_of_area: this.activatedRoute.snapshot.queryParams['nameOfArea'],
      price: this.activatedRoute.snapshot.queryParams['price'],
      size: this.activatedRoute.snapshot.queryParams['size'],
      url: this.activatedRoute.snapshot.queryParams['url'],
    };

    const click = new Click(email, metaData);

    this.clicksService.create(click).subscribe((createdClick) => {
      window.location.href = click.meta_data['url'] || '';
    });
  }
}
