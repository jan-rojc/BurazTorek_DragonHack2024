import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

import { FullCalendarModule } from '@fullcalendar/angular';
import { RemindersComponent } from './components/reminders/reminders.component';
import { BackboneComponent } from './components/backbone/backbone.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CustomApiComponent } from './components/custom-api/custom-api.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    BackboneComponent,
    FolderPage,
    HomeComponent,
    RemindersComponent,
    CalendarComponent,
    FavouritesComponent,
    CustomApiComponent,
    SettingsComponent
  ]
})
export class FolderPageModule {}
