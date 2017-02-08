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
    
    public partial class PatientAccidentInfo
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Nullable<System.DateTime> AccidentDate { get; set; }
        public string PlateNumber { get; set; }
        public string ReportNumber { get; set; }
        public int AccidentAddressInfoId { get; set; }
        public string HospitalName { get; set; }
        public int HospitalAddressInfoId { get; set; }
        public Nullable<System.DateTime> DateOfAdmission { get; set; }
        public string AdditionalPatients { get; set; }
        public string DescribeInjury { get; set; }
        public Nullable<byte> PatientTypeId { get; set; }
        public bool IsCurrentAccident { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual AddressInfo AddressInfo { get; set; }
        public virtual AddressInfo AddressInfo1 { get; set; }
        public virtual Patient2 Patient2 { get; set; }
        public virtual PatientType PatientType { get; set; }
    }
}
