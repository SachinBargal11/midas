import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { AddCaseComponent } from './components/add-case';
import { CasesListComponent } from './components/cases-list';
import { ShellComponent } from '../../commons/shell-component';
import { CaseShellComponent } from './components/cases-shell';
import { CaseBasicComponent } from './components/case-basic';
import { ReferringOfficeListComponent } from './components/referring-office-list';
import { PatientVisitListComponent } from './components/patient-visits-list';
import { PatientVisitListShellComponent } from './components/patient-visit-list-shell';
import { VisitDocumentsUploadComponent } from './components/visit-document';
import { PatientVisitNotesComponent } from './components/patient-visit-notes';
import { AddReferringOfficeComponent } from './components/add-referring-office';
import { EditReferringOfficeComponent } from './components/edit-referring-office';
import { AccidentInfoComponent } from './components/accident';
import { CaseDocumentsUploadComponent } from './components/case-documents';
import { InsuranceMappingComponent } from './components/insurance-mapping';
import { AssignInsuranceComponent } from './components/assign-insurance';
import { CompanyCasesComponent } from './components/company-cases-list';
import { ConsentListComponent } from './components/list-consent';
import { AddConsentComponent } from './components/add-consent';
import { EditConsentComponent } from './components/edit-consent';
import { ReferralListComponent } from './components/referral-list';
import { AddReferralComponent } from './components/add-referral';
import { VisitShellComponent } from './components/visit-shell';
import { PatientVisitListDoctorComponent } from './components/doctor-visit';
import { PatientVisitListTreatingRoomComponent } from './components/treatingroom-visit';
//import { PopupFileUpload } from '../../commons/components/PopupFileUpload';

export const CasesShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases'
    },
    {
        path: 'cases',
        component: CompanyCasesComponent,
        data: {
            breadcrumb: 'Cases'
        }
    },
    {
        path: 'cases',
        component: ShellComponent,
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: 'add',
                component: AddCaseComponent,
                data: {
                    breadcrumb: 'Add Case'
                }
            },
            {
                path: 'upload-consent/:caseId',
                // component: PopupFileUpload
            }
        ]
    },
    {
        path: 'cases/:patientId',
        component: ShellComponent,
        data: {
            breadcrumb: 'Cases'
        },
        children: [
            {
                path: '',
                component: CasesListComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: 'add',
                component: AddCaseComponent,
                data: {
                    breadcrumb: 'Add Case'
                }
            },
            {
                path: ':caseId',
                component: CaseShellComponent,
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'basic',
                        pathMatch: 'full'
                    },
                    {
                        path: 'basic',
                        component: CaseBasicComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Basic'
                        }
                    },
                    {
                        path: 'referring-offices',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Referring Officies'
                        },
                        children: [
                            {
                                path: '',
                                component: ReferringOfficeListComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                }
                            },
                            {
                                path: 'add',
                                component: AddReferringOfficeComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Add Referring Office'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: EditReferringOfficeComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Edit Referring Office'
                                }
                            }
                        ]
                    },
                    {
                        path: 'patient-visit',
                        component: VisitShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Visits'
                        },
                        children: [
                            {
                                path: '',
                                redirectTo: 'doctor-visit',
                                pathMatch: 'full'
                            },
                            {
                                path: 'doctor-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Doctor Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PatientVisitListDoctorComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'root'
                                        }
                                    },
                                    {
                                        path: ':visitId',
                                        component: PatientVisitListShellComponent,
                                        data: {
                                            breadcrumb: 'root'
                                        },
                                        children: [
                                            {
                                                path: '',
                                                redirectTo: 'visit-note',
                                                pathMatch: 'full'
                                            },
                                            {
                                                path: 'visit-note',
                                                component: PatientVisitNotesComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Visit Notes'
                                                }
                                            },
                                            {
                                                path: 'visit-document',
                                                component: VisitDocumentsUploadComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Documents Upload'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: 'treatingroom-visit',
                                component: ShellComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Treating Room Visits'
                                },
                                children: [
                                    {
                                        path: '',
                                        component: PatientVisitListTreatingRoomComponent,
                                        data: {
                                            breadcrumb: 'root'
                                        },


                                    },
                                    {
                                        path: ':visitId',
                                        component: PatientVisitListShellComponent,
                                        data: {
                                            breadcrumb: 'root'
                                        },
                                        children: [
                                            {
                                                path: '',
                                                redirectTo: 'visit-note',
                                                pathMatch: 'full'
                                            },
                                            {
                                                path: 'visit-note',
                                                component: PatientVisitNotesComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Visit Notes'
                                                }
                                            },
                                            {
                                                path: 'visit-document',
                                                component: VisitDocumentsUploadComponent,
                                                canActivate: [ValidateActiveSession],
                                                data: {
                                                    breadcrumb: 'Documents Upload'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path: ':visitId',
                                component: PatientVisitListShellComponent,
                                data: {
                                    breadcrumb: 'root'
                                },
                                children: [
                                    {
                                        path: '',
                                        redirectTo: 'visit-note',
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: 'visit-note',
                                        component: PatientVisitNotesComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Visit Notes'
                                        }
                                    },
                                    {
                                        path: 'visit-document',
                                        component: VisitDocumentsUploadComponent,
                                        canActivate: [ValidateActiveSession],
                                        data: {
                                            breadcrumb: 'Documents Upload'
                                        }
                                    }
                                ]
                            }
                            // {
                            //     path: 'edit/:id',
                            //     component: PatientVisitNotesComponent,
                            //     canActivate: [ValidateActiveSession],
                            //     data: {
                            //         breadcrumb: 'Visit Notes'
                            //     }
                            // }
                        ]
                    },
                    {
                        path: 'accident',
                        component: AccidentInfoComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Accident'
                        }
                    },
                    {
                        path: 'documents',
                        component: CaseDocumentsUploadComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Documents'
                        }
                    },
                    {
                        path: 'insurance-mapping',
                        component: InsuranceMappingComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Insurance'
                        }
                    },
                    {
                        path: 'insurance-mapping',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Insurance'
                        },
                        children: [
                            {
                                path: 'assign',
                                component: AssignInsuranceComponent,
                                data: {
                                    breadcrumb: 'Assign Insurance'
                                }
                            },
                        ]
                    },


                    {
                        path: 'consent',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Consent'
                        },
                        children: [
                            {
                                path: '',
                                component: AddConsentComponent,
                                data: {
                                    breadcrumb: 'root'
                                }
                            }
                        ]
                    },
                    {
                        path: 'referrals',
                        component: ShellComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Referrals'
                        },
                        children: [
                            {
                                path: '',
                                component: ReferralListComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'root'
                                }
                            },
                            {
                                path: 'add',
                                component: AddReferralComponent,
                                canActivate: [ValidateActiveSession],
                                data: {
                                    breadcrumb: 'Add Referral'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(CasesShellRoutes)],
    exports: [RouterModule]
})
export class CasesShellRoutingModule { }
