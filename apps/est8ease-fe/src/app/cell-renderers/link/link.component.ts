import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent implements ICellRendererAngularComp {
  url: string = '';
  agInit(params: ICellRendererParams): void {
    this.url = params.value;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  linkClicked() {
    window.open(this.url, '_blank');
  }
}
