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
    
    public partial class CompanyICDTypeCode
    {
        public int Id { get; set; }
        public int CompanyID { get; set; }
        public int ICDTypeCodeID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreatedByUserID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdatedByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual ICDTypeCode ICDTypeCode { get; set; }
    }
}
