import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [HeaderComponent,RouterLink,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeRecipes:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllHomeRecipes()
  }

  getAllHomeRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.homeRecipes = res.slice(0,6)
      console.log(this.homeRecipes);      
    })
  }
}
