import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "https://cookpedia-server-may24.onrender.com"
  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return  this.http.get(`${this.server_url}/all-recipes`)
  }
//add-testimony
  saveTestimonyAPI(reqBody:any){
    return  this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  //register
  registerAPI(reqBody:any){
    return  this.http.post(`${this.server_url}/register`,reqBody)
  }

  //login
  loginAPI(reqBody:any){
    return  this.http.post(`${this.server_url}/login`,reqBody)
  }

  //append Token in header
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
     headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}    
  }

  //recipe/:id/view
  viewRecipeAPI(id:string){
    return  this.http.get(`${this.server_url}/recipe/${id}/view`,this.appendToken())
  }

  //related-recipes?cuisine=Italian
  getRelatedRecipeAPI(cuisine:string){
    return  this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  //recipes/673461efc82f6dc0ecec8914/download
  downloadRecipeAPI(id:string,recipeDetails:any){
    return  this.http.post(`${this.server_url}/recipes/${id}/download`,recipeDetails,this.appendToken())
  }

  //recipe/save
  saveRecipeAPI(recipeDetails:any){
    return  this.http.post(`${this.server_url}/recipe/save`,recipeDetails,this.appendToken())
  }

  //all-saved-recipes
  getSavedRecipeAPI(){
    return  this.http.get(`${this.server_url}/all-saved-recipes`,this.appendToken())
  }

  //saved-recipe/673da31ef879efdda632c649/remove
  deleteSavedRecipeAPI(id:any){
    return  this.http.delete(`${this.server_url}/saved-recipe/${id}/remove`,this.appendToken())
  }

  //all-users
  getAllUsersAPI(){
    return  this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  //all-downloads
  getAllDownloadAPI(){
    return  this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
  }

  //all-testimony
  getAllTestimonyAPI(){
    return  this.http.get(`${this.server_url}/all-testimony`)
  }

  //testimony/id?status=Approved
  updateTestimonyStatusAPI(id:string,status:string){
    return  this.http.get(`${this.server_url}/testimony/${id}?status=${status}`,this.appendToken())
  }
  //add-recipe
  addRecipeAPI(recipeDetails:any){
    return  this.http.post(`${this.server_url}/add-recipe`,recipeDetails,this.appendToken())
  }

  //recipe/id/remove
  removeRecipeAPI(id:string){
    return  this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
  }
  //recipe/6745959c7b344f058d0bae73/edit
  updateRecipeAPI(id:string,recipeDetails:any){
    return  this.http.put(`${this.server_url}/recipe/${id}/edit`,recipeDetails,this.appendToken())
  }
//user/:id/edit
  updateUserAPI(userdetails:any){
    return  this.http.put(`${this.server_url}/user/edit`,userdetails,this.appendToken()) 
  }

  getChartDownloadData(){
    let downloadList:any = []
    let output:any = {}
    this.getAllDownloadAPI().subscribe((res:any)=>{
      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let currCount = item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currCount
        }else{
          output[cuisine] = currCount
        }
      })
      for(let data in output){
        downloadList.push({name:data,y:output[data]})
      }
      localStorage.setItem("chart",JSON.stringify(downloadList))
    })
  }

}
