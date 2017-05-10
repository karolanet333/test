import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { MilestoneComponent } from './milestone/milestone.component';

const routes: Routes = [
  {
    path: '', data: {title: 'Clientes'}, children: 
    [
      {path: '', component: CustomersComponent, data: {title: ''}},
      {path: 'detail/:id', component: CustomerDetailComponent, data:{ title: 'Detalles del Cliente'}, children:[
        {path: 'service/:id', component: ServiceDetailComponent, data: { title: 'Detalles de Servicio'}, children: [
          {path: 'project/:id', component: ProjectDetailComponent, data: { title: 'Detalles del Proyecto'}, children: [
            {path: 'hito/:id', component: MilestoneComponent, data: { title: 'Hito de Facturacion'}}
          ]}
        ]},
      ]}
      //{path: 'project/:id', component: ProjectDetailComponent, data: { title: 'Detalles de Proyecto'}},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
