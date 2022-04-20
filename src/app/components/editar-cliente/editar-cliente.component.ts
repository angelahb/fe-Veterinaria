import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  clienteForm: FormGroup;
  idEntrada: any;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private aRouter: ActivatedRoute,
  ) { 
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      appPaterno: ['', Validators.required],
      appMaterno: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required]
    })

    this.idEntrada = this.aRouter.snapshot.paramMap.get('id');

    this._clienteService.getUnCliente(this.idEntrada).subscribe(
      respuesta => {
        
        let str = JSON.stringify(respuesta);
        var myObj = JSON.parse(str);
        
        console.log("objeto prueba 2 : "+ myObj[0].nombre);        
       // console.log("nombre: " + str.nombre);
        
        this.clienteForm.setValue({         
          nombre: myObj[0].nombre,
          appPaterno: myObj[0].appPaterno,
          appMaterno: myObj[0].appMaterno,
          telefono: myObj[0].telefono,
          direccion: myObj[0].direccion,
          comuna: myObj[0].comuna
        });        
      });

  }

  ngOnInit(): void {
  }


  editarCliente():any{    
    //console.log(this.id_entrada);
    //console.log(this.productoForm.value);

    this._clienteService.editCliente(this.idEntrada, this.clienteForm.value).subscribe(()=>{
      this.toastr.success('El Cliente fue Modificado con exito!', 'Cliente Modificado!');

      this.router.navigate(['/cliente']);

    }, error => console.log(error)
    ); 
    
  }


}
