import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  @Input() id!:string 
  recipe:any = {}

  constructor(private api:ApiService){
  }

  ngOnInit(){
    // console.log(this.id);
    this.getRecipe(this.id)
  }

  getRecipe(id:string){
    this.api.viewRecipeAPI(id).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
    })
  }

}
