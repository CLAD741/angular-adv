import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modalImagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalImagen',
  templateUrl: './modalImagen.component.html',
  styleUrls: ['./modalImagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir:File;
  public imgTemp: any = null;
  
  constructor(
    public modalImagen: ModalImagenService,
    public uploadService: FileUploadService
    ) { }

  ngOnInit() {
  }


  cerrarModal(){
    this.imgTemp =null;
  this.modalImagen.cerrarModal();
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){
    const id = this.modalImagen.id;
    const tipo = this.modalImagen.tipo;
    this.uploadService.actualizarFoto(this.imagenSubir,tipo,id)
      .then( img => {
        Swal.fire('Guardado','Imagen actualizada','success');
        this.modalImagen.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch(err =>Swal.fire('Error', 'No se pudo actualizar  la imagen', 'error'));
  }
}
