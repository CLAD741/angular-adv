import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
        ){}

    get imagenUrl() {
        /* localhost:3005/api/uploads/medicos/fbacaaad-afb2-45c3-903b-340eb001bb5.jpg */
        if(this.img){
            if(this.img.includes('http')){
                return this.img;
            }else{
                return `${base_url}/uploads/usuarios/${this.img}`;
            }

        }else{
            return `${base_url}/uploads/usuarios/no-img`;
        }

        
    }
}