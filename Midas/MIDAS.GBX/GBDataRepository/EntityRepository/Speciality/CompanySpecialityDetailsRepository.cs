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
    internal class CompanySpecialityDetailsRepository : BaseEntityRepo
    {
        private DbSet<CompanySpecialtyDetail> _dbSet;
        #region Constructor
        public CompanySpecialityDetailsRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<CompanySpecialtyDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            CompanySpecialtyDetail companyspecialtydetail = entity as CompanySpecialtyDetail;

            if (companyspecialtydetail == null)
                return default(T);

            BO.CompanySpecialtyDetails companyspecialtyDetailBO = new BO.CompanySpecialtyDetails();

            companyspecialtyDetailBO.ID = companyspecialtydetail.id;
            if (companyspecialtydetail.ReevalDays.HasValue)
                companyspecialtyDetailBO.ReevalDays = companyspecialtydetail.ReevalDays.Value;
            if (companyspecialtydetail.ReevalVisitCount.HasValue)
                companyspecialtyDetailBO.ReevalVisitCount = companyspecialtydetail.ReevalVisitCount.Value;
            if (companyspecialtydetail.InitialDays.HasValue)
                companyspecialtyDetailBO.InitialDays = companyspecialtydetail.InitialDays.Value;
            if (companyspecialtydetail.InitialVisitCount.HasValue)
                companyspecialtyDetailBO.InitialVisitCount = companyspecialtydetail.InitialVisitCount.Value;
            if (companyspecialtydetail.MaxReval.HasValue)
                companyspecialtyDetailBO.MaxReval = companyspecialtydetail.MaxReval.Value;
            if (companyspecialtydetail.IsInitialEvaluation.HasValue)
                companyspecialtyDetailBO.IsInitialEvaluation = companyspecialtydetail.IsInitialEvaluation.Value;
            if (companyspecialtydetail.Include1500.HasValue)
                companyspecialtyDetailBO.Include1500 = companyspecialtydetail.Include1500.Value;
            if (companyspecialtydetail.AllowMultipleVisit.HasValue)
                companyspecialtyDetailBO.AllowMultipleVisit = companyspecialtydetail.AllowMultipleVisit.Value;
            if (companyspecialtydetail.IsDeleted.HasValue)
                companyspecialtyDetailBO.IsDeleted = companyspecialtydetail.IsDeleted.Value;
            if (companyspecialtydetail.UpdateByUserID.HasValue)
                companyspecialtyDetailBO.UpdateByUserID = companyspecialtydetail.UpdateByUserID.Value;
            if (companyspecialtydetail.UpdateDate.HasValue)
                companyspecialtyDetailBO.UpdateDate = companyspecialtydetail.UpdateDate.Value;

            BO.Specialty boSpecialty = new BO.Specialty();
            using (SpecialityRepository sr = new SpecialityRepository(_context))
            {
                boSpecialty = sr.Convert<BO.Specialty, Specialty>(companyspecialtydetail.Specialty);
                companyspecialtyDetailBO.Specialty = boSpecialty;
            }

            BO.Company boCompany = new BO.Company();
            using (CompanyRepository cmp = new CompanyRepository(_context))
            {
                boCompany = cmp.Convert<BO.Company, Company>(companyspecialtydetail.Company);
                companyspecialtyDetailBO.Company = boCompany;
            }
            return (T)(object)companyspecialtyDetailBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Specialty companyspecialtydetail = (BO.Specialty)(object)entity;
            var result = companyspecialtydetail.Validate(companyspecialtydetail);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.CompanySpecialtyDetails companyspecialtyDetailBO = (BO.CompanySpecialtyDetails)(object)entity;

            CompanySpecialtyDetail companyspeclityDetailDB = new CompanySpecialtyDetail();

            if (companyspecialtyDetailBO.Specialty == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Specialty object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            if (companyspecialtyDetailBO.Company == null)
            {
                return new BO.ErrorObject { ErrorMessage = "Company object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            BO.Company companyBO = companyspecialtyDetailBO.Company;
            BO.Specialty specilityBO = companyspecialtyDetailBO.Specialty;
            #region Specialty
            companyspeclityDetailDB.id = companyspecialtyDetailBO.ID;
            companyspeclityDetailDB.ReevalDays = companyspecialtyDetailBO.ReevalDays;
            companyspeclityDetailDB.ReevalVisitCount = companyspecialtyDetailBO.ReevalVisitCount;
            companyspeclityDetailDB.InitialDays = companyspecialtyDetailBO.InitialDays;
            companyspeclityDetailDB.InitialVisitCount = companyspecialtyDetailBO.InitialVisitCount;
            companyspeclityDetailDB.MaxReval = companyspecialtyDetailBO.MaxReval;
            companyspeclityDetailDB.IsInitialEvaluation = companyspecialtyDetailBO.IsInitialEvaluation;
            companyspeclityDetailDB.Include1500 = companyspecialtyDetailBO.Include1500;
            companyspeclityDetailDB.AllowMultipleVisit = companyspecialtyDetailBO.AllowMultipleVisit;
            companyspeclityDetailDB.IsDeleted = companyspecialtyDetailBO.IsDeleted;
            #endregion

            #region Specialty
            if (specilityBO.ID > 0)
            {
                Specialty speclity = _context.Specialties.Where(p => p.id == specilityBO.ID).FirstOrDefault<Specialty>();
                if (speclity != null)
                {
                    companyspeclityDetailDB.Specialty = speclity;
                    _context.Entry(speclity).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Speclity details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion

            #region Company
            if (companyBO.ID > 0)
            {
                Company company = _context.Companies.Where(p => p.id == companyBO.ID).FirstOrDefault<Company>();
                if (company != null)
                {
                    companyspeclityDetailDB.Company = company;
                    _context.Entry(company).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid Company details.", ErrorLevel = ErrorLevel.Error };
            }
            #endregion


            if (companyspeclityDetailDB.id > 0)
            {

                //Find Specialty By ID
                CompanySpecialtyDetail companyspecialtydetail = _context.CompanySpecialtyDetails.Where(p => p.id == companyspeclityDetailDB.id).FirstOrDefault<CompanySpecialtyDetail>();

                if (companyspecialtydetail != null)
                {
                    #region Specialty
                    companyspeclityDetailDB.ReevalDays = companyspecialtyDetailBO.ReevalDays != null ? companyspecialtyDetailBO.ReevalDays : companyspecialtydetail.ReevalDays;
                    companyspeclityDetailDB.ReevalVisitCount = companyspecialtyDetailBO.ReevalVisitCount != null ? companyspecialtyDetailBO.ReevalVisitCount : companyspecialtydetail.ReevalVisitCount;
                    companyspeclityDetailDB.InitialDays = companyspecialtyDetailBO.InitialDays != null ? companyspecialtyDetailBO.InitialDays : companyspecialtydetail.InitialDays;
                    companyspeclityDetailDB.InitialVisitCount = companyspecialtyDetailBO.InitialVisitCount != null ? companyspecialtyDetailBO.InitialVisitCount : companyspecialtydetail.InitialVisitCount;
                    companyspeclityDetailDB.MaxReval = companyspecialtyDetailBO.MaxReval != null ? companyspecialtyDetailBO.MaxReval : companyspecialtydetail.MaxReval;
                    companyspeclityDetailDB.IsInitialEvaluation = companyspecialtyDetailBO.IsDeleted != null ? companyspecialtyDetailBO.IsDeleted : companyspecialtydetail.IsDeleted;
                    companyspeclityDetailDB.Include1500 = companyspecialtyDetailBO.IsDeleted != null ? companyspecialtyDetailBO.IsDeleted : companyspecialtydetail.IsDeleted;
                    companyspeclityDetailDB.AllowMultipleVisit = companyspecialtyDetailBO.IsDeleted != null ? companyspecialtyDetailBO.IsDeleted : companyspecialtydetail.IsDeleted;
                    companyspeclityDetailDB.IsDeleted = companyspecialtyDetailBO.IsDeleted != null ? companyspecialtyDetailBO.IsDeleted : companyspecialtydetail.IsDeleted;
                    companyspecialtydetail.IsDeleted = companyspecialtyDetailBO.IsDeleted != null ? companyspecialtyDetailBO.IsDeleted : companyspecialtydetail.IsDeleted;
                    companyspecialtydetail.UpdateDate = DateTime.UtcNow;
                    companyspecialtydetail.UpdateByUserID = companyspecialtyDetailBO.UpdateByUserID;
                    #endregion

                    _context.Entry(companyspecialtydetail).State = System.Data.Entity.EntityState.Modified;
                }

            }
            else
            {
                companyspeclityDetailDB.CreateDate = DateTime.UtcNow;
                companyspeclityDetailDB.CreateByUserID = companyspecialtyDetailBO.CreateByUserID;

                _dbSet.Add(companyspeclityDetailDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.CompanySpecialtyDetails, CompanySpecialtyDetail>(companyspeclityDetailDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.CompanySpecialtyDetails companyspecialtyDetailBO = entity as BO.CompanySpecialtyDetails;

            CompanySpecialtyDetail companyspeclityDetailDB = new CompanySpecialtyDetail();
            companyspeclityDetailDB.id = companyspecialtyDetailBO.ID;
            _dbSet.Remove(_context.CompanySpecialtyDetails.Single<CompanySpecialtyDetail>(p => p.id == companyspecialtyDetailBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return companyspecialtyDetailBO;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.CompanySpecialtyDetails acc_ = Convert<BO.CompanySpecialtyDetails, CompanySpecialtyDetail>(_context.CompanySpecialtyDetails.Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<CompanySpecialtyDetail>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Specialty detail.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion


        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.CompanySpecialtyDetails> lstSpecialties = new List<BO.CompanySpecialtyDetails>();
            BO.CompanySpecialtyDetails companyspecialtyDetailBO = (BO.CompanySpecialtyDetails)(object)entity;
            if (companyspecialtyDetailBO == null)
            {
                if (companyspecialtyDetailBO.Specialty != null)
                {
                    var acc_ = _context.CompanySpecialtyDetails.Include("Specialty").Where(p => p.IsDeleted == false || p.IsDeleted == null && p.SpecialtyId == companyspecialtyDetailBO.Specialty.ID).ToList<CompanySpecialtyDetail>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (CompanySpecialtyDetail item in acc_)
                    {
                        lstSpecialties.Add(Convert<BO.CompanySpecialtyDetails, CompanySpecialtyDetail>(item));
                    }
                }
                else
                {
                    var acc_ = _context.CompanySpecialtyDetails.Include("Specialty").Where(p => p.IsDeleted == false || p.IsDeleted == null).ToList<CompanySpecialtyDetail>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (CompanySpecialtyDetail item in acc_)
                    {
                        lstSpecialties.Add(Convert<BO.CompanySpecialtyDetails, CompanySpecialtyDetail>(item));
                    }
                }
            }

            return lstSpecialties;
        }
        #endregion

    }
}
