import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { LocationComponent } from './components/location';
import { LocationShellComponent } from './components/location-shell';
import { BasicComponent } from './components/basic';
import { ScheduleComponent } from './components/schedule';
import { SettingsComponent } from './components/settings';
import { AccessComponent } from './components/access';
import { AddLocationComponent } from './components/add-location';
import { RoomsRoutes } from '../rooms/rooms-routes';

export const LocationManagementRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'locations'
    },
    {
        path: 'locations',
        component: LocationComponent,
        data: {
            breadcrumb: 'Locations'
        }
    },
    {
        path: 'locations/add',
        component: AddLocationComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Location'
        }
    },
    {
        path: 'locations/:locationId',
        component: LocationShellComponent,
        data: {
            breadcrumb: 'Locations',
            shell: true
        },
        children: [
            {
                path: '',
                redirectTo: 'basic',
                pathMatch: 'full'
            },
            {
                path: 'basic',
                component: BasicComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Basic'
                }
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Schedule'
                }
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Settings'
                }
            },
            {
                path: 'access',
                component: AccessComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Access'
                }
            },
            ...RoomsRoutes
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(LocationManagementRoutes)],
    exports: [RouterModule]
})
export class LocationManagementRoutingModule { }