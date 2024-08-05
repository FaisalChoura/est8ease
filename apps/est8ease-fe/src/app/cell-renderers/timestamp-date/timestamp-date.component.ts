import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-timestamp-date',
  standalone: true,
  imports: [],
  templateUrl: './timestamp-date.component.html',
  styleUrl: './timestamp-date.component.scss',
})
export class TimeStampDataComponent implements ICellRendererAngularComp {
  timestamp: { seconds: number; nanoseconds: number } = {
    seconds: 0,
    nanoseconds: 0,
  };
  agInit(params: ICellRendererParams): void {
    this.timestamp = params.value;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }

  convertedTimeStamp(): string {
    const millisecondsFromSeconds = this.timestamp.seconds * 1000;

    // Convert nanoseconds to milliseconds
    const millisecondsFromNanoseconds = this.timestamp.nanoseconds / 1000000;

    // Total milliseconds
    const totalMilliseconds =
      millisecondsFromSeconds + millisecondsFromNanoseconds;
    const date = new Date(totalMilliseconds);

    // Extract the different components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedDate;
  }
}
