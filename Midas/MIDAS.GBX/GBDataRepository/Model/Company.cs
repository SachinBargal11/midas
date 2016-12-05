//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MIDAS.GBX.DataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Company
    {
        public Company()
        {
            this.CompanySpecialtyDetails = new HashSet<CompanySpecialtyDetail>();
            this.Invitations = new HashSet<Invitation>();
            this.Locations = new HashSet<Location>();
            this.MedicalProviders = new HashSet<MedicalProvider>();
            this.UserCompanies = new HashSet<UserCompany>();
        }
    
        public int id { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }
        public int CompanyType { get; set; }
        public int SubscriptionPlanType { get; set; }
        public string TaxID { get; set; }
        public int AddressId { get; set; }
        public int ContactInfoID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        public virtual CompanyType CompanyType1 { get; set; }
        public virtual ContactInfo ContactInfo { get; set; }
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
        public virtual ICollection<CompanySpecialtyDetail> CompanySpecialtyDetails { get; set; }
        public virtual ICollection<Invitation> Invitations { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<MedicalProvider> MedicalProviders { get; set; }
        public virtual ICollection<UserCompany> UserCompanies { get; set; }
    }
}