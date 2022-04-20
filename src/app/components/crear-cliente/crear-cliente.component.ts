import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente/cliente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _clienteService: ClienteService
  ) { 
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      appPaterno: ['', Validators.required],
      appMaterno: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  agregarCliente(){
    console.log(this.clienteForm);
       
    const CLIENTE: Cliente = {
      nombre: this.clienteForm.get('nombre')?.value,
      appPaterno: this.clienteForm.get('appPaterno')?.value,
      appMaterno: this.clienteForm.get('appMaterno')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      comuna: this.clienteForm.get('comuna' )?.value
    }

    console.log(CLIENTE);
    this._clienteService.saveCliente(CLIENTE).subscribe(data => {
      this.toastr.success('El Cliente fue registrado con exito!', 'Cliente Registrado!'); 
      this.router.navigate(['/cliente']);  
    }, error => {
      console.log(error);
      this.clienteForm.reset();
    });   

  }  





}
