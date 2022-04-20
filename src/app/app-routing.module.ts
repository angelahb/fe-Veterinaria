import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'editar-cliente/:id', component: EditarClienteComponent },
  { path: 'mascota', component: MascotaComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
