import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map, tap}from 'rxjs/operators';

import { LoginForm } from '../interface/login-form.interface';
import { RegisterForm } from '../interface/register-form.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const gapi:any;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;
  public usuario:Usuario;


constructor(private http: HttpClient, private router:Router, private ngZone: NgZone) { 
  this.googleInit();
}
 
get token():string{
  return localStorage.getItem('token') || '';
}

get uid():string{
  return this.usuario.uid || '';
}
googleInit(){
  gapi.load('auth2', ()=>{
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    this.auth2 = gapi.auth2.init({
      client_id: '418287001993-u1ki7m9t996ns7dpesh1aui18dhq0sru.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    
  });
}
logout(){
  localStorage.removeItem('token');
  gapi.auth2.getAuthInstance();
  this.auth2.signOut().then( ()=> {
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');

    });
    });

}
validarToken() {
 return  this.http.get(`${base_url}/login/renew`,{
    headers:{
      'x-token':this.token
    }
  }).pipe(
    map((res:any) =>{
      const {email, google, nombre, role,img='', uid} =res.usuario;
      this.usuario = new Usuario(nombre,email,'',img,google, role ,uid);
      localStorage.setItem('token',res.token);
      return true;
    }),
    catchError((error)=> of(false))
  );
}


crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((res:any) =>{
        localStorage.setItem('token',res.token)
      })
    );
}

actualizarPerfil(data:{email: string, nombre:string, role:string}){
  data = {
    ...data,
    role:this.usuario.role
  }
  return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
    headers:{
      'x-token':this.token
    }
  });
}

loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
            .pipe(
              tap((res:any) =>{
                localStorage.setItem('token',res.token)
              })
            );
}
loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})
            .pipe(
              tap((res:any) =>{
                localStorage.setItem('token',res.token)
              })
            );
}

}
