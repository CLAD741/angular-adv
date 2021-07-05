import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modalImagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(private medicoService:MedicoService,
              private modalImagen: ModalImagenService,
              private busquedaService: BusquedaService
              ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {
  this.cargarMedicos();

  this.imgSubs =  this.modalImagen.nuevaImagen.pipe(
    delay(200)
  ).subscribe(img => {
    this.cargarMedicos();
    
  });
  }


  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      })

  }


  buscar(termino:string){
    if(termino.length===0){
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos', termino)
        .subscribe(resp => {
          this.medicos = resp;
        })

  }

  borrarMedico(medico:Medico){
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe(resp =>{ 
            this.cargarMedicos();
            Swal.fire('Medico borrado',`${medico.nombre} fue eliminado`,'success')
          
          });
      }
    })
  }

  abrirModal(medico:Medico){
    this.modalImagen.abrirModal('medicos',medico._id, medico.img);
  }
}
