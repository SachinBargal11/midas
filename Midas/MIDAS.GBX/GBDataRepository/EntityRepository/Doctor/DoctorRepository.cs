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
    internal class DoctorRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Doctor> _dbSet;
        private DbSet<DoctorSpeciality> _dbSetDocSpecility;

        #region Constructor
        public DoctorRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSetDocSpecility = context.Set<DoctorSpeciality>();
            _dbSet = context.Set<Doctor>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Doctor doctor = entity as Doctor;

            if (doctor == null)
                return default(T);

            BO.Doctor doctorBO = new BO.Doctor();

            doctorBO.ID = doctor.Id;
            doctorBO.LicenseNumber = doctor.LicenseNumber;
            doctorBO.WCBAuthorization = doctor.WCBAuthorization;
            doctorBO.WcbRatingCode = doctor.WcbRatingCode;
            doctorBO.NPI = doctor.NPI;
            doctorBO.Title = doctor.Title;
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            BO.User boUser = new BO.User();
            using (UserRepository sr = new UserRepository(_context))
            {
                boUser = sr.Convert<BO.User, User>(doctor.User);
                doctorBO.user = boUser;
            }

            List<BO.DoctorSpeciality> lstDoctorSpecility = new List<BO.DoctorSpeciality>();
            foreach (var item in doctor.User.DoctorSpecialities)
            {
                using (DoctorSpecialityRepository sr = new DoctorSpecialityRepository(_context))
                {
                    lstDoctorSpecility.Add(sr.ObjectConvert<BO.DoctorSpeciality, DoctorSpeciality>(item));
                }
            }
           doctorBO.user.DoctorSpecialities = lstDoctorSpecility;

            return (T)(object)doctorBO;
        }
        #endregion
        #region Entity Conversion
        public override T ObjectConvert<T, U>(U entity)
        {
            Doctor doctor = entity as Doctor;

            if (doctor == null)
                return default(T);

            BO.Doctor doctorBO = new BO.Doctor();

            doctorBO.ID = doctor.Id;
            doctorBO.LicenseNumber = doctor.LicenseNumber;
            doctorBO.WCBAuthorization = doctor.WCBAuthorization;
            doctorBO.WcbRatingCode = doctor.WcbRatingCode;
            doctorBO.NPI = doctor.NPI;
            doctorBO.Title = doctor.Title;
            doctorBO.TaxType = (BO.GBEnums.TaxType)doctor.TaxType;

            if (doctor.IsDeleted.HasValue)
                doctorBO.IsDeleted = doctor.IsDeleted.Value;
            if (doctor.UpdateByUserID.HasValue)
                doctorBO.UpdateByUserID = doctor.UpdateByUserID.Value;

            return (T)(object)doctorBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Doctor doctor = (BO.Doctor)(object)entity;
            var result = doctor.Validate(doctor);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Doctor doctorBO = (BO.Doctor)(object)entity;
            BO.ErrorObject errObj = new BO.ErrorObject();
            BO.User userBO = new BO.User();
            Doctor doctorDB = new Doctor();
            User userDB = new User();
            List<DoctorSpeciality> lstDoctorSpecility = new List<DoctorSpeciality>();

            #region Doctor
            doctorDB.Id = doctorBO.ID;
            doctorDB.LicenseNumber = doctorBO.LicenseNumber;
            doctorDB.WCBAuthorization = doctorBO.WCBAuthorization;
            doctorDB.WcbRatingCode = doctorBO.WcbRatingCode;
            doctorDB.NPI = doctorBO.NPI;
            doctorDB.Title = doctorBO.Title;
            doctorDB.TaxType = System.Convert.ToByte(doctorBO.TaxType);
            doctorDB.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
            userDB.id = doctorBO.user.ID;
            #endregion

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                ////Find Record By ID
                User user_ = _context.Users.Include("UserCompanyRoles").Include("AddressInfo").Include("ContactInfo").Where(p => p.id == doctorBO.user.ID && p.UserCompanyRoles.Any(x => x.RoleID == (int)BO.GBEnums.RoleType.Doctor)).FirstOrDefault<User>();
                if (user_ != null)
                {                    
                    if (doctorBO.user.AddressInfo!=null && doctorBO.user.AddressInfo.ID > 0)
                    {
                        user_.AddressInfo.Name = string.IsNullOrEmpty(doctorBO.user.AddressInfo.Name)? user_.AddressInfo.Name: doctorBO.user.AddressInfo.Name;
                        user_.AddressInfo.Address1 = string.IsNullOrEmpty(doctorBO.user.AddressInfo.Address1) ? user_.AddressInfo.Address1 : doctorBO.user.AddressInfo.Address1;
                        user_.AddressInfo.Address2 = string.IsNullOrEmpty(doctorBO.user.AddressInfo.Address2) ? user_.AddressInfo.Address2 : doctorBO.user.AddressInfo.Address2;
                        user_.AddressInfo.City = string.IsNullOrEmpty(doctorBO.user.AddressInfo.City) ? user_.AddressInfo.City: doctorBO.user.AddressInfo.City;
                        user_.AddressInfo.State = string.IsNullOrEmpty(doctorBO.user.AddressInfo.State) ? user_.AddressInfo.State: doctorBO.user.AddressInfo.State;
                        user_.AddressInfo.ZipCode = string.IsNullOrEmpty(doctorBO.user.AddressInfo.ZipCode) ? user_.AddressInfo.ZipCode: doctorBO.user.AddressInfo.ZipCode;
                        user_.AddressInfo.Country = string.IsNullOrEmpty(doctorBO.user.AddressInfo.Country) ? user_.AddressInfo.Country : doctorBO.user.AddressInfo.Country;
                        //[STATECODE-CHANGE]
                        //user_.AddressInfo.StateCode = doctorBO.user.AddressInfo.StateCode;
                        //[STATECODE-CHANGE]
                        user_.AddressInfo.CreateByUserID = doctorBO.user.AddressInfo.CreateByUserID <=0 ? user_.AddressInfo.CreateByUserID : doctorBO.user.AddressInfo.CreateByUserID;                        
                    }

                    if (doctorBO.user.ContactInfo != null && doctorBO.user.ContactInfo.ID > 0)
                    {
                        user_.ContactInfo.Name = string.IsNullOrEmpty(doctorBO.user.ContactInfo.Name) ? user_.ContactInfo.Name : doctorBO.user.ContactInfo.Name;
                        user_.ContactInfo.CellPhone = string.IsNullOrEmpty(doctorBO.user.ContactInfo.CellPhone) ? user_.ContactInfo.CellPhone: doctorBO.user.ContactInfo.CellPhone;
                        user_.ContactInfo.EmailAddress = string.IsNullOrEmpty(doctorBO.user.ContactInfo.EmailAddress) ? user_.ContactInfo.EmailAddress : doctorBO.user.ContactInfo.EmailAddress;
                        user_.ContactInfo.HomePhone= string.IsNullOrEmpty(doctorBO.user.ContactInfo.HomePhone) ? user_.ContactInfo.HomePhone : doctorBO.user.ContactInfo.HomePhone;
                        user_.ContactInfo.WorkPhone = string.IsNullOrEmpty(doctorBO.user.ContactInfo.WorkPhone) ? user_.ContactInfo.WorkPhone : doctorBO.user.ContactInfo.WorkPhone;
                        user_.ContactInfo.FaxNo = string.IsNullOrEmpty(doctorBO.user.ContactInfo.FaxNo) ? user_.ContactInfo.FaxNo: doctorBO.user.ContactInfo.FaxNo;                        
                        //[STATECODE-CHANGE]
                        //user_.AddressInfo.StateCode = doctorBO.user.AddressInfo.StateCode;
                        //[STATECODE-CHANGE]
                        user_.ContactInfo.CreateByUserID = doctorBO.user.ContactInfo.CreateByUserID <= 0 ? user_.ContactInfo.CreateByUserID : doctorBO.user.ContactInfo.CreateByUserID;
                    }
                    doctorDB.User = user_;
                    _context.Entry(user_).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    BO.AddUser addUserBO = new BO.AddUser();
                    addUserBO.user = doctorBO.user;
                    addUserBO.user.DoctorSpecialities = doctorBO.user.DoctorSpecialities;
                    addUserBO.user.Roles = doctorBO.user.Roles;
                    addUserBO.company = doctorBO.user.UserCompanies.ToList().Select(p => p.Company).FirstOrDefault();
                    addUserBO.role = doctorBO.user.Roles.ToArray();
                    addUserBO.address = doctorBO.user.AddressInfo;
                    addUserBO.contactInfo = doctorBO.user.ContactInfo;
                    using (UserRepository userRepo = new UserRepository(_context))
                    {
                        object obj = userRepo.Save<BO.AddUser>(addUserBO);
                        if (obj.GetType() == errObj.GetType())
                        {
                            errObj = (BO.ErrorObject)obj;
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = errObj.ErrorMessage, errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        else userBO = (BO.User)obj;
                        doctorBO.user.ID = userBO.ID;
                        doctorDB.User = _context.Users.Include("UserCompanyRoles").Where(p => p.id == doctorBO.user.ID && p.UserCompanyRoles.Any(x => x.RoleID == (int)BO.GBEnums.RoleType.Doctor)).FirstOrDefault<User>();
                    }
                }

                if (doctorBO.user.DoctorSpecialities.Count > 0)
                {
                    _dbSetDocSpecility.RemoveRange(_context.DoctorSpecialities.Where(c => c.DoctorID == doctorBO.user.ID));
                    _context.SaveChanges();
                    Specialty specilityDB = null;
                    DoctorSpeciality doctorSpecilityDB = null;
                    foreach (var item in doctorBO.user.DoctorSpecialities)
                    {
                        BO.DoctorSpeciality doctorSpecialityBO = (BO.DoctorSpeciality)(object)item;
                        specilityDB = new Specialty();
                        doctorSpecilityDB = new DoctorSpeciality();
                        doctorSpecilityDB.IsDeleted = doctorSpecialityBO.IsDeleted.HasValue ? doctorSpecialityBO.IsDeleted.Value : false;
                        doctorSpecilityDB.User = user_;
                        //Find Record By ID
                        Specialty speclity = _context.Specialties.Where(p => p.id == doctorSpecialityBO.ID).FirstOrDefault<Specialty>();
                        if (speclity == null)
                        {
                            dbContextTransaction.Rollback();
                            return new BO.ErrorObject { ErrorMessage = "Invalid specility " + item.ToString() + " details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                        }
                        if (!lstDoctorSpecility.Select(p => p.Specialty).Contains(speclity))
                        {
                            doctorSpecilityDB.Specialty = speclity;
                            _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;
                            lstDoctorSpecility.Add(doctorSpecilityDB);
                        };
                    }
                }
                doctorDB.User.DoctorSpecialities = lstDoctorSpecility;

                if (doctorDB.Id > 0)
                {
                    //Find Doctor By ID
                    Doctor doctor = _context.Doctors.Where(p => p.Id == doctorDB.Id).FirstOrDefault<Doctor>();

                    if (doctor != null)
                    {
                        #region Doctor
                        doctor.LicenseNumber = doctorBO.LicenseNumber != null ? doctorBO.LicenseNumber : doctor.LicenseNumber;
                        doctor.WCBAuthorization = doctorBO.WCBAuthorization != null ? doctorBO.WCBAuthorization : doctor.WCBAuthorization;
                        doctor.WcbRatingCode = doctorBO.WcbRatingCode != null ? doctorBO.WcbRatingCode : doctor.WcbRatingCode;
                        doctor.NPI = doctorBO.NPI != null ? doctorBO.NPI : doctor.NPI;
                        doctor.Title = doctorBO.Title != null ? doctorBO.Title : doctor.Title;
                        doctor.TaxType = System.Convert.ToByte(doctorBO.TaxType);
                        doctor.IsDeleted = doctorBO.IsDeleted.HasValue ? doctorBO.IsDeleted : false;
                        doctor.UpdateDate = doctorBO.UpdateDate;
                        doctor.UpdateByUserID = doctorBO.UpdateByUserID;
                        #endregion

                        _context.Entry(doctor).State = System.Data.Entity.EntityState.Modified;
                    }
                    else
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { ErrorMessage = "Please pass valid doctor details.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                }
                else
                {
                    doctorDB.CreateDate = doctorBO.CreateDate;
                    doctorDB.CreateByUserID = doctorBO.CreateByUserID;

                    _dbSet.Add(doctorDB);
                }
                _context.SaveChanges();
                dbContextTransaction.Commit();
            }
            var res = Convert<BO.Doctor, Doctor>(doctorDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Doctor doctorBO = entity as BO.Doctor;

            Doctor doctorDB = new Doctor();
            doctorDB.Id = doctorBO.ID;
            _dbSet.Remove(_context.Doctors.Single<Doctor>(p => p.Id == doctorBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return doctorBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            //BO.Doctor acc_ = Convert<BO.Doctor, Doctor>(_context.Doctors.Include("User").Include("User.UserCompanyRoles").Where(p => p.Id == id && p.IsDeleted == false).Include(a => a.User.DoctorSpecialities).FirstOrDefault<Doctor>());
            //if (acc_ == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}

            Doctor doctorDB = _context.Doctors.Include("User")
                                              .Include("User.AddressInfo")
                                              .Include("User.ContactInfo")
                                              .Include("User.DoctorSpecialities")
                                              .Include("User.DoctorSpecialities.Specialty")
                                              .Include("User.UserCompanyRoles").Where(p => p.Id == id && p.IsDeleted == false).Include(a => a.User.DoctorSpecialities).FirstOrDefault<Doctor>();

            BO.Doctor doctorBO = new BO.Doctor();

            if (doctorDB == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Doctor.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                doctorBO = Convert<BO.Doctor, Doctor>(doctorDB);
            }

            return (object)doctorBO;
        }
        #endregion

        #region GetAll
        public override object Get()
        {
            //BO.Doctor doctorBO = (BO.Doctor)(object)entity;

            var acc_ = _context.Doctors.Include("User").Include("User.UserCompanyRoles").Where(p => p.IsDeleted == false || p.IsDeleted == null).Include(a => a.User.DoctorSpecialities).ToList<Doctor>();
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            List<BO.Doctor> lstDoctors = new List<BO.Doctor>();
            foreach (Doctor item in acc_)
            {
                lstDoctors.Add(Convert<BO.Doctor, Doctor>(item));
            }
            return lstDoctors;
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
