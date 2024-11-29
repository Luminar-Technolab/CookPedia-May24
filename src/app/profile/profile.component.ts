import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string = "https://cdn4.iconfinder.com/data/icons/gray-user-management/512/photo-512.png"

  constructor(private api:ApiService){}

  ngOnInit(){
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    console.log(uploadFile);
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload =(event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
    }
  }

  editUser(){
    const userdetails = {
      profilePic:this.profileImage
    }
    this.api.updateUserAPI(userdetails).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated successfully!!!")
    })
  }
  
}
