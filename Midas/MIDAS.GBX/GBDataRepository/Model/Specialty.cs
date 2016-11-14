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
    
    public partial class Specialty
    {
        public Specialty()
        {
            this.CompanySpecialtyDetails = new HashSet<CompanySpecialtyDetail>();
            this.SpecialtyDetails = new HashSet<SpecialtyDetail>();
        }
    
        public int id { get; set; }
        public string Name { get; set; }
        public string SpecialityCode { get; set; }
        public Nullable<bool> IsUnitApply { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual ICollection<CompanySpecialtyDetail> CompanySpecialtyDetails { get; set; }
        public virtual ICollection<SpecialtyDetail> SpecialtyDetails { get; set; }
    }
}
