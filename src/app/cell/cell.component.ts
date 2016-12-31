import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input()
  colorClass: number;

  @Input()
  x: number;

  @Input()
  y: number;
  
  @Input()
  captured: boolean;

  @Input()
  index: number;

  constructor() { }
 
  ngOnInit() {
  }

}
