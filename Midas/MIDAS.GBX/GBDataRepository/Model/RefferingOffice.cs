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
    
    public partial class RefferingOffice
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Nullable<byte> RefferingOfficeId { get; set; }
        public Nullable<int> AddressInfoId { get; set; }
        public Nullable<byte> ReffferingDoctorId { get; set; }
        public string NPI { get; set; }
        public bool IsCurrentReffOffice { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        public virtual Patient2 Patient2 { get; set; }
    }
}
