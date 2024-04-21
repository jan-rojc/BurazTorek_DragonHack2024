import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { RemindersComponent } from './components/reminders/reminders.component';
import { BackboneComponent } from './components/backbone/backbone.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CustomApiComponent } from './components/custom-api/custom-api.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SmartHomeComponent } from './components/smart-home/smart-home.component';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: BackboneComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'smart-home',
        component: SmartHomeComponent
      },
      {
        path: 'reminders',
        component: RemindersComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'weather',
        component: WeatherComponent
      },
      {
        path: 'favourites',
        component: FavouritesComponent
      },
      {
        path: 'custom-api',
        component: CustomApiComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
