import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { UsersListComponent } from '../components/pages/users/users-list';
import { UserShellComponent } from '../components/pages/users/users-shell';
import { UserBasicComponent } from '../components/pages/users/user-basic';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { UserAccessComponent } from '../components/pages/users/user-access';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { RoomsRoutes } from './rooms-routes';
import { AddUserComponent } from '../components/pages/users/add-user';
import { UpdateUserComponent } from '../components/pages/users/update-user';
import { LocationsComponent } from '../components/pages/users/locations';
import { BillingComponent } from '../components/pages/users/Billing';

export const UsersRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        component: UsersListComponent,
        data: {
            breadcrumb: 'Users'
        }
    },
    {
        path: 'users/add',
        component: AddUserComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add User'
        }
    },
    {
        path: 'users/edit/:id',
        component: UpdateUserComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Edit User'
        }
    },
    {
        path: 'users/:userId',
        component: UserShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'basic'
            },
            {
                path: 'basic',
                component: UserBasicComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Basic'
                }
            },
            {
                path: 'access',
                component: UserAccessComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Access'
                }
            },
            {
                path: 'locations',
                component: LocationsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Locations'
                }
            },
            {
                path: 'billing',
                component: BillingComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Billing'
                }
            }
        ]
    }
];