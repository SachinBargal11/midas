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
    
    public partial class DiagnosisTypeCompany
    {
        public int Id { get; set; }
        public Nullable<int> DiagnosisTypeID { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreatedByUserID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdatedByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual DiagnosisType DiagnosisType { get; set; }
    }
}
