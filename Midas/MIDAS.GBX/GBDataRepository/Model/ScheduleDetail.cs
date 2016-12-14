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
    
    public partial class ScheduleDetail
    {
        public int id { get; set; }
        public string Name { get; set; }
        public int ScheduleID { get; set; }
        public int DayOfWeek { get; set; }
        public System.TimeSpan SlotStart { get; set; }
        public System.TimeSpan SlotEnd { get; set; }
        public Nullable<System.DateTime> SlotDate { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public int CreateByUserID { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<int> UpdateByUserID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    
        public virtual Schedule Schedule { get; set; }
    }
}
