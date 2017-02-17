﻿using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository.common
{
    internal class CaseInsuranceMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseInsuranceMapping> _dbCaseInsuranceMapping;

        public CaseInsuranceMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCaseInsuranceMapping = context.Set<CaseInsuranceMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        //#region Entity Conversion
        //public override T Convert<T, U>(U entity)
        //{
        //    //Case cases = entity as Case;

        //    //if (cases == null)
        //    //    return default(T);

        //    //BO.Case caseBO = new BO.Case();

        //    //caseBO.ID = cases.Id;
        //    //caseBO.PatientId = cases.PatientId;
        //    //caseBO.CaseName = cases.CaseName;
        //    //caseBO.CaseTypeId = cases.CaseTypeId;
        //    //caseBO.LocationId = cases.LocationId;
        //    //caseBO.PatientEmpInfoId = cases.PatientEmpInfoId;
        //    //caseBO.CarrierCaseNo = cases.CarrierCaseNo;
        //    //caseBO.Transportation = cases.Transportation;
        //    //caseBO.CaseStatusId = cases.CaseStatusId;
        //    //caseBO.AttorneyId = cases.AttorneyId;

        //    //caseBO.IsDeleted = cases.IsDeleted;
        //    //caseBO.CreateByUserID = cases.CreateByUserID;
        //    //caseBO.UpdateByUserID = cases.UpdateByUserID;

        //    //BO.PatientEmpInfo boPatientEmpInfo = new BO.PatientEmpInfo();
        //    //using (PatientEmpInfoRepository cmp = new PatientEmpInfoRepository(_context))
        //    //{

        //    //    boPatientEmpInfo = cmp.Convert<BO.PatientEmpInfo, PatientEmpInfo>(cases.PatientEmpInfo);
        //    //    caseBO.PatientEmpInfo = boPatientEmpInfo;
        //    //}


        //    //return (T)(object)caseBO;
        //}
        //#endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.CaseInsuranceMapping cases = (BO.CaseInsuranceMapping)(object)entity;
            var result = cases.Validate(cases);
            return result;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            var acc = _context.CaseInsuranceMappings.Include("PatientInsuranceInfo")
                                    .Where(p => p.Id == id)
                                    .FirstOrDefault<CaseInsuranceMapping>();

            BO.CaseInsuranceMapping acc_ = Convert<BO.CaseInsuranceMapping, CaseInsuranceMapping>(acc);

            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            return (object)acc_;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.CaseInsuranceMappings.Include("PatientInsuranceInfo")
                                    .Where(p => p.CaseId == CaseId)
                                    .ToList<CaseInsuranceMapping>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            List<BO.CaseInsuranceMapping> lstcaseinsurancemappings = new List<BO.CaseInsuranceMapping>();
            foreach (CaseInsuranceMapping item in acc)
            {
                lstcaseinsurancemappings.Add(Convert<BO.CaseInsuranceMapping, CaseInsuranceMapping>(item));
            }

            return lstcaseinsurancemappings;
        }
        #endregion 


        #region save
        public override object Save<T>(T entity)
        {
            BO.Case caseBO = (BO.Case)(object)entity;
            BO.Location locationBO = new BO.Location();


            Case caseDB = new Case();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                Patient2 patient2DB = new Patient2();
                Location locationDB = new Location();

                bool IsEditMode = false;
                IsEditMode = (caseBO != null && caseBO.ID > 0) ? true : false;

                #region case
                if (caseBO != null)
                {
                    bool Add_caseDB = false;
                    caseDB = _context.Cases.Where(p => p.Id == caseBO.ID).FirstOrDefault();

                    if (caseDB == null && caseBO.ID <= 0)
                    {
                        caseDB = new Case();
                        Add_caseDB = true;
                    }
                    else if (caseDB == null && caseBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Case dosent exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    caseDB.PatientId = caseBO.PatientId;
                    caseDB.CaseName = IsEditMode == true && caseBO.CaseName == null ? caseDB.CaseName : caseBO.CaseName;
                    caseDB.CaseTypeId = IsEditMode == true && caseBO.CaseTypeId == null ? caseDB.CaseTypeId : caseBO.CaseTypeId;
                    caseDB.LocationId = IsEditMode == true && caseBO.LocationId.HasValue == false ? caseDB.LocationId : caseBO.LocationId.Value;
                    caseDB.PatientEmpInfoId = IsEditMode == true && caseBO.PatientEmpInfoId.HasValue == false ? caseDB.PatientEmpInfoId : caseBO.PatientEmpInfoId.Value;
                    caseDB.CarrierCaseNo = IsEditMode == true && caseBO.CarrierCaseNo == null ? caseDB.CarrierCaseNo : caseBO.CarrierCaseNo;
                    caseDB.Transportation = IsEditMode == true && caseBO.Transportation.HasValue == false ? caseDB.Transportation : caseBO.Transportation.Value;
                    caseDB.CaseStatusId = IsEditMode == true && caseBO.CaseStatusId.HasValue == false ? caseDB.CaseStatusId : caseBO.CaseStatusId.Value;
                    caseDB.AttorneyId = IsEditMode == true && caseBO.AttorneyId.HasValue == false ? caseDB.AttorneyId : caseBO.AttorneyId.Value;

                    if (Add_caseDB == true)
                    {
                        caseDB = _context.Cases.Add(caseDB);
                    }
                    _context.SaveChanges();
                }
                else
                {
                    if (IsEditMode == false)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Please pass valid case details.", ErrorLevel = ErrorLevel.Error };
                    }
                    caseDB = null;
                }

                _context.SaveChanges();
                #endregion

                dbContextTransaction.Commit();

                caseDB = _context.Cases.Include("PatientEmpInfo")
                                       .Include("PatientEmpInfo.AddressInfo")
                                       .Include("PatientEmpInfo.ContactInfo")
                                       .Where(p => p.Id == caseDB.Id).FirstOrDefault<Case>();
            }

            var res = Convert<BO.Case, Case>(caseDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object DeleteById(int id)
        {
            var acc = _context.Cases.Include("PatientEmpInfo")
                                    .Include("PatientEmpInfo.AddressInfo")
                                    .Include("PatientEmpInfo.ContactInfo")
                                    .Where(p => p.Id == id
                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<Case>();
            if (acc != null)
            {
                if (acc.PatientEmpInfo != null)
                {
                    acc.PatientEmpInfo.IsDeleted = true;
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                if (acc.PatientEmpInfo.AddressInfo != null)
                {
                    acc.PatientEmpInfo.AddressInfo.IsDeleted = true;
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                if (acc.PatientEmpInfo.ContactInfo != null)
                {
                    acc.PatientEmpInfo.ContactInfo.IsDeleted = true;
                }
                else
                {
                    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.Case, Case>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
