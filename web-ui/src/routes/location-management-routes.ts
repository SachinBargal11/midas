import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { LocationComponent } from '../components/pages/medical-provider/location';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { BasicComponent } from '../components/pages/location-management/basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { AccessComponent } from '../components/pages/location-management/access';
import { AddLocationComponent } from '../components/pages/location-management/add-location';
import { RoomsRoutes } from './rooms-routes';

export const LocationManagementRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'locations'
    },
    {
        path: 'locations',
        component: LocationComponent,
    },
    {
        path: 'locations/add',
        component: AddLocationComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'locations/:locationId',
        component: LocationShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'basic'
            },
            {
                path: 'basic',
                component: BasicComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [ValidateActiveSession]
            },
            ...RoomsRoutes,
            // ...DoctorsRoutes,
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [ValidateActiveSession]
            },
            {
                path: 'access',
                component: AccessComponent,
                canActivate: [ValidateActiveSession]
            }
        ]
    }
];