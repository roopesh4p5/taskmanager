import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/shared/template/login/login.component';
import { RoleComponent } from './modules/shared/template/role/role.component';
import { MenuComponent } from './modules/shared/template/menu/menu.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "menu",
    component : MenuComponent
  },
  { path: "", 
   component : RoleComponent,
   children : [
    {
      path : 'company',
      loadChildren : () => import('../app/modules/company/company.module')
      .then(module => module.CompanyModule) 
    },
    {
      path : 'employee',
      loadChildren : () => import('../app/modules/employee/employee.module')
      .then(module => module.EmployeeModule)
    },
    {
      path : 'manager',
      loadChildren : () => import('../app/modules/manager/manager.module')
      .then(module => module.ManagerModule)
    }
   ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
