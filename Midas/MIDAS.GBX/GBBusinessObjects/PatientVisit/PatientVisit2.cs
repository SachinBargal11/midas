﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientVisit2 : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("isCancelled")]
        public bool? IsCancelled { get; set; }

        [JsonProperty("fileUploadPath")]
        public string FileUploadPath { get; set; }

        [JsonProperty("isOutOfOffice")]
        public bool? IsOutOfOffice { get; set; }

        [JsonProperty("leaveStartDate")]
        public DateTime? LeaveStartDate { get; set; }

        [JsonProperty("leaveEndDate")]
        public DateTime? LeaveEndDate { get; set; }

        [JsonProperty("patient2")]
        public Patient2 Patient2 { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("patientVisitDiagnosisCodes")]
        public List<PatientVisitDiagnosisCode> PatientVisitDiagnosisCodes { get; set; }

        [JsonProperty("patientVisitProcedureCodes")]
        public List<PatientVisitProcedureCode> PatientVisitProcedureCodes { get; set; }
    }

    public class mPatientVisit : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }

        [JsonProperty("fileUploadPath")]
        public string FileUploadPath { get; set; }

        [JsonProperty("isOutOfOffice")]
        public bool? IsOutOfOffice { get; set; }

        [JsonProperty("leaveStartDate")]
        public DateTime? LeaveStartDate { get; set; }

        [JsonProperty("leaveEndDate")]
        public DateTime? LeaveEndDate { get; set; }

        [JsonProperty("mPatient")]
        public mPatient mPatient { get; set; }

        [JsonProperty("mPatientVisitDiagnosisCodes")]
        public List<mPatientVisitDiagnosisCode> mPatientVisitDiagnosisCodes { get; set; }

        [JsonProperty("mPatientVisitProcedureCodes")]
        public List<mPatientVisitProcedureCode> mPatientVisitProcedureCodes { get; set; }
    }
}
