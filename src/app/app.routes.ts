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
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:"admin", canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
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
        path:'saved-recipes',canActivate:[authGuard], component:SavedRecipesComponent
    },
    {
        path:'recipes/:id/view',canActivate:[authGuard], component:ViewRecipeComponent
    },
    {
        path:'profile',canActivate:[authGuard], component:ProfileComponent
    }
];
