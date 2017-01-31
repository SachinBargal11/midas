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
    
    public partial class InsuranceInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InsuranceInfo()
        {
            this.Cases = new HashSet<Case>();
        }
    
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int InsuranceId { get; set; }
        public string PolicyNo { get; set; }
        public string PolicyHoldersName { get; set; }
        public int InsuranceAddressId { get; set; }
        public Nullable<int> InsuranceContactInfoId { get; set; }
        public bool IsPrimaryInsurance { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Case> Cases { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual User User { get; set; }
    }
}