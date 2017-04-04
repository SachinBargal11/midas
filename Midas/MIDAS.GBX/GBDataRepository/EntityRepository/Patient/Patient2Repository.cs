﻿using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class Patient2Repository : BaseEntityRepo, IDisposable
    {
        private DbSet<Patient2> _dbSet;

        #region Constructor
        public Patient2Repository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Patient2>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Patient2 patient2 = entity as Patient2;

            if (patient2 == null)
                return default(T);

            BO.Patient2 patientBO2 = new BO.Patient2();

            patientBO2.ID = patient2.Id;
            patientBO2.SSN = patient2.SSN;
            patientBO2.Weight = patient2.Weight;
            patientBO2.Height = patient2.Height;
            patientBO2.MaritalStatusId = patient2.MaritalStatusId;
            patientBO2.DateOfFirstTreatment = patient2.DateOfFirstTreatment;

            if (patient2.IsDeleted.HasValue)
                patientBO2.IsDeleted = patient2.IsDeleted.Value;
            if (patient2.UpdateByUserID.HasValue)
                patientBO2.UpdateByUserID = patient2.UpdateByUserID.Value;

            if (patient2.User != null)
            {
                BO.User boUser = new BO.User();
                using (UserRepository cmp = new UserRepository(_context))
                {
                    boUser = cmp.Convert<BO.User, User>(patient2.User);
                    patientBO2.User = boUser;
                }
            }                

            patientBO2.IsDeleted = patient2.IsDeleted;
            patientBO2.CreateByUserID = patient2.CreateByUserID;
            patientBO2.UpdateByUserID = patient2.UpdateByUserID;

            return (T)(object)patientBO2;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Patient2 patient2 = (BO.Patient2)(object)entity;
            var result = patient2.Validate(patient2);
            return result;
        }
        #endregion

        #region Get All Patient
        public override object Get<T>(T entity)
        {
            BO.Patient2 patientBO = (BO.Patient2)(object)entity;

            var acc_ = _context.Patient2.Include("User")
                                        .Include("User.UserCompanies")
                                        .Include("User.AddressInfo")
                                        .Include("User.ContactInfo")
                                        .Where(p => p.IsDeleted.HasValue == false || p.IsDeleted == false)
                                        .ToList<Patient2>();
           
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Patient2> lstpatients = new List<BO.Patient2>();
            foreach (Patient2 item in acc_)
            {
                lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
            }
            return lstpatients;
        }
        #endregion

        #region Get By Company ID For Patient 
        public override object GetByCompanyId(int CompanyId)
        {
                      var acc = _context.Patient2.Include("User")
                                                 .Include("User.UserCompanies")
                                                 .Include("User.AddressInfo")
                                                 .Include("User.ContactInfo")
                                                 .Where(p => p.User.UserCompanies.Where(p2 =>p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                                 .Any(p3=> p3.CompanyID== CompanyId)                                                                        
                                                 &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                 .ToList<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient2> lstpatients = new List<BO.Patient2>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient2, Patient2>(p)));
                foreach (Patient2 item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
                }

                return lstpatients;
            }
           
        }
        #endregion


        #region Get By Company ID and DoctorId For Patient 
        public override object Get(int CompanyId, int DoctorId)
        {
            var userInCompany = _context.UserCompanies.Where(p => p.CompanyID == CompanyId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.UserID);
            var patientInCaseMapping = _context.DoctorCaseConsentApprovals.Where(p => p.DoctorId == DoctorId && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.CaseId);
            var patientWithCase = _context.Cases.Where(p => patientInCaseMapping.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).Select(p2 => p2.PatientId);

            var acc = _context.Patient2.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Where(p => userInCompany.Contains(p.Id) && patientWithCase.Contains(p.Id) && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false))).ToList<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient2> lstpatients = new List<BO.Patient2>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient2, Patient2>(p)));
                foreach (Patient2 item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
                }

                return lstpatients;
            }

        }
        #endregion

        #region GetByCompanyWithOpenCases For Patient 
        public override object GetByCompanyWithOpenCases(int CompanyId)
        {
            var openCase = _context.Cases.Where(p => p.CaseStatusId.HasValue == true && p.CaseStatusId == 1
                                                     && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .Select(p => p.PatientId)
                                                    .Distinct<int>();


            var acc = _context.Patient2.Include("User")
                                      .Include("User.UserCompanies")
                                      .Include("User.AddressInfo")
                                      .Include("User.ContactInfo")
                                      .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                      .Any(p3 => p3.CompanyID == CompanyId) 
                                      && (openCase.Contains(p.Id))
                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                      .ToList<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient2> lstpatients = new List<BO.Patient2>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient2, Patient2>(p)));
                foreach (Patient2 item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
                }

                return lstpatients;
            }

        }
        #endregion


        #region GetByCompanyWithCloseCases For Patient 
        public override object GetByCompanyWithCloseCases(int CompanyId)
        {
            var openCase = _context.Cases.Where(p => (p.CaseStatusId.HasValue == true && p.CaseStatusId == 1)
                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .Select(p => p.PatientId)
                                         .Distinct<int>();


            var acc = _context.Patient2.Include("User")
                                     .Include("User.UserCompanies")
                                     .Include("User.AddressInfo")
                                     .Include("User.ContactInfo")
                                     .Where(p => p.User.UserCompanies.Where(p2 => p2.IsDeleted.HasValue == false || (p2.IsDeleted.HasValue == true && p2.IsDeleted.Value == false))
                                     .Any(p3 => p3.CompanyID == CompanyId)
                                      && ((p.Cases.Count > 0 && openCase.Contains(p.Id) == false) || (p.Cases.Count <= 0))
                                      && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                     .ToList<Patient2>();           

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient2> lstpatients = new List<BO.Patient2>();
                foreach (Patient2 item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
                }

                return lstpatients;
            }

        }
        #endregion
        #region GetByLocationWithOpenCases For Patient 
        public override object GetByLocationWithOpenCases(int LocationId)
        {
            var openCase = _context.Cases.Where(p => p.CaseStatusId.HasValue == true && p.CaseStatusId == 1 && p.LocationId == LocationId
                                          && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                         .Select(p => p.PatientId)
                                         .Distinct<int>();

            var acc = _context.Patient2.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Where(p => (openCase.Contains(p.Id))
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                       .ToList<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.Patient2> lstpatients = new List<BO.Patient2>();
                //acc.ForEach(p => lstpatients.Add(Convert<BO.Patient2, Patient2>(p)));
                foreach (Patient2 item in acc)
                {
                    lstpatients.Add(Convert<BO.Patient2, Patient2>(item));
                }

                return lstpatients;
            }
        }
        #endregion

        #region Get By ID For Patient 
        public override object Get(int id)
        {
            var acc = _context.Patient2.Include("User")
                                       .Include("User.UserCompanies")
                                       .Include("User.AddressInfo")
                                       .Include("User.ContactInfo")
                                       .Where(p => p.Id == id && (p.IsDeleted.HasValue == false || p.IsDeleted == false))
                                       .FirstOrDefault<Patient2>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Patient.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                BO.Patient2 acc_ = Convert<BO.Patient2, Patient2>(acc);
                return (object)acc_;
            }
        }
        #endregion

       #region save
        //public override object Save<T>(T entity)
        //{
        //    BO.Patient2 patient2BO = (BO.Patient2)(object)entity;
        //    //BO.Company CompanyBO = patient2BO.Company;
        //    //BO.Location locationBO = patient2BO.Location;
        //    BO.User userBO = patient2BO.User;
        //    BO.AddressInfo addressUserBO = patient2BO.User.AddressInfo;
        //    BO.ContactInfo contactinfoUserBO = patient2BO.User.ContactInfo;
        //    BO.AddressInfo addressPatientBO = patient2BO.AddressInfo;
        //    BO.ContactInfo contactinfoPatientBO = patient2BO.ContactInfo;

        //    Guid invitationDB_UniqueID = Guid.NewGuid();
        //    bool sendEmail = false;

        //    Patient2 patient2DB = new Patient2();

        //    using (var dbContextTransaction = _context.Database.BeginTransaction())
        //    {
        //        Company CompanyDB = new Company();
        //        //Location locationDB = new Location();
        //        AddressInfo addressUserDB = new AddressInfo();
        //        ContactInfo contactinfoDB = new ContactInfo();
        //        User userDB = new User();

        //        AddressInfo addressPatientDB = new AddressInfo();
        //        ContactInfo contactinfoPatientDB = new ContactInfo();


        //        #region Address Info User
        //        if (addressUserBO != null)
        //        {
        //            bool Add_addressDB = false;
        //            addressUserDB = _context.AddressInfoes.Where(p => p.id == addressUserBO.ID).FirstOrDefault();

        //            if (addressUserDB == null && addressUserBO.ID <= 0)
        //            {
        //                addressUserDB = new AddressInfo();
        //                Add_addressDB = true;
        //            }
        //            else if (addressUserDB == null && addressUserBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            //addressUserDB.id = addressUserBO.ID;
        //            addressUserDB.Name = addressUserBO.Name;
        //            addressUserDB.Address1 = addressUserBO.Address1;
        //            addressUserDB.Address2 = addressUserBO.Address2;
        //            addressUserDB.City = addressUserBO.City;
        //            addressUserDB.State = addressUserBO.State;
        //            addressUserDB.ZipCode = addressUserBO.ZipCode;
        //            addressUserDB.Country = addressUserBO.Country;

        //            if (Add_addressDB == true)
        //            {
        //                addressUserDB = _context.AddressInfoes.Add(addressUserDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region Contact Info User
        //        if (contactinfoUserBO != null)
        //        {
        //            bool Add_contactinfoDB = false;
        //            contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoUserBO.ID).FirstOrDefault();

        //            if (contactinfoDB == null && contactinfoUserBO.ID <= 0)
        //            {
        //                contactinfoDB = new ContactInfo();
        //                Add_contactinfoDB = true;
        //            }
        //            else if (contactinfoDB == null && contactinfoUserBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            //contactinfoDB.id = contactinfoUserBO.ID;
        //            contactinfoDB.Name = contactinfoUserBO.Name;
        //            contactinfoDB.CellPhone = contactinfoUserBO.CellPhone;
        //            contactinfoDB.EmailAddress = contactinfoUserBO.EmailAddress;
        //            contactinfoDB.HomePhone = contactinfoUserBO.HomePhone;
        //            contactinfoDB.WorkPhone = contactinfoUserBO.WorkPhone;
        //            contactinfoDB.FaxNo = contactinfoUserBO.FaxNo;
        //            contactinfoDB.IsDeleted = contactinfoUserBO.IsDeleted;

        //            if (Add_contactinfoDB == true)
        //            {
        //                contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Contact details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region User
        //        if (userBO != null)
        //        {
        //            bool Add_userDB = false;
        //            userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault();

        //            if (userDB == null && userBO.ID <= 0)
        //            {
        //                userDB = new User();
        //                Add_userDB = true;
        //                sendEmail = true;
        //            }
        //            else if (userDB == null && userBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            if (Add_userDB == true)
        //            {
        //                if (_context.Users.Any(p => p.UserName == userBO.UserName))
        //                {
        //                    dbContextTransaction.Rollback();
        //                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name already exists.", ErrorLevel = ErrorLevel.Error };
        //                }
        //            }

        //            userDB.UserName = Add_userDB == true ? userBO.UserName : userDB.UserName;
        //            userDB.FirstName = userBO.FirstName;
        //            userDB.MiddleName = userBO.MiddleName;
        //            userDB.LastName = userBO.LastName;
        //            userDB.Gender = System.Convert.ToByte(userBO.Gender);
        //            userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
        //            userDB.UserStatus = System.Convert.ToByte(userBO.Status);
        //            userDB.ImageLink = userBO.ImageLink;
        //            userDB.DateOfBirth = userBO.DateOfBirth;

        //            if (Add_userDB == true && string.IsNullOrEmpty(userBO.Password) == false)
        //            {
        //                userDB.Password = PasswordHash.HashPassword(userBO.Password);
        //            }

        //            userDB.AddressId = addressUserDB.id;
        //            userDB.ContactInfoId = contactinfoDB.id;

        //            userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
        //            userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

        //            userDB.CreateByUserID = Add_userDB == true ? userBO.CreateByUserID : userDB.CreateByUserID;
        //            userDB.CreateDate = Add_userDB == true ? DateTime.UtcNow : userDB.CreateDate;

        //            userDB.UpdateByUserID = Add_userDB == false ? userBO.UpdateByUserID : userDB.UpdateByUserID;
        //            userDB.UpdateDate = Add_userDB == false ? DateTime.UtcNow : userDB.UpdateDate;

        //            if (Add_userDB == true)
        //            {
        //                userDB = _context.Users.Add(userDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region Patient AttorneyAddressInfoId
        //        if (addressPatientBO != null)
        //        {
        //            bool Add_addressDB = false;
        //            addressPatientDB = _context.AddressInfoes.Where(p => p.id == addressPatientBO.ID).FirstOrDefault();

        //            if (addressPatientDB == null && addressPatientBO.ID <= 0)
        //            {
        //                addressPatientDB = new AddressInfo();
        //                Add_addressDB = true;
        //            }
        //            else if (addressPatientDB == null && addressPatientBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            //addressPatientDB.id = addressPatientBO.ID;
        //            addressPatientDB.Name = addressPatientBO.Name;
        //            addressPatientDB.Address1 = addressPatientBO.Address1;
        //            addressPatientDB.Address2 = addressPatientBO.Address2;
        //            addressPatientDB.City = addressPatientBO.City;
        //            addressPatientDB.State = addressPatientBO.State;
        //            addressPatientDB.ZipCode = addressPatientBO.ZipCode;
        //            addressPatientDB.Country = addressPatientBO.Country;

        //            if (Add_addressDB == true)
        //            {
        //                addressPatientDB = _context.AddressInfoes.Add(addressPatientDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Address details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region Patient AttorneyContactInfoId
        //        if (contactinfoPatientBO != null)
        //        {
        //            bool Add_contactinfoDB = false;
        //            contactinfoPatientDB = _context.ContactInfoes.Where(p => p.id == contactinfoPatientBO.ID).FirstOrDefault();

        //            if (contactinfoPatientDB == null && contactinfoPatientBO.ID <= 0)
        //            {
        //                contactinfoPatientDB = new ContactInfo();
        //                Add_contactinfoDB = true;
        //            }
        //            else if (contactinfoPatientDB == null && contactinfoPatientBO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Attorney Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            //contactinfoPatientDB.id = contactinfoPatientBO.ID;
        //            contactinfoPatientDB.Name = contactinfoPatientBO.Name;
        //            contactinfoPatientDB.CellPhone = contactinfoPatientBO.CellPhone;
        //            contactinfoPatientDB.EmailAddress = contactinfoPatientBO.EmailAddress;
        //            contactinfoPatientDB.HomePhone = contactinfoPatientBO.HomePhone;
        //            contactinfoPatientDB.WorkPhone = contactinfoPatientBO.WorkPhone;
        //            contactinfoPatientDB.FaxNo = contactinfoPatientBO.FaxNo;
        //            contactinfoPatientDB.IsDeleted = contactinfoPatientBO.IsDeleted;

        //            if (Add_contactinfoDB == true)
        //            {
        //                contactinfoPatientDB = _context.ContactInfoes.Add(contactinfoPatientDB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Attorney Contact details.", ErrorLevel = ErrorLevel.Error };
        //        }
        //        #endregion

        //        #region Patient
        //        if (patient2BO != null)
        //        {
        //            bool Add_patientDB = false;
        //            patient2DB = _context.Patient2.Where(p => p.Id == patient2BO.ID).FirstOrDefault();

        //            if (patient2DB == null && patient2BO.ID <= 0)
        //            {
        //                patient2DB = new Patient2();
        //                Add_patientDB = true;
        //            }
        //            else if (patient2DB == null && patient2BO.ID > 0)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            patient2DB.Id = userDB.id;

        //            if (Add_patientDB == true)
        //            {
        //                if (_context.Patient2.Any(p => p.SSN == patient2BO.SSN))
        //                {
        //                    dbContextTransaction.Rollback();
        //                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "SSN already exists.", ErrorLevel = ErrorLevel.Error };
        //                }
        //            }

        //            patient2DB.SSN = patient2BO.SSN;
        //            patient2DB.CompanyId = patient2BO.CompanyId;
        //            patient2DB.Weight = patient2BO.Weight;
        //            patient2DB.Height = patient2BO.Height;
        //            patient2DB.MaritalStatusId = patient2BO.MaritalStatusId;
        //            patient2DB.DateOfFirstTreatment = patient2BO.DateOfFirstTreatment;
        //            patient2DB.AttorneyName = patient2BO.AttorneyName;
        //            patient2DB.AttorneyAddressInfoId = addressPatientDB.id;
        //            patient2DB.AttorneyContactInfoId = contactinfoPatientDB.id;

        //            patient2DB.IsDeleted = patient2BO.IsDeleted.HasValue ? patient2BO.IsDeleted : false;

        //            CompanyDB = _context.Companies.Where(p => p.id == patient2BO.CompanyId).FirstOrDefault();
        //            if (CompanyDB != null)
        //            {
        //                patient2DB.CompanyId = patient2BO.CompanyId;
        //            }
        //            else
        //            {
        //                dbContextTransaction.Rollback();
        //                return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Company Id.", ErrorLevel = ErrorLevel.Error };
        //            }

        //            //locationDB = _context.Locations.Where(p => p.id == patient2BO.LocationID).FirstOrDefault();
        //            //if (locationDB != null)
        //            //{
        //            //    patient2DB.LocationID = patient2BO.LocationID;
        //            //}
        //            //else
        //            //{
        //            //    dbContextTransaction.Rollback();
        //            //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Location Id.", ErrorLevel = ErrorLevel.Error };
        //            //}

        //            if (Add_patientDB == true)
        //            {
        //                patient2DB = _context.Patient2.Add(patient2DB);
        //            }
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            dbContextTransaction.Rollback();
        //            return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient details.", ErrorLevel = ErrorLevel.Error };
        //        }

        //        _context.SaveChanges();
        //        #endregion

        //        if (sendEmail == true)
        //        {
        //            #region Insert Invitation
        //            Invitation invitationDB = new Invitation();
        //            invitationDB.User = userDB;

        //            invitationDB_UniqueID = Guid.NewGuid();

        //            invitationDB.UniqueID = invitationDB_UniqueID;
        //            invitationDB.CompanyID = patient2DB.CompanyId.HasValue == true ? patient2DB.CompanyId.Value : 0;
        //            invitationDB.CreateDate = DateTime.UtcNow;
        //            invitationDB.CreateByUserID = userDB.id;
        //            _context.Invitations.Add(invitationDB);
        //            _context.SaveChanges();
        //            #endregion
        //        }

        //        dbContextTransaction.Commit();

        //        patient2DB = _context.Patient2.Include("Company")
        //                                      .Include("AddressInfo")
        //                                      .Include("ContactInfo")
        //                                      .Include("User")
        //                                      .Include("User.AddressInfo")
        //                                      .Include("User.ContactInfo")
        //                                      .Where(p => p.Id == patient2DB.Id)
        //                                      .FirstOrDefault<Patient2>();
        //    }

        //    if (sendEmail == true)
        //    {
        //        try
        //        {
        //            #region Send Email
        //            string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
        //            string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
        //            BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
        //            objEmail.SendMail();
        //            #endregion
        //        }
        //        catch (Exception ex)
        //        {

        //        }
        //    }

        //    var res = Convert<BO.Patient2, Patient2>(patient2DB);
        //    return (object)res;
        //}
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.Patient2 patient2BO = (BO.Patient2)(object)entity;
            BO.User userBO = patient2BO.User;
            BO.AddressInfo addressUserBO = (patient2BO.User != null) ? patient2BO.User.AddressInfo : null;
            BO.ContactInfo contactinfoUserBO = (patient2BO.User != null) ? patient2BO.User.ContactInfo : null;

            Guid invitationDB_UniqueID = Guid.NewGuid();
            bool sendEmail = false;

            Patient2 patient2DB = new Patient2();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {

                bool IsEditMode = false;
                IsEditMode = (patient2BO != null && patient2BO.ID > 0) ? true : false;

                UserCompany UserCompanyDB = new UserCompany();
                AddressInfo addressUserDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();
                User userDB = new User();

                AddressInfo addressPatientDB = new AddressInfo();
                ContactInfo contactinfoPatientDB = new ContactInfo();


                #region Address Info User
                if (addressUserBO != null)
                {
                    bool Add_addressDB = false;
                    addressUserDB = _context.AddressInfoes.Where(p => p.id == addressUserBO.ID).FirstOrDefault();

                    if (addressUserDB == null && addressUserBO.ID <= 0)
                    {
                        addressUserDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressUserDB == null && addressUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressUserDB.Name = IsEditMode == true && addressUserBO.Name == null ? addressUserDB.Name : addressUserBO.Name;
                    addressUserDB.Address1 = IsEditMode == true && addressUserBO.Address1 == null ? addressUserDB.Address1 : addressUserBO.Address1;
                    addressUserDB.Address2 = IsEditMode == true && addressUserBO.Address2 == null ? addressUserDB.Address2 : addressUserBO.Address2;
                    addressUserDB.City = IsEditMode == true && addressUserBO.City == null ? addressUserDB.City : addressUserBO.City;
                    addressUserDB.State = IsEditMode == true && addressUserBO.State == null ? addressUserDB.State : addressUserBO.State;
                    addressUserDB.ZipCode = IsEditMode == true && addressUserBO.ZipCode == null ? addressUserDB.ZipCode : addressUserBO.ZipCode;
                    addressUserDB.Country = IsEditMode == true && addressUserBO.Country == null ? addressUserDB.Country : addressUserBO.Country;
                    //[STATECODE-CHANGE]
                    //addressUserDB.StateCode = IsEditMode == true && addressUserBO.StateCode == null ? addressUserDB.StateCode : addressUserBO.StateCode;
                    //[STATECODE-CHANGE]

                    if (Add_addressDB == true)
                    {
                        addressUserDB = _context.AddressInfoes.Add(addressUserDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    addressUserDB = null;
                }
                #endregion

                #region Contact Info User
                if (contactinfoUserBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoUserBO.ID).FirstOrDefault();

                    if (contactinfoDB == null && contactinfoUserBO.ID <= 0)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoDB == null && contactinfoUserBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    contactinfoDB.Name = IsEditMode == true && contactinfoUserBO.Name == null ? contactinfoDB.Name : contactinfoUserBO.Name;
                    contactinfoDB.CellPhone = IsEditMode == true && contactinfoUserBO.CellPhone == null ? contactinfoDB.CellPhone : contactinfoUserBO.CellPhone;
                    contactinfoDB.EmailAddress = IsEditMode == true && contactinfoUserBO.EmailAddress == null ? contactinfoDB.EmailAddress : contactinfoUserBO.EmailAddress;
                    contactinfoDB.HomePhone = IsEditMode == true && contactinfoUserBO.HomePhone == null ? contactinfoDB.HomePhone : contactinfoUserBO.HomePhone;
                    contactinfoDB.WorkPhone = IsEditMode == true && contactinfoUserBO.WorkPhone == null ? contactinfoDB.WorkPhone : contactinfoUserBO.WorkPhone;
                    contactinfoDB.FaxNo = IsEditMode == true && contactinfoUserBO.FaxNo == null ? contactinfoDB.FaxNo : contactinfoUserBO.FaxNo;
                    contactinfoDB.IsDeleted = IsEditMode == true && contactinfoUserBO.IsDeleted == null ? contactinfoDB.IsDeleted : contactinfoUserBO.IsDeleted;


                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid address details.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoDB = null;
                }
                #endregion

                #region User
                if (userBO != null)
                {
                    bool Add_userDB = false;
                    userDB = _context.Users.Where(p => p.id == userBO.ID).FirstOrDefault();

                    if (userDB == null && userBO.ID <= 0)
                    {
                        userDB = new User();
                        Add_userDB = true;
                        sendEmail = true;
                    }
                    else if (userDB == null && userBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_userDB == true)
                    {
                        if (_context.Users.Any(p => p.UserName == userBO.UserName))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "User Name already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    userDB.UserName = Add_userDB == true ? userBO.UserName : userDB.UserName;
                    userDB.FirstName = IsEditMode == true && userBO.FirstName == null ? userDB.FirstName : userBO.FirstName;
                    userDB.MiddleName = IsEditMode == true && userBO.MiddleName == null ? userDB.MiddleName : userBO.MiddleName;
                    userDB.LastName = IsEditMode == true && userBO.LastName == null ? userDB.LastName : userBO.LastName;
                    userDB.Gender = (IsEditMode == true && userBO.Gender <= 0) ? userDB.Gender : System.Convert.ToByte(userBO.Gender);
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = IsEditMode == true && userBO.ImageLink == null ? userDB.ImageLink : userBO.ImageLink;
                    userDB.DateOfBirth = IsEditMode == true && userBO.DateOfBirth == null ? userDB.DateOfBirth : userBO.DateOfBirth;
                    if (Add_userDB == true && string.IsNullOrEmpty(userBO.Password) == false)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                    }

                    userDB.AddressId = (addressUserDB != null && addressUserDB.id > 0) ? addressUserDB.id : userDB.AddressId;
                    userDB.ContactInfoId = (contactinfoDB != null && contactinfoDB.id > 0) ? contactinfoDB.id : userDB.ContactInfoId;

                    userDB.C2FactAuthEmailEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactEmail"));
                    userDB.C2FactAuthSMSEnabled = System.Convert.ToBoolean(Utility.GetConfigValue("Default2FactSMS"));

                    userDB.CreateByUserID = Add_userDB == true ? userBO.CreateByUserID : userDB.CreateByUserID;
                    userDB.CreateDate = Add_userDB == true ? DateTime.UtcNow : userDB.CreateDate;

                    userDB.UpdateByUserID = Add_userDB == false ? userBO.UpdateByUserID : userDB.UpdateByUserID;
                    userDB.UpdateDate = Add_userDB == false ? DateTime.UtcNow : userDB.UpdateDate;

                    if (Add_userDB == true)
                    {
                        userDB = _context.Users.Add(userDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid user details.", ErrorLevel = ErrorLevel.Error };
                    }
                    userDB = null;
                }
                #endregion

                #region Patient
                if (patient2BO != null)
                {
                    bool Add_patientDB = false;
                    patient2DB = _context.Patient2.Where(p => p.Id == patient2BO.ID).FirstOrDefault();

                    if (patient2DB == null && patient2BO.ID <= 0)
                    {
                        patient2DB = new Patient2();
                        Add_patientDB = true;
                    }
                    else if (patient2DB == null && patient2BO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (IsEditMode == false)
                    {
                        patient2DB.Id = userDB.id;
                    }

                    if (Add_patientDB == true)
                    {
                        if (_context.Patient2.Any(p => p.SSN == patient2BO.SSN))
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { errorObject = "", ErrorMessage = "SSN already exists.", ErrorLevel = ErrorLevel.Error };
                        }
                    }

                    patient2DB.SSN = IsEditMode == true && patient2BO.SSN == null ? patient2DB.SSN : patient2BO.SSN;
                    patient2DB.Weight = IsEditMode == true && patient2BO.Weight == null ? patient2DB.Weight : patient2BO.Weight;
                    patient2DB.Height = IsEditMode == true && patient2BO.Height == null ? patient2DB.Height : patient2BO.Height;
                    patient2DB.MaritalStatusId = IsEditMode == true && patient2BO.MaritalStatusId == null ? patient2DB.MaritalStatusId : patient2BO.MaritalStatusId;
                    patient2DB.DateOfFirstTreatment = IsEditMode == true && patient2BO.DateOfFirstTreatment == null ? patient2DB.DateOfFirstTreatment : patient2BO.DateOfFirstTreatment;
                    patient2DB.IsDeleted = patient2BO.IsDeleted.HasValue ? patient2BO.IsDeleted : false;


                    if (Add_patientDB == true)
                    {
                        patient2DB = _context.Patient2.Add(patient2DB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid patient details.", ErrorLevel = ErrorLevel.Error };
                    }
                    patient2DB = null;
                }

                _context.SaveChanges();
                #endregion

                #region User Companies
                if (patient2BO.User.UserCompanies != null)
                {
                    bool add_UserCompany = false;


                    Company companyDB = new Company();

                    foreach (var userCompany in patient2BO.User.UserCompanies)
                    {
                        userCompany.UserId = userDB.id;
                        //UserCompanyDB = _context.UserCompanies.Where(p => p.id == userCompany.ID
                        //                                       && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                        //                                       .FirstOrDefault<UserCompany>();
                        UserCompanyDB = _context.UserCompanies.Where(p => p.UserID == userDB.id && p.CompanyID == userCompany.Company.ID && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                               .FirstOrDefault<UserCompany>();


                        if (UserCompanyDB == null)
                        {
                            UserCompanyDB = new UserCompany();
                            add_UserCompany = true;
                        }
                        //else if (UserCompanyDB == null && userCompany.ID > 0)
                        //{
                        //    dbContextTransaction.Rollback();
                        //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "UserCompany details dosent exists.", ErrorLevel = ErrorLevel.Error };
                        //}

                        //var acc = _context.UserCompanies.Where(p => p.UserID == patient2DB.Id && p.CompanyID == userCompany.CompanyId
                        //                                 &&(p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                        //                                .FirstOrDefault<UserCompany>();
                        //if (acc != null)
                        //{
                        //    dbContextTransaction.Rollback();
                        //    return new BO.ErrorObject { errorObject = "", ErrorMessage = "User is already associated with given company.", ErrorLevel = ErrorLevel.Error };
                        //}

                        UserCompanyDB.CompanyID = userCompany.Company.ID;
                        UserCompanyDB.UserID = userCompany.UserId;


                        if (add_UserCompany)
                        {
                            _context.UserCompanies.Add(UserCompanyDB);
                        }
                        _context.SaveChanges();
                    }

                }
                #endregion

                if (sendEmail == true)
                {
                    #region Insert Invitation
                    Invitation invitationDB = new Invitation();
                    invitationDB.User = userDB;

                    invitationDB_UniqueID = Guid.NewGuid();
                    invitationDB.UniqueID = invitationDB_UniqueID;
                    invitationDB.CompanyID = UserCompanyDB.CompanyID != 0 ? UserCompanyDB.CompanyID : 0;
                    invitationDB.CreateDate = DateTime.UtcNow;
                    invitationDB.CreateByUserID = userDB.id;
                    _context.Invitations.Add(invitationDB);
                    _context.SaveChanges();
                    #endregion
                }

                dbContextTransaction.Commit();

                patient2DB = _context.Patient2.Include("User")
                                              .Include("User.UserCompanies")
                                              .Include("User.UserCompanies.Company")
                                              .Include("User.AddressInfo")
                                              .Include("User.ContactInfo")
                                              .Where(p => p.Id == patient2DB.Id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                              .FirstOrDefault<Patient2>();
            }

            if (sendEmail == true)
            {
                try
                {
                    #region Send Email
                    string VerificationLink = "<a href='" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "' target='_blank'>" + Utility.GetConfigValue("PatientVerificationLink") + "/" + invitationDB_UniqueID + "</a>";
                    string Message = "Dear " + userBO.FirstName + ",<br><br>Thanks for registering with us.<br><br> Your user name is:- " + userBO.UserName + "<br><br> Please confirm your account by clicking below link in order to use.<br><br><b>" + VerificationLink + "</b><br><br>Thanks";
                    BO.Email objEmail = new BO.Email { ToEmail = userBO.UserName, Subject = "User registered", Body = Message };
                    objEmail.SendMail();
                    #endregion
                }
                catch (Exception ex)
                {

                }
            }

            var res = Convert<BO.Patient2, Patient2>(patient2DB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            Patient2 patient2 = new Patient2();
            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                patient2 = _context.Patient2.Include("User").Where(p => p.Id == id && (p.IsDeleted == false || p.IsDeleted == null))
                                            .FirstOrDefault();

                if (patient2 != null)
                {
                    patient2.IsDeleted = true;
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Patient details dosent exists.", ErrorLevel = ErrorLevel.Error };
                }

                dbContextTransaction.Commit();
            }
            var res = Convert<BO.Patient2, Patient2>(patient2);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
