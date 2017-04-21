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
    
    public partial class ProcedureCode
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProcedureCode()
        {
            this.PatientVisitProcedureCodes = new HashSet<PatientVisitProcedureCode>();
        }
    
        public int Id { get; set; }
        public string ProcedureCodeText { get; set; }
        public string ProcedureCodeDesc { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> SpecialityId { get; set; }
        public Nullable<int> RoomId { get; set; }
        public Nullable<int> RoomTestId { get; set; }
    
        public virtual Company Company { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisitProcedureCode> PatientVisitProcedureCodes { get; set; }
        public virtual Room Room { get; set; }
        public virtual RoomTest RoomTest { get; set; }
        public virtual Specialty Specialty { get; set; }
    }
}
