import { Component, Input } from '@angular/core';
import { RecipeModel } from '../models/recipeModel';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id!:string
  recipeDetails:RecipeModel = {}
  ingredients:any = []
  instructions:any = []
  mealType:any = []

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    console.log(this.id);
    if(this.id){
      this.getRecipeDetails(this.id)
    }
  }

  getRecipeDetails(id:string){
    this.api.viewRecipeAPI(id).subscribe((res:any)=>{
      this.recipeDetails = res
      this.instructions = this.recipeDetails.instructions
      this.ingredients = this.recipeDetails.ingredients
      this.mealType = this.recipeDetails.mealType
    })
  }

  addIngredients(value:string){
    this.ingredients.push(value)
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstructions(value:string){
    this.instructions.push(value)
  }

  removeInstruction(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  mealTypeSelect(checkEvent:any){
    if(checkEvent.target.checked){
      !this.mealType.includes(checkEvent.target.name) && this.mealType.push(checkEvent.target.name)
    }else{
      this.mealType = this.mealType.filter((item:string)=>item!=checkEvent.target.name)
    }
  }

  removeMealType(meal:string){
    this.mealType = this.mealType.filter((item:string)=>item!=meal)
  }

  addRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealType
    const {name,ingredients,instructions,caloriesPerServing,servings,cookTimeMinutes,prepTimeMinutes,mealType,image,cuisine,difficulty} = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && servings && cookTimeMinutes && prepTimeMinutes && mealType!.length>0 && image && cuisine && difficulty && caloriesPerServing){
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("Recipe added successfully!!!")
          this.router.navigateByUrl("/admin/all-recipes")
          this.recipeDetails = {}
          this.ingredients =[]
          this.instructions = []
          this.mealType =[]
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails = {}
          this.ingredients =[]
          this.instructions = []
          this.mealType =[]
        }
      })
    }else{
      alert("Please fill the form completely!!!")
    }
  }

  editRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealType
    const {name,ingredients,instructions,caloriesPerServing,servings,cookTimeMinutes,prepTimeMinutes,mealType,image,cuisine,difficulty} = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && servings && cookTimeMinutes && prepTimeMinutes && mealType!.length>0 && image && cuisine && difficulty && caloriesPerServing){
      this.api.updateRecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>{
        alert("Recipe Updated successfully!!!")
        this.router.navigateByUrl("/admin/all-recipes")
        this.recipeDetails = {}
        this.ingredients =[]
        this.instructions = []
        this.mealType =[]
      })
    }else{
      alert("Please fill the form completely!!!")
    }
  }

}
