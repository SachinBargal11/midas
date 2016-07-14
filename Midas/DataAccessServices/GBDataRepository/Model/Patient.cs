//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GBDataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Patient
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Patient()
        {
            this.Case = new HashSet<Case>();
        }
    
        public int ID { get; set; }
        public Nullable<int> UserID { get; set; }
        public string SSN { get; set; }
        public string WCBNO { get; set; }
        public string JobTitle { get; set; }
        public string WorkActivities { get; set; }
        public string CarrierCaseNo { get; set; }
        public Nullable<bool> UseTranspotation { get; set; }
        public string ChartNo { get; set; }
        public Nullable<int> ProviderMedicalOfficesID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Case> Case { get; set; }
        public virtual ProviderMedicalFacilities ProviderMedicalFacilities { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
        public virtual User User2 { get; set; }
    }
}
