import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modalImagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios:number = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public cargando:boolean = true;
  private imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalImagen: ModalImagenService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
  this.imgSubs =  this.modalImagen.nuevaImagen.pipe(
      delay(200)
    ).subscribe(img => {
      this.cargarUsuarios()
    });
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(({total,usuarios}) => {
      this.totalUsuarios = total;
      if(usuarios.length !== 0){
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
      }
      this.cargando = false;
    })
  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscar(termino:string){
    if(termino.length===0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino)
        .subscribe(resp => {
          this.usuarios = resp;
        })
  }
  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error','No puede borrar su usuario','error');
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp =>{ 
            this.cargarUsuarios();
            Swal.fire('Usuario borrado',`${usuario.nombre} fue eliminado`,'success')
          
          });
      }
    })

  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarPerfil(usuario)
          .subscribe((resp)=>{
            console.log(resp);
          })
  }

  abrirModal(usuario:Usuario){
    this.modalImagen.abrirModal('usuarios',usuario.uid, usuario.img);
  }
}
