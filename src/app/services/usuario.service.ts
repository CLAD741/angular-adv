import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map, tap}from 'rxjs/operators';

import { LoginForm } from '../interface/login-form.interface';
import { RegisterForm } from '../interface/register-form.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';

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

get role(): string{
  return this.usuario.role;
}

get headers(){
  return {
    headers:{
      'x-token': this.token
    }};
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

guardarLocalStorage(token:string, menu: any){
  localStorage.setItem('token',token);
  localStorage.setItem('menu',JSON.stringify(menu));
}
logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('menu');

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

      this.guardarLocalStorage(res.token,res.menu);

      return true;
    }),
    catchError((error)=> of(false))
  );
}


crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((res:any) =>{
        this.guardarLocalStorage(res.token,res.menu);
      })
    );
}

actualizarPerfil(data:{email: string, nombre:string, role:string}){
  data = {
    ...data,
    role: this.usuario.role
  }
  return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers);
}

loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
            .pipe(
              tap((res:any) =>{
                this.guardarLocalStorage(res.token,res.menu);
              })
            );
}
loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})
            .pipe(
              tap((res:any) =>{
                this.guardarLocalStorage(res.token,res.menu);
              })
            );
}


cargarUsuarios(desde:number= 0){
  const url =`${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuario>(url,this.headers)
          .pipe(
            map(resp => {
              const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre,user.email, '',user.img, user.google, user.role,user.uid));
              return {
                total:resp.total,
                usuarios
              }
            })

            
          )
}


eliminarUsuario(usuario:Usuario){
  const url =`${base_url}/usuarios/${usuario.uid}`;
  return this.http.delete(url,this.headers)
}

guardarPerfil(usuario:Usuario){
  
  return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers);
}
}
