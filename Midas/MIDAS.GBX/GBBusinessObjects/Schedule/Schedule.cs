﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Schedule : GbObject
    {
        public string _name;
        public string Name
        {
            get
            {
                return this._name;
            }
            set
            {
                _name = value;
            }
        }

        //public List<DoctorLocationSchedule> DoctorLocationSchedules { get; set; }
        public List<Location> Locations { get; set; }
        public List<ScheduleDetail> ScheduleDetails { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }
}
