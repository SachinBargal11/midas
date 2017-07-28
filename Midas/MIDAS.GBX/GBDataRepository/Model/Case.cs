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
    
    public partial class Case
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Case()
        {
            this.CaseCompanyConsentDocuments = new HashSet<CaseCompanyConsentDocument>();
            this.CaseCompanyMappings = new HashSet<CaseCompanyMapping>();
            this.CaseInsuranceMappings = new HashSet<CaseInsuranceMapping>();
            this.CompanyCaseConsentApprovals = new HashSet<CompanyCaseConsentApproval>();
            this.DoctorCaseConsentApprovals = new HashSet<DoctorCaseConsentApproval>();
            this.PatientAccidentInfoes = new HashSet<PatientAccidentInfo>();
            this.PatientVisits = new HashSet<PatientVisit>();
            this.Referrals = new HashSet<Referral>();
            this.RefferingOffices = new HashSet<RefferingOffice>();
        }
    
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string CaseName { get; set; }
        public Nullable<byte> CaseTypeId { get; set; }
        public int LocationId { get; set; }
        public Nullable<int> PatientEmpInfoId { get; set; }
        public string CarrierCaseNo { get; set; }
        public Nullable<byte> CaseStatusId { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string CaseSource { get; set; }
        public Nullable<int> ClaimFileNumber { get; set; }
    
        public virtual CaseStatu CaseStatu { get; set; }
        public virtual CaseType CaseType { get; set; }
        public virtual Location Location { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual PatientEmpInfo PatientEmpInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseCompanyMapping> CaseCompanyMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CaseInsuranceMapping> CaseInsuranceMappings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DoctorCaseConsentApproval> DoctorCaseConsentApprovals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientAccidentInfo> PatientAccidentInfoes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PatientVisit> PatientVisits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Referral> Referrals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RefferingOffice> RefferingOffices { get; set; }
    }
}
