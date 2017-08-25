﻿using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using System.Configuration;
using MIDAS.GBX.DataRepository.EntityRepository.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class PatientVisitUnscheduledRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<PatientVisitUnscheduled> _dbPatientVisitUnscheduled;

        public PatientVisitUnscheduledRepository(MIDASGBXEntities context) : base(context)
        {
            _dbPatientVisitUnscheduled = context.Set<PatientVisitUnscheduled>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            if (entity is PatientVisitUnscheduled)
            {
                PatientVisitUnscheduled PatientVisitUnscheduledDB = entity as PatientVisitUnscheduled;

                if (PatientVisitUnscheduledDB == null)
                    return default(T);

                BO.PatientVisitUnscheduled PatientVisitUnscheduledBO = new BO.PatientVisitUnscheduled();
                PatientVisitUnscheduledBO.ID = PatientVisitUnscheduledDB.Id;
                PatientVisitUnscheduledBO.CaseId = PatientVisitUnscheduledDB.CaseId;
                PatientVisitUnscheduledBO.PatientId = PatientVisitUnscheduledDB.PatientId;
                PatientVisitUnscheduledBO.EventStart = PatientVisitUnscheduledDB.EventStart;
                PatientVisitUnscheduledBO.MedicalProviderName = PatientVisitUnscheduledDB.MedicalProviderName;
                PatientVisitUnscheduledBO.DoctorName = PatientVisitUnscheduledDB.DoctorName;
                PatientVisitUnscheduledBO.Notes = PatientVisitUnscheduledDB.Notes;

                PatientVisitUnscheduledBO.IsDeleted = PatientVisitUnscheduledDB.IsDeleted;
                PatientVisitUnscheduledBO.CreateByUserID = PatientVisitUnscheduledDB.CreateByUserID;
                PatientVisitUnscheduledBO.UpdateByUserID = PatientVisitUnscheduledDB.UpdateByUserID;

                if (PatientVisitUnscheduledDB.Patient != null)
                {
                    BO.Patient PatientBO = new BO.Patient();
                    using (PatientRepository patientRepo = new PatientRepository(_context))
                    {
                        PatientBO = patientRepo.Convert<BO.Patient, Patient>(PatientVisitUnscheduledDB.Patient);
                        PatientVisitUnscheduledBO.Patient = PatientBO;
                    }
                }

                if (PatientVisitUnscheduledDB.Case != null)
                {
                    BO.Case CaseBO = new BO.Case();
                    using (CaseRepository caseRepo = new CaseRepository(_context))
                    {
                        CaseBO = caseRepo.Convert<BO.Case, Case>(PatientVisitUnscheduledDB.Case);
                        PatientVisitUnscheduledBO.Case = CaseBO;

                        if (PatientVisitUnscheduledDB.Case.PatientAccidentInfoes != null && PatientVisitUnscheduledDB.Case.PatientAccidentInfoes.Count > 0)
                        {
                            List<BO.PatientAccidentInfo> PatientAccidentInfoBOList = new List<BO.PatientAccidentInfo>();
                            using (PatientAccidentInfoRepository patientAccidentInfoRepo = new PatientAccidentInfoRepository(_context))
                            {
                                foreach (PatientAccidentInfo eachPatientInsuranceInfo in PatientVisitUnscheduledDB.Case.PatientAccidentInfoes)
                                {
                                    if (eachPatientInsuranceInfo.IsDeleted.HasValue == false || (eachPatientInsuranceInfo.IsDeleted.HasValue == true && eachPatientInsuranceInfo.IsDeleted.Value == false))
                                    {
                                        PatientAccidentInfoBOList.Add(patientAccidentInfoRepo.Convert<BO.PatientAccidentInfo, PatientAccidentInfo>(eachPatientInsuranceInfo));
                                    }
                                }

                                PatientVisitUnscheduledBO.Case.PatientAccidentInfoes = PatientAccidentInfoBOList;
                            }
                        }
                    }
                }

                return (T)(object)PatientVisitUnscheduledBO;
            }            

            return default(T);
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.PatientVisitUnscheduled PatientVisitUnscheduledBO = (BO.PatientVisitUnscheduled)(object)entity;
            var result = PatientVisitUnscheduledBO.Validate(PatientVisitUnscheduledBO);
            return result;
        }
        #endregion

        #region save
        public override object Save<T>(T entity)
        {
            BO.PatientVisitUnscheduled PatientVisitUnscheduledBO = (BO.PatientVisitUnscheduled)(object)entity;
            PatientVisitUnscheduled PatientVisitUnscheduledDB = new PatientVisitUnscheduled();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {                
                bool IsEditMode = false;
                IsEditMode = (PatientVisitUnscheduledBO != null && PatientVisitUnscheduledBO.ID > 0) ? true : false;

                #region Patient Visit Unscheduled
                if (PatientVisitUnscheduledBO != null
                    && ((PatientVisitUnscheduledBO.ID <= 0 && PatientVisitUnscheduledBO.PatientId.HasValue == true && PatientVisitUnscheduledBO.CaseId.HasValue == true)
                        || (PatientVisitUnscheduledBO.ID > 0)))
                {
                    bool Add_patientVisitUnscheduledDB = false;
                    PatientVisitUnscheduledDB = _context.PatientVisitUnscheduleds.Where(p => p.Id == PatientVisitUnscheduledBO.ID
                                                                    && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                            .FirstOrDefault();

                    if (PatientVisitUnscheduledDB == null && PatientVisitUnscheduledBO.ID <= 0)
                    {
                        PatientVisitUnscheduledDB = new PatientVisitUnscheduled();
                        Add_patientVisitUnscheduledDB = true;
                    }
                    else if (PatientVisitUnscheduledDB == null && PatientVisitUnscheduledBO.ID > 0)
                    {
                        dbContextTransaction.Rollback();
                        return new BO.ErrorObject { errorObject = "", ErrorMessage = "Unscheduled Patient Visit doesn't exists.", ErrorLevel = ErrorLevel.Error };
                    }

                    PatientVisitUnscheduledDB.CaseId = IsEditMode == true && PatientVisitUnscheduledBO.CaseId.HasValue == false ? PatientVisitUnscheduledDB.CaseId : (PatientVisitUnscheduledBO.CaseId.HasValue == false ? PatientVisitUnscheduledDB.CaseId : PatientVisitUnscheduledBO.CaseId.Value);
                    PatientVisitUnscheduledDB.PatientId = IsEditMode == true && PatientVisitUnscheduledBO.PatientId.HasValue == false ? PatientVisitUnscheduledDB.PatientId : (PatientVisitUnscheduledBO.PatientId.HasValue == false ? PatientVisitUnscheduledDB.PatientId : PatientVisitUnscheduledBO.PatientId.Value);
                    
                    PatientVisitUnscheduledDB.EventStart = PatientVisitUnscheduledBO.EventStart;
                    PatientVisitUnscheduledDB.MedicalProviderName = PatientVisitUnscheduledBO.MedicalProviderName;
                    PatientVisitUnscheduledDB.DoctorName = PatientVisitUnscheduledBO.DoctorName;

                    PatientVisitUnscheduledDB.Notes = PatientVisitUnscheduledBO.Notes;

                    if (IsEditMode == false)
                    {
                        PatientVisitUnscheduledDB.CreateByUserID = PatientVisitUnscheduledBO.CreateByUserID;
                        PatientVisitUnscheduledDB.CreateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        PatientVisitUnscheduledDB.UpdateByUserID = PatientVisitUnscheduledBO.UpdateByUserID;
                        PatientVisitUnscheduledDB.UpdateDate = DateTime.UtcNow;
                    }

                    if (Add_patientVisitUnscheduledDB == true)
                    {
                        PatientVisitUnscheduledDB = _context.PatientVisitUnscheduleds.Add(PatientVisitUnscheduledDB);
                    }
                    _context.SaveChanges();                    
                }
                #endregion

                dbContextTransaction.Commit();


                if (PatientVisitUnscheduledDB != null)
                {
                    PatientVisitUnscheduledDB = _context.PatientVisitUnscheduleds
                                                        .Include("Patient").Include("Patient.User").Include("Patient.User.UserCompanies")
                                                        .Where(p => p.Id == PatientVisitUnscheduledDB.Id
                                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                        .FirstOrDefault<PatientVisitUnscheduled>();
                }
            }

            var res = Convert<BO.PatientVisitUnscheduled, PatientVisitUnscheduled>(PatientVisitUnscheduledDB);
            return (object)res;
        }
        #endregion

        #region Get By Case Id
        public override object GetByCaseId(int CaseId)
        {
            var acc = _context.PatientVisitUnscheduleds.Include("Patient")
                                                       .Include("Patient.User")                                            
                                                       .Where(p => p.CaseId == CaseId
                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                       .ToList<PatientVisitUnscheduled>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this Case Id.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            else
            {
                List<BO.PatientVisitUnscheduled> lstpatientvisit = new List<BO.PatientVisitUnscheduled>();
                foreach (PatientVisitUnscheduled item in acc)
                {
                    lstpatientvisit.Add(Convert<BO.PatientVisitUnscheduled, PatientVisitUnscheduled>(item));
                }
                return lstpatientvisit;
            }
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}