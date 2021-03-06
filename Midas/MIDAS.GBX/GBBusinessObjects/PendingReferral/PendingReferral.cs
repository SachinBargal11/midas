﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
   public class PendingReferral : GbObject
    {

        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("fromCompanyId")]
        public int FromCompanyId { get; set; }

        [JsonProperty("fromLocationId")]
        public int FromLocationId { get; set; }

        [JsonProperty("fromDoctorId")]
        public int FromDoctorId { get; set; }

        [JsonProperty("forSpecialtyId")]
        public int? ForSpecialtyId { get; set; }

        [JsonProperty("forRoomId")]
        public int? ForRoomId { get; set; }

        [JsonProperty("forRoomTestId")]
        public int? ForRoomTestId { get; set; }

        [JsonProperty("isReferralCreated")]
        public bool? IsReferralCreated { get; set; }

        [JsonProperty("dismissedBy")]
        public int? DismissedBy { get; set; }

        [JsonProperty("patientVisit")]
        public PatientVisit PatientVisit { get; set; }

        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("pendingReferralProcedureCode")]
        public List<PendingReferralProcedureCode> PendingReferralProcedureCodes { get; set; }
       

    }

    public class PendingReferralList2 : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("fromCompanyId")]
        public int FromCompanyId { get; set; }

        [JsonProperty("fromLocationId")]
        public int FromLocationId { get; set; }

        [JsonProperty("fromDoctorId")]
        public int FromDoctorId { get; set; }

        [JsonProperty("forSpecialtyId")]
        public int? ForSpecialtyId { get; set; }

        [JsonProperty("forRoomId")]
        public int? ForRoomId { get; set; }

        [JsonProperty("forRoomTestId")]
        public int? ForRoomTestId { get; set; }

        [JsonProperty("isReferralCreated")]
        public bool? IsReferralCreated { get; set; }

        [JsonProperty("dismissedBy")]
        public int? DismissedBy { get; set; }

        //[JsonProperty("doctor")]
        //public Doctor Doctor { get; set; }      
        [JsonProperty("doctorFirstName")]
        public string DoctorFirstName { get; set; }

        [JsonProperty("doctorLastName")]
        public string DoctorLastName { get; set; }


        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("patientFirstName")]
        public string PatientFirstName { get; set; }

        [JsonProperty("patientLastName")]
        public string PatientLastName { get; set; }

        [JsonProperty("pendingReferralProcedureCode")]
        public PendingReferralProcedureCode PendingReferralProcedureCode { get; set; }        
    }

    public class PendingReferralList : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("fromCompanyId")]
        public int FromCompanyId { get; set; }

        [JsonProperty("fromLocationId")]
        public int FromLocationId { get; set; }

        [JsonProperty("fromDoctorId")]
        public int FromDoctorId { get; set; }

        [JsonProperty("forSpecialtyId")]
        public int? ForSpecialtyId { get; set; }

        [JsonProperty("forRoomId")]
        public int? ForRoomId { get; set; }

        [JsonProperty("forRoomTestId")]
        public int? ForRoomTestId { get; set; }

        [JsonProperty("isReferralCreated")]
        public bool? IsReferralCreated { get; set; }

        [JsonProperty("dismissedBy")]
        public int? DismissedBy { get; set; }
    
        [JsonProperty("doctorFirstName")]
        public string DoctorFirstName { get; set; }

        [JsonProperty("doctorLastName")]
        public string DoctorLastName { get; set; }


        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("room")]
        public Room Room { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("patientId")]
        public int PatientId { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("patientFirstName")]
        public string PatientFirstName { get; set; }

        [JsonProperty("patientLastName")]
        public string PatientLastName { get; set; }

        [JsonProperty("pendingReferralProcedureCodes")]
        public List<PendingReferralProcedureCode> PendingReferralProcedureCodes { get; set; }
    }
}
