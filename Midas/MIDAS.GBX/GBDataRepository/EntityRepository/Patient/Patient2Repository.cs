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

            patientBO2.ID = patient2.id;
            patientBO2.SSN = patient2.SSN;
            patientBO2.WCBNo = patient2.WCBNo;
            patientBO2.LocationID = patient2.LocationID;
            patientBO2.Weight = patient2.Weight;
            //patientBO2.MaritalStatus = patient2.MaritalStatus;
            patientBO2.DrivingLicence = patient2.DrivingLicence;
            patientBO2.EmergenceyContactNumber = patient2.EmergencyContactNumber;
            patientBO2.EmergenceyContactRelation = patient2.EmergencyContactRelation;
            patientBO2.EmergenceyContactName = patient2.EmergencyContactName;
            if (patient2.IsDeleted.HasValue)
                patientBO2.IsDeleted = patient2.IsDeleted.Value;
            if (patient2.UpdateByUserID.HasValue)
                patientBO2.UpdateByUserID = patient2.UpdateByUserID.Value;

            //useful to get whole structure in responce.
            //BO.Company boCompany = new BO.Company();
            //using (CompanyRepository cmp = new CompanyRepository(_context))
            //{
            //    boCompany = cmp.Convert<BO.Company, Company>(patient2.Company);
            //    patientBO2.Company = boCompany;
            //}

            BO.User boUser = new BO.User();
            using (UserRepository cmp = new UserRepository(_context))
            {
                boUser = cmp.Convert<BO.User, User>(patient2.User);
                patientBO2.User = boUser;
            }

            BO.Location boLocation = new BO.Location();
            using (LocationRepository cmp = new LocationRepository(_context))
            {
                boLocation = cmp.Convert<BO.Location, Location>(patient2.Location);
                patientBO2.Location = boLocation;
            }

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

        #region Get By ID For Patient 
        public override object Get(int id)
        {
            var acc = _context.Patient2.Include("User").Include("Location").Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Patient2>();

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
        public override object Save<T>(T entity)
        {
            BO.Patient2 patient2BO = (BO.Patient2)(object)entity;
            BO.Location locationBO = patient2BO.Location;
            BO.User userBO = patient2BO.User;
            BO.AddressInfo addressBO = patient2BO.User.AddressInfo;
            BO.ContactInfo contactinfoBO = patient2BO.User.ContactInfo;

            Patient2 patient2DB = new Patient2();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Location locationDB = new Location();
                User userDB = new User();
                AddressInfo addressDB = new AddressInfo();
                ContactInfo contactinfoDB = new ContactInfo();

                #region Address
                if (addressBO != null)
                {
                    bool Add_addressDB = false;
                    addressDB = _context.AddressInfoes.Where(p => p.id == addressBO.ID).FirstOrDefault();

                    if (addressDB == null && addressBO.ID <= 0)
                    {
                        addressDB = new AddressInfo();
                        Add_addressDB = true;
                    }
                    else if (addressDB == null && addressBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Address details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    addressDB.id = addressBO.ID;
                    addressDB.Name = addressBO.Name;
                    addressDB.Address1 = addressBO.Address1;
                    addressDB.Address2 = addressBO.Address2;
                    addressDB.City = addressBO.City;
                    addressDB.State = addressBO.State;
                    addressDB.ZipCode = addressBO.ZipCode;
                    addressDB.Country = addressBO.Country;

                    if (Add_addressDB == true)
                    {
                        addressDB = _context.AddressInfoes.Add(addressDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Address details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion                

                #region Contact Info
                if (contactinfoBO != null)
                {
                    bool Add_contactinfoDB = false;
                    contactinfoDB = _context.ContactInfoes.Where(p => p.id == contactinfoBO.ID).FirstOrDefault();

                    if (contactinfoDB == null && contactinfoBO.ID <= 0)
                    {
                        contactinfoDB = new ContactInfo();
                        Add_contactinfoDB = true;
                    }
                    else if (contactinfoDB == null && contactinfoBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Contact details dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }
                    contactinfoDB.id = contactinfoBO.ID;
                    contactinfoDB.Name = contactinfoBO.Name;
                    contactinfoDB.CellPhone = contactinfoBO.CellPhone;
                    contactinfoDB.EmailAddress = contactinfoBO.EmailAddress;
                    contactinfoDB.HomePhone = contactinfoBO.HomePhone;
                    contactinfoDB.WorkPhone = contactinfoBO.WorkPhone;
                    contactinfoDB.FaxNo = contactinfoBO.FaxNo;
                    contactinfoDB.IsDeleted = contactinfoBO.IsDeleted;

                    if (Add_contactinfoDB == true)
                    {
                        contactinfoDB = _context.ContactInfoes.Add(contactinfoDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Contact details.", ErrorLevel = ErrorLevel.Error };
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
                    userDB.FirstName = userBO.FirstName;
                    userDB.MiddleName = userBO.MiddleName;
                    userDB.LastName = userBO.LastName;
                    userDB.Gender = System.Convert.ToByte(userBO.Gender);
                    userDB.UserType = Add_userDB == true ? System.Convert.ToByte(userBO.UserType) : userDB.UserType;
                    userDB.UserStatus = System.Convert.ToByte(userBO.Status);
                    userDB.ImageLink = userBO.ImageLink;
                    userDB.DateOfBirth = userBO.DateOfBirth;

                    if (Add_userDB == true)
                    {
                        userDB.Password = PasswordHash.HashPassword(userBO.Password);
                    }

                    userDB.AddressId = addressDB.id;
                    userDB.ContactInfoId = contactinfoDB.id;

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
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User details.", ErrorLevel = ErrorLevel.Error };
                }
                #endregion                

                #region Patient
                if (patient2BO != null)
                {
                    bool Add_patientDB = false;
                    patient2DB = _context.Patient2.Where(p => p.id == patient2BO.ID).FirstOrDefault();

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

                    patient2DB.id = userDB.id;
                    patient2DB.SSN = patient2BO.SSN;
                    patient2DB.WCBNo = patient2BO.WCBNo;
                    patient2DB.Weight = patient2BO.Weight;
                    patient2DB.DrivingLicence = patient2BO.DrivingLicence;
                    patient2DB.EmergencyContactName = patient2BO.EmergenceyContactName;
                    patient2DB.EmergencyContactNumber = patient2BO.EmergenceyContactNumber;
                    patient2DB.EmergencyContactRelation = patient2BO.EmergenceyContactRelation;


                    patient2DB.IsDeleted = patient2BO.IsDeleted.HasValue ? patient2BO.IsDeleted : false;

                    locationDB = _context.Locations.Where(p => p.id == patient2BO.LocationID).FirstOrDefault();
                    if (locationDB != null)
                    {
                        patient2DB.LocationID = patient2BO.LocationID;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid User Location Id.", ErrorLevel = ErrorLevel.Error };
                    }

                    if (Add_patientDB == true)
                    {
                        patient2DB = _context.Patient2.Add(patient2DB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    dbContextTransaction.Rollback();
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Patient details.", ErrorLevel = ErrorLevel.Error };
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                patient2DB = _context.Patient2.Include("Location").Where(p => p.id == patient2DB.id).FirstOrDefault<Patient2>();
            }

            var res = Convert<BO.Patient2, Patient2>(patient2DB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            // Use SupressFinalize in case a subclass 
            // of this type implements a finalizer.
            GC.SuppressFinalize(this);
        }
    }
}