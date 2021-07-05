interface _hospitalUser{
    nombre:string;
    _id:string;
    img: string;
}



export class Hospital {

    constructor(
        public nombre:string,
        public usuario?:_hospitalUser,
        public _id?:string,
        public img?:string,
    ){}



}