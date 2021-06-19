import { getLocaleTimeFormat } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public  auth2:any;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false]
  });
 
  constructor(private router:Router, 
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }



  login(){
    console.log(this.loginForm.value);
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe((data)=>{
        if(this.loginForm.get('remember').value){
          localStorage.setItem('email',this.loginForm.get('email').value);
        }else{
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },(err)=>{
        Swal.fire('Error', err.error.msg,'error');
      })

    /* this.router.navigateByUrl('/'); */
  }


  /* let token = googleUser.getAuthResponse().id_token; */
   
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '418287001993-u1ki7m9t996ns7dpesh1aui18dhq0sru.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          let token = googleUser.getAuthResponse().id_token
          this.usuarioService.loginGoogle(token).subscribe((data)=>{
            
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');

            });

          });

        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
