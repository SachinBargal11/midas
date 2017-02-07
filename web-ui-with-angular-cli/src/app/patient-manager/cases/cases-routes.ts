 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
//  import { CasesComponent } from './components/cases';
 import { AddCaseShellComponent } from './components/add-case-shell';
 import { CaseComponent } from './components/case';
 import { CasesListComponent } from './components/cases-list';
 import { EmployerComponent} from './components/employer';
 import { InsuranceComponent } from './components/insurances';
 import { AccidentComponent } from './components/accident';


export const CasesShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases'
    },
    {
        path: 'cases',
        component: CasesListComponent,
        data: {
            breadcrumb: 'Cases'
        }
    },
    {
        path: 'cases/add',
        component: AddCaseShellComponent,
        data: {
            breadcrumb: 'Cases',
            shell: true
        },
        children: [
            {
                path: '',
                redirectTo: 'case',
                pathMatch: 'full'
            },
            {
                path: 'case',
                component: CaseComponent,
                data: {
                    breadcrumb: 'Add Case'
                }
            },
            {
                path: 'employer',
                component: EmployerComponent,
                data: {
                    breadcrumb: 'Add Employer'
                }
            },
            {
                path: 'insurances',
                component: InsuranceComponent,
                data: {
                    breadcrumb: 'Add Insurance'
                }
            },
            {
                path: 'accident-address',
                component: AccidentComponent,
                data: {
                    breadcrumb: 'Add Accident location'
                }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(CasesShellRoutes)],
    exports: [RouterModule]
})
export class CasesShellRoutingModule { }
