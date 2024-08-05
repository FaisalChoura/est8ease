import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';

export const routes: Routes = [
  { path: 'properties/:id', component: PropertiesComponent },
];
