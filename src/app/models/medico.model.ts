import { Hospital } from "./hospital.model";

interface _medicoUser{
    nombre:string;
    _id:string;
    img: string;
}



export class Medico {

    constructor(
        public nombre:string,
        public usuario?:_medicoUser,
        public _id?:string,
        public img?:string,
        public hospital?:Hospital
    ){}



}