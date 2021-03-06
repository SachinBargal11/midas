﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.BusinessObjects
{
    public class Notification : GbObject
    {       
        //public int Id { get; set; }
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [JsonProperty("locationId")]
        public Nullable<int> LocationId { get; set; }

        [JsonProperty("notificationMessage")]
        public string NotificationMessage { get; set; }

        [JsonProperty("startDate")]
        public Nullable<System.DateTime> StartDate { get; set; }

        [JsonProperty("endDate")]
        public Nullable<System.DateTime> EndDate { get; set; }

        [JsonProperty("isViewed")]
        public bool IsViewed { get; set; }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();

            //if (ID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ID cannot be less than zero." });
            //}

            //if (PatientID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID cannot be less than zero." });
            //}

            //if (User != null && User.ID != PatientID)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "PatientID dosent match." });
            //}

            //if (string.IsNullOrWhiteSpace(SSN) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "SSN cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(WCBNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "WCBNo cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(JobTitle) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "JobTitle cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(WorkActivities) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "WorkActivities cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(CarrierCaseNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CarrierCaseNo cannot be empty." });
            //}

            //if (string.IsNullOrWhiteSpace(ChartNo) == true)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "ChartNo cannot be empty." });
            //}

            //if (CompanyId < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID cannot be less than zero." });
            //}

            //if (Company != null && Company.ID != CompanyId)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "CompanyID dosent match." });
            //}

            //if (LocationID < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID cannot be less than zero." });
            //}

            //if (Location != null && Location.ID != LocationID)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "LocationID dosent match." });
            //}

            //if (Weight.HasValue == true && Weight < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Weight cannot be less than zero." });
            //}

            //if (Height.HasValue == true && Height < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Height cannot be less than zero." });
            //}

            //if (MaritalStatusId.HasValue == true && MaritalStatusId < 0)
            //{
            //    validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Please select MaritalStatus." });
            //}



            return validations;
        }
    }
}