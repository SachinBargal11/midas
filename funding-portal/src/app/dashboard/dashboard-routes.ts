import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard';
import { DashboardShellComponent } from './components/dashboard-shell';
import { Dashboard2Component } from './components/dashboard2';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';

export const dashboardRoutes: Routes = [
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //       breadcrumb: 'Dashboard'
    //     }
    // }
    {
        path: '',
        component: DashboardShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Dashboard'
        },
        children: [
            {
                path: '',
                redirectTo: 'funding-receivable',
                pathMatch: 'full'
            },
            {
                path: 'funding-receivable',
                component: DashboardComponent
            },
            {
                path: 'available-receivable',
                component: Dashboard2Component
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }