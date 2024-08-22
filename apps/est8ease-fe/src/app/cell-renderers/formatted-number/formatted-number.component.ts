import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-comma-cell-renderer',
  template: `<span>{{ formattedValue }}</span>`,
})
export class FormattedNumberRendererComponent
  implements ICellRendererAngularComp
{
  public formattedValue = '';

  // AG Grid will call this method to pass the value to the cell renderer
  agInit(params: any): void {
    this.formattedValue = this.formatWithCommas(params.value);
  }

  // This method is called whenever the cell value changes
  refresh(params: any): boolean {
    this.formattedValue = this.formatWithCommas(params.value);
    return true;
  }

  // Helper method to format numbers with commas
  private formatWithCommas(value: number): string {
    return value.toLocaleString('en-US');
  }
}
