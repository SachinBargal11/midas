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
    
    public partial class DefendantVehicle
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public string VehicleNumberPlate { get; set; }
        public string State { get; set; }
        public string VehicleMakeModel { get; set; }
        public string VehicleMakeYear { get; set; }
        public string VehicleOwnerName { get; set; }
        public string VehicleOperatorName { get; set; }
        public string VehicleInsuranceCompanyName { get; set; }
        public string VehiclePolicyNumber { get; set; }
        public string VehicleClaimNumber { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Case Case { get; set; }
    }
}
