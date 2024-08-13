import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { InterestsComponent } from './interests/interests.component';

export const routes: Routes = [
  { path: '', redirectTo: '/properties/Emaar_Beach_Front', pathMatch: 'full' },
  { path: 'properties/:id', component: PropertiesComponent },
  { path: 'interests', component: InterestsComponent },
];
