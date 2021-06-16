import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  const promesa = new Promise(
    (resolve, reject)=>{
      resolve('das');
    }
  );

  promesa.then(()=>{
    console.log('termine');
  }) .catch(err => console.log(err));
  
  console.log('Fin del init');
}

}
