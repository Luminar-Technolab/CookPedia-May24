import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

}
