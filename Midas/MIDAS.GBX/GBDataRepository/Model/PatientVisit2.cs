//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MIDAS.GBX.DataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class PatientVisit2
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PatientVisit2()
        {
            this.PatientVisitDiagnosisCodes = new HashSet<PatientVisitDiagnosisCode>();
            this.PatientVisitProcedureCodes = new HashSet<PatientVisitProcedureCode>();
        }
    
        public int Id { get; set; }
        public int CalendarEventId { get; set; }
        public int CaseId { get; set; }
        public int PatientId { get; set; }
        public int LocationId { get; set; }
        public Nullable<int> RoomId { get; set; }
        public Nullable<int> DoctorId { get; set; }
        public Nullable<int> SpecialtyId { get; set; }
        public Nullable<System.DateTime> EventStart { get; set; }
        public Nullable<System.DateTime> EventEnd { get; set; }
        public string Notes { get; set; }
        public Nullable<byte> VisitStatusId { get; set; }
        public Nullable<byte> VisitType { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<bool> IsCancelled { get; set; }
        public string FileUploadPath { get; set; }
        public Nullable<bool> IsOutOfOffice { get; set; }
        public Nullable<System.DateTime> LeaveStartDate { get; set; }
        public Nullable<System.DateTime> LeaveEndDate { get; set; }
    
        public virtual CalendarEvent CalendarEvent { get; set; }
        public virtual Case Case { get; set; }
        public virtual Doctor Doctor { get; set; }
        public virtual Location Location { get; set; }
        public virtual Patient2 Patient2 { get; set; }
        public virtual Room Room { get; set; }
        public virtual Specialty Specialty { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisitDiagnosisCode> PatientVisitDiagnosisCodes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisitProcedureCode> PatientVisitProcedureCodes { get; set; }
    }
}
