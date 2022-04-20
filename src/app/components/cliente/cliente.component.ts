import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente/cliente';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  listarCliente: Cliente[] = [];

  displayedColumns: string[] = ['_idCliente', 'nombre', 'appPaterno', 'appMaterno', 'telefono', 'direccion', 'comuna', 'acciones'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _clienteService: ClienteService,
    public dialogo: MatDialog,
    private router: Router, 
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerClientes(){
    this._clienteService.getClientes().subscribe({
     next: (res) => {
       console.log(res);      
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error:(err) => console.log(err)
    });
   }

   eliminarCliente(id: any) {
    console.log("ID: " + id);
    
    this._clienteService.deleteCliente(id).subscribe(
      res => {
        console.log('Cliente Eliminado: ' + id );
        this.obtenerClientes();      
        this.toastr.success('Cliente Eliminado: ' + id, 'El Cliente fue Eliminado con exito!');
      }, error => console.log(error)
    );    
  }

   modalEliminarCliente(id: any): void{
    this.dialogo.open(DialogoComponent, {
      data: `Deseas Eliminar Este Cliente?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        console.log("LLEgo a confirmado");
        
        this.eliminarCliente(id);
        this.router.navigate(['/cliente']);
      } else {
        console.log("Llego a cerrar dialogo");
        
      }
    });
    
  }

}
