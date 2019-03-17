import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';


const app_routes: Routes = [
    {
        path: '',
        // loadChildren: './modulos/main/main.module#MainModule'
        component: AdminComponent
     },
];

@NgModule({
    imports: [
        RouterModule.forChild(app_routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
