import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}
  selected = new Date()
  isSideBarOpen:boolean = true
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number = 0
  
  constructor(private api:ApiService,private router:Router){
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions = {
        chart :{
          type :'bar'
        },
        title:{
          text:'Analysis of Download Recipes Based on Cuisine',
          align:'left'
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          title:{
            text:"Total Download Recipe Count"
          }
        },
        legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[
          {
            name:"Cuisine",
            colorByPoint:true,
            type:'bar',
            data: chartData
          }
        ]
      }

    }
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()   
  }
  
  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("/")
  }

  getUserCount(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadAPI().subscribe((res:any)=>{  
      // console.log(res);
          
      this.downloadCount = res.map((item:any)=>item.count).reduce(((a:any,b:any)=>a+b))
      
    })
  }

  getRequestCount(){
    this.api.getAllTestimonyAPI().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=="Pending").length
    })
  }

  menuBtnClick(){
    this.isSideBarOpen = !this.isSideBarOpen
  }

}
