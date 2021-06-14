import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {
 labels1: string[] = ['Bogotá', 'Florida', 'Madrid'];
 data1: number[] = [500,450,200];
}
