import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path:"admin", loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
    {
        path:'', component:HomeComponent
    },
    {
        path:'recipes', component:RecipesComponent
    },
    {
        path:'about', component:AboutComponent
    },
    {
        path:'contact', component:ContactComponent
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'register', component:RegisterComponent
    },
    {
        path:'saved-recipes', component:SavedRecipesComponent
    },
    {
        path:'recipes/:id/view', component:ViewRecipeComponent
    },
    {
        path:'profile', component:ProfileComponent
    }
];
