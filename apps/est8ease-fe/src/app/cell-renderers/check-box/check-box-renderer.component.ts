import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-check-box-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-box-renderer.component.html',
  styleUrl: './check-box-renderer.component.css',
})
export class CheckBoxRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onChange(event: any) {
    this.params.onChange(this.params);
  }
}
