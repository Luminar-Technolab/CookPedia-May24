import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { UsersComponent } from './users/users.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    RecipeListComponent,
    ManageRecipeComponent,
    UsersComponent,
    DownloadsComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe
  ]
})
export class AdminModule { }
