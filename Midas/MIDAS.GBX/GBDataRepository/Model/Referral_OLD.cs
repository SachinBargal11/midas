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
    
    public partial class Referral_OLD
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public int ReferringCompanyId { get; set; }
        public int ReferringLocationId { get; set; }
        public Nullable<int> ReferredToCompanyId { get; set; }
        public Nullable<int> ReferredToLocationId { get; set; }
        public Nullable<int> ReferredToDoctorId { get; set; }
        public Nullable<int> ReferredToRoomId { get; set; }
        public string Note { get; set; }
        public string ReferredByEmail { get; set; }
        public string ReferredToEmail { get; set; }
        public Nullable<bool> ReferralAccepted { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public int ReferringUserId { get; set; }
        public Nullable<int> ReferredToSpecialtyId { get; set; }
        public Nullable<int> ReferredToRoomTestId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CellPhone { get; set; }
    }
}