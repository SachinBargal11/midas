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
    
    public partial class PendingReferral
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PendingReferral()
        {
            this.PendingReferralProcedureCodes = new HashSet<PendingReferralProcedureCode>();
            this.Referral2 = new HashSet<Referral2>();
        }
    
        public int Id { get; set; }
        public int PatientVisitId { get; set; }
        public int FromCompanyId { get; set; }
        public int FromLocationId { get; set; }
        public int FromDoctorId { get; set; }
        public Nullable<int> ForSpecialtyId { get; set; }
        public Nullable<int> ForRoomId { get; set; }
        public Nullable<int> ForRoomTestId { get; set; }
        public Nullable<bool> IsReferralCreated { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> DismissedBy { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual Doctor Doctor { get; set; }
        public virtual Location Location { get; set; }
        public virtual PatientVisit2 PatientVisit2 { get; set; }
        public virtual Room Room { get; set; }
        public virtual RoomTest RoomTest { get; set; }
        public virtual Specialty Specialty { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PendingReferralProcedureCode> PendingReferralProcedureCodes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral2> Referral2 { get; set; }
    }
}
