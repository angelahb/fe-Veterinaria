import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public mensaje: string

  ) { }

  ngOnInit(): void {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  
  confirmado(): void {
    this.dialogo.close(true);
  }
  

}
