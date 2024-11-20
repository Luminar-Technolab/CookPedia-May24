import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FooterComponent],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {

  allRecipes:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllSavedrecipe()
  }

  getAllSavedrecipe(){
    this.api.getSavedRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);      
    })
  }

  removeSaveRecipe(id:any){
    this.api.deleteSavedRecipeAPI(id).subscribe((res:any)=>{
      this.getAllSavedrecipe()
    })
  }
  
}
