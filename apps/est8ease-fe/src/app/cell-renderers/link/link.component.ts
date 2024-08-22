import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
declare let dataLayer: any;

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
    this.fireGtmEvent('Link clicked', {
      url: this.url,
    });
    window.open(this.url, '_blank');
  }

  fireGtmEvent(eventName: string, eventParams: any = {}) {
    dataLayer = dataLayer || [];
    dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}
