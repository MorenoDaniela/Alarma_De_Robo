import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AbstractControl, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { SpinnerTypes } from '@ionic/angular';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formulario!: FormGroup;
  spinner:boolean=false;
  constructor(public authService: AuthService,public fb: FormBuilder,) 
  { 
  }

  ngOnInit(): void {
    this.buildForm();
    // this.validar(this.formulario);
  }

  LoguearConGoogle(){
    this.authService.GoogleAuth();
  }
  buildForm() {
    this.formulario=this.fb.group({

      Password:["", [Validators.required, Validators.minLength(6)]],
      Email:["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      
    })
  }
  Loguear()
  {
  console.log(this.formulario.get);
   const Password = this.formulario.controls['Password'].value;
   const Email = this.formulario.controls['Email'].value;
   this.spinner=true;
   setTimeout(()=>{
    this.authService.SignIn(Email, Password);
    this.spinner=false;
  },2000)
   
    // this.toastr.showExito("Se registro el administrador correctamente","Tus datos fueron enviados con exito.",2000);
  }

  Sereneis(){
    this.formulario.controls['Email'].setValue('sereneidelys@gmail.com');
    this.formulario.controls['Password'].setValue('123456');
  }
  Irina (){
    this.formulario.controls['Email'].setValue('irinasassone@gmail.com');
    this.formulario.controls['Password'].setValue('123456');
  }
  Denu(){
    this.formulario.controls['Email'].setValue('celemorenok@gmail.com');
    this.formulario.controls['Password'].setValue('123456');
  }
}
