export class Cliente{

  _idCliente?: number;
  nombre: string;
  appMaterno: string;
  appPaterno: string;
  telefono: string;
  direccion: string;
  comuna: string;


  constructor(nombre: string, appMaterno: string, appPaterno: string, telefono: string, direccion: string, comuna: string){        
      this.nombre = nombre;
      this.appMaterno = appMaterno;
      this.appPaterno = appPaterno;
      this.telefono = telefono;
      this.direccion = direccion;
      this.comuna = comuna;
  }

}