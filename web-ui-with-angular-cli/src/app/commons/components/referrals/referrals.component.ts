import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem } from 'primeng/primeng';
import { ProgressBarService } from '../../services/progress-bar-service';
import { Procedure } from '../../models/procedure';
import { ProcedureStore } from '../../stores/procedure-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  procedureForm: FormGroup;
  procedures: Procedure[];
  selectedProcedures: Procedure[];
  selectedProceduresToDelete: Procedure[];
  specialities: Speciality[];
  tests: Tests[];

  selectedMode: number;
  selectedDoctorId: number;
  selectedRoomId: number;
  selectedOption: number;
  selectedSpecialityId: number;
  selectedTestId: number;

@Input() selectedVisit: PatientVisit;
@Output() save: EventEmitter < Procedure[] > = new EventEmitter();
@Output() uploadError: EventEmitter < Error > = new EventEmitter();

constructor(
  private _notificationsService: NotificationsService,
  private fb: FormBuilder,
  private _progressBarService: ProgressBarService,
  private _procedureStore: ProcedureStore,
  private _specialityStore: SpecialityStore,
  private _roomsStore: RoomsStore,
) {
  // this.procedureForm = this.fb.group({
  //   dignosisCode: ['', Validators.required]
  // });
}

ngOnInit() {
  this.loadAllSpecialitiesAndTests();
  if (this.selectedVisit.specialtyId) {
    this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
  } else if (this.selectedVisit.roomId) {
    this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
  }
  this.selectedProcedures = this.selectedVisit.patientVisitProcedureCodes;
}
loadAllSpecialitiesAndTests() {
  this._progressBarService.show();
  let fetchAllSpecialities = this._specialityStore.getSpecialities();
  let fetchAllTestFacilties = this._roomsStore.getTests();
  Observable.forkJoin([fetchAllSpecialities, fetchAllTestFacilties])
    .subscribe(
    (results: any) => {
      this.specialities = results[0];
      this.tests = results[1];
    },
    (error) => {
      this._progressBarService.hide();
    },
    () => {
      this._progressBarService.hide();
    });
}

selectOption(event) {
  this.selectedDoctorId = 0;
  this.selectedRoomId = 0;
  this.selectedOption = 0;
  if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
    this.selectedOption = 1;
    this.selectedSpecialityId = parseInt(event.target.value);
    this.loadProceduresForSpeciality(this.selectedSpecialityId)
    // this.selectedSpecialityId = event.target.selectedOptions[0].getAttribute('data-specialityId');
    // this.loadLocationDoctorVisits();
    // this.fetchDoctorSchedule();
  } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
    this.selectedOption = 2;
    this.selectedTestId = parseInt(event.target.value);
    this.loadProceduresForRoomTest(this.selectedTestId)
    // this.selectedTestId = event.target.selectedOptions[0].getAttribute('data-testId');
    // this.loadLocationRoomVisits();
    // this.fetchRoomSchedule();
  } else {
    this.selectedMode = 0;
    // this.selectLocation();
  }
}

loadProceduresForSpeciality(specialityId: number) {
  this._progressBarService.show();
  let result = this._procedureStore.getProceduresBySpecialityId(specialityId);
  result.subscribe(
    (procedures: Procedure[]) => {
      // this.procedures = procedures;
        let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
          return currentProcedure.id;
        });
        let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
          return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
        });
        this.procedures = procedureDetails;
    },
    (error) => {
      this._progressBarService.hide();
    },
    () => {
      this._progressBarService.hide();
    });
}

loadProceduresForRoomTest(roomTestId: number) {
  this._progressBarService.show();
  let result = this._procedureStore.getProceduresByRoomTestId(roomTestId);
  result.subscribe(
    (procedures: Procedure[]) => {
      // this.procedures = procedures;
        let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
          return currentProcedure.id;
        });
        let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
          return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
        });
        this.procedures = procedureDetails;
    },
    (error) => {
      this._progressBarService.hide();
    },
    () => {
      this._progressBarService.hide();
    });
}

saveProcedures() {
  this.save.emit(this.selectedProcedures);
}

deleteProcedureCode() {
  let procedureCodeIds: number[] = _.map(this.selectedProceduresToDelete, (currentProcedure: Procedure) => {
    return currentProcedure.id;
  });
  let procedureCodeDetails = _.filter(this.selectedProcedures, (currentProcedure: Procedure) => {
    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
  });

  this.selectedProcedures = procedureCodeDetails;
}
}
