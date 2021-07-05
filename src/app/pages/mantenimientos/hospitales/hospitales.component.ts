import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modalImagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[]  = [ ];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(private hospitalService:HospitalService, 
              private modalImagen: ModalImagenService,
              private busquedaService: BusquedaService
              ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {
    this.cargarHospitales();
    this.imgSubs =  this.modalImagen.nuevaImagen.pipe(
      delay(200)
    ).subscribe(img => {
      this.cargarHospitales();
      
    });
  }

  buscar(termino:string){
    if(termino.length===0){
      return this.cargarHospitales();
    }
    this.busquedaService.buscar('hospitales', termino)
        .subscribe(resp => {
          this.hospitales = resp;
        })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
          .subscribe(hospitales => {
            this.cargando = false;
            this.hospitales = hospitales;
          });
  }


  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre)
        .subscribe( resp => {
          Swal.fire('Actualizado',hospital.nombre, 'success');
        })
  }
  eliminarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital._id)
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire('Borrado',hospital.nombre, 'success');
        })
  }

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true,
    })
   if(value) {
     if(value.trim().length > 0){
       this.hospitalService.crearHospital(value)
            .subscribe((resp:any)=> {
              this.hospitales.push(resp.hospital)
            })
     }

   }
  }

  abrirModal(hospital:Hospital){
    this.modalImagen.abrirModal('hospitales',hospital._id, hospital.img);
  }
}
