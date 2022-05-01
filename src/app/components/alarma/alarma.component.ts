
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.component.html',
  styleUrls: ['./alarma.component.scss'],
})
export class AlarmaComponent implements OnInit {
  bloqueado:boolean=false;
  constructor() { }

  ngOnInit() {}

  changeBloqueado()
  {
    if (!this.bloqueado)
    {
      this.bloqueado=true;
    }else{
      this.bloqueado=false;
    }
    
  }

}
