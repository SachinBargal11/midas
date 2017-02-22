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
    
    public partial class CaseInsuranceMapping
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        public int PatientInsuranceInfoId { get; set; }
        public Nullable<int> AdjusterMasterId { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual AdjusterMaster AdjusterMaster { get; set; }
        public virtual Case Case { get; set; }
        public virtual PatientInsuranceInfo PatientInsuranceInfo { get; set; }
    }
}
