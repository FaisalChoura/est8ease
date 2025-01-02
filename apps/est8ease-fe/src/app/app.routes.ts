import { Routes } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { InterestsComponent } from './interests/interests.component';
import { ClicksComponent } from './clicks/clicks.component';
import { HomeComponent } from './home/home.component';
import { PropertyListComponent } from './property-list/property-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/properties/Emaar_Beach_Front', pathMatch: 'full' },
  { path: 'properties/:id', component: PropertiesComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'clicks', component: ClicksComponent },
  { path: 'home', component: HomeComponent },
  { path: 'property_list', component: PropertyListComponent}
];
