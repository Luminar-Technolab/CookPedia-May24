import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipes:any = []

  constructor(private api:ApiService){}
  
  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);      
    })
  }
}
