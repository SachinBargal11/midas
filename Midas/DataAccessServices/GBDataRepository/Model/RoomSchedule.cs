//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GBDataRepository.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class RoomSchedule
    {
        public int RoomScheduleId { get; set; }
        public Nullable<int> RoomId { get; set; }
        public string Day { get; set; }
        public Nullable<System.TimeSpan> StartTime { get; set; }
        public Nullable<System.TimeSpan> EndtTime { get; set; }
        public Nullable<System.DateTime> EffectiveFrom { get; set; }
        public Nullable<System.DateTime> EffectiveTo { get; set; }
        public int AccountId { get; set; }
    
        public virtual Account Account { get; set; }
        public virtual Room Room { get; set; }
    }
}
