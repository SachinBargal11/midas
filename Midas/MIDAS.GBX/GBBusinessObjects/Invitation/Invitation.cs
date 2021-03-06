﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Invitation : GbObject
    {
        //Invitation invitation = new Invitation();
        [JsonProperty("appKey")]
        public Guid UniqueID { get; set; }
        public Company Company { get; set; }
        public User User { get; set; }
        [JsonProperty("isExpired")]
        public bool IsExpired { get; set; }
        [JsonProperty("isActivated")]
        public bool IsActivated { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {

            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            //Implement logic for validation

            Guid UniqueID_=new Guid();
            if (!Guid.TryParse(UniqueID.ToString(), out UniqueID_))
            {
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Invalid appkey." });
            }

            return validations;
        }
    }
}
