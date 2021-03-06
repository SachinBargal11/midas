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
    
    public partial class MidasDocument
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MidasDocument()
        {
            this.CaseCompanyConsentDocuments = new HashSet<CaseCompanyConsentDocument>();
            this.CaseDocuments = new HashSet<CaseDocument>();
            this.PatientDocuments = new HashSet<PatientDocument>();
            this.ReferralDocuments = new HashSet<ReferralDocument>();
            this.VisitDocuments = new HashSet<VisitDocument>();
        }
    
        public int Id { get; set; }
        public string ObjectType { get; set; }
        public int ObjectId { get; set; }
        public string DocumentPath { get; set; }
        public string DocumentName { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> CreateUserId { get; set; }
        public Nullable<int> UpdateUserId { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string DocumentType { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseDocument> CaseDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientDocument> PatientDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ReferralDocument> ReferralDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VisitDocument> VisitDocuments { get; set; }
    }
}
