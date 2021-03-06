﻿using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.DataRepository.Model;
using System.Data.Entity;
using BO = MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataRepository.EntityRepository.Common;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class CaseInsuranceMappingRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<CaseInsuranceMapping> _dbCaseInsuranceMapping;

        public CaseInsuranceMappingRepository(MIDASGBXEntities context) : base(context)
        {
            _dbCaseInsuranceMapping = context.Set<CaseInsuranceMapping>();
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            List<CaseInsuranceMapping> CaseInsuranceMappings = entity as List<CaseInsuranceMapping>;

            if (CaseInsuranceMappings == null)
                return default(T);

            BO.CaseInsuranceMapping CaseInsuranceMappingBO = new BO.CaseInsuranceMapping();
            if (CaseInsuranceMappings.Count > 0)
            {
                CaseInsuranceMappingBO.CaseId = CaseInsuranceMappings[0].CaseId;
            }
           
            //List<BO.PatientInsuranceInfo> lstPatientInsuranceInfo = new List<BO.PatientInsuranceInfo>();
            //foreach (var item in CaseInsuranceMappings)
            //{
            //    using (PatientInsuranceInfoRepository sr = new PatientInsuranceInfoRepository(_context))
            //    {
            //        lstPatientInsuranceInfo.Add(sr.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(item.PatientInsuranceInfo));
            //    }
            //}

            //CaseInsuranceMappingBO.PatientInsuranceInfos = lstPatientInsuranceInfo;

            List<BO.Mapping> Mappings = new List<BO.Mapping>();
            foreach (var item in CaseInsuranceMappings)
            {
                BO.PatientInsuranceInfo patientInsuranceInfo = new BO.PatientInsuranceInfo();
                using (PatientInsuranceInfoRepository sr = new PatientInsuranceInfoRepository(_context))
                {
                    patientInsuranceInfo = sr.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(item.PatientInsuranceInfo);
                }

                BO.AdjusterMaster adjusterMaster = new BO.AdjusterMaster();
                using (AdjusterMasterRepository sr = new AdjusterMasterRepository(_context))
                {
                    adjusterMaster = sr.Convert<BO.AdjusterMaster, AdjusterMaster>(item.AdjusterMaster);
                }

                Mappings.Add(new BO.Mapping() { Id= item.Id, PatientInsuranceInfo = patientInsuranceInfo, AdjusterMaster = adjusterMaster });
            }

            CaseInsuranceMappingBO.Mappings = Mappings;

            return (T)(object)CaseInsuranceMappingBO;
        }
        #endregion

        #region Entity objectConvert
        public override T ObjectConvert<T, U>(U entity)
        {
            CaseInsuranceMapping CaseInsuranceMappings = entity as CaseInsuranceMapping;

            if (CaseInsuranceMappings == null)
                return default(T);

            BO.CaseInsuranceMapping CaseInsuranceMappingBO = new BO.CaseInsuranceMapping();
            CaseInsuranceMappingBO.ID = CaseInsuranceMappings.Id;
            CaseInsuranceMappingBO.CaseId = CaseInsuranceMappings.CaseId;
            //CaseInsuranceMappingBO.PatientInsuranceInfos = new List<BO.PatientInsuranceInfo>();

            //using (PatientInsuranceInfoRepository sr = new PatientInsuranceInfoRepository(_context))
            //{                
            //    CaseInsuranceMappingBO.PatientInsuranceInfos.Add(sr.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(CaseInsuranceMappings.PatientInsuranceInfo));
            //}

            BO.PatientInsuranceInfo patientInsuranceInfo = new BO.PatientInsuranceInfo();
            using (PatientInsuranceInfoRepository sr = new PatientInsuranceInfoRepository(_context))
            {
                patientInsuranceInfo = sr.Convert<BO.PatientInsuranceInfo, PatientInsuranceInfo>(CaseInsuranceMappings.PatientInsuranceInfo);
            }

            BO.AdjusterMaster adjusterMaster = new BO.AdjusterMaster();
            using (AdjusterMasterRepository sr = new AdjusterMasterRepository(_context))
            {
                adjusterMaster = sr.Convert<BO.AdjusterMaster, AdjusterMaster>(CaseInsuranceMappings.AdjusterMaster);
            }

            List<BO.Mapping> Mappings = new List<BO.Mapping>();
            Mappings.Add(new BO.Mapping() { Id= CaseInsuranceMappings.Id, PatientInsuranceInfo = patientInsuranceInfo, AdjusterMaster = adjusterMaster });
            CaseInsuranceMappingBO.Mappings = Mappings;

            return (T)(object)CaseInsuranceMappingBO;
        }
        #endregion

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
                                     .Include("AdjusterMaster")
                                    .Where(p => p.Id == id
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .FirstOrDefault<CaseInsuranceMapping>();

            BO.CaseInsuranceMapping acc_ = ObjectConvert<BO.CaseInsuranceMapping, CaseInsuranceMapping>(acc);

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
            var acc = _context.CaseInsuranceMappings.Include("PatientInsuranceInfo.InsuranceType")
                                    .Include("PatientInsuranceInfo.InsuranceMaster")
                                    .Include("AdjusterMaster")
                                    .Where(p => p.CaseId == CaseId
                                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                    .ToList<CaseInsuranceMapping>();

            if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            //List<BO.CaseInsuranceMapping> lstcaseinsurancemappings = new List<BO.CaseInsuranceMapping>();
            //foreach (CaseInsuranceMapping item in acc)
            //{
            //    lstcaseinsurancemappings.Add(ObjectConvert<BO.CaseInsuranceMapping, CaseInsuranceMapping>(item));
            //}

            BO.CaseInsuranceMapping caseinsurancemappings = new BO.CaseInsuranceMapping();
            caseinsurancemappings = Convert<BO.CaseInsuranceMapping, List<CaseInsuranceMapping>>(acc);

            return caseinsurancemappings;
        }
        #endregion 


        #region save
        public override object Save<T>(T entity)
        {
            BO.CaseInsuranceMapping caseInsuranceMappingBO = (BO.CaseInsuranceMapping)(object)entity;
            int CaseId = 0;

            List<CaseInsuranceMapping> listCaseInsuranceMappingDB = new List<CaseInsuranceMapping>();

            using (var dbContextTransaction = _context.Database.BeginTransaction())
            {
                if (caseInsuranceMappingBO != null)
                {
                    CaseId = caseInsuranceMappingBO.CaseId;
                    List<int> PatientInsuranceInfoIds_New = caseInsuranceMappingBO.Mappings.Select(p => p.PatientInsuranceInfo.ID).ToList<int>();

                    //Call for removing data
                    List<CaseInsuranceMapping> listCaseInsuranceMappingDB_Remove = new List<CaseInsuranceMapping>();
                    
                    listCaseInsuranceMappingDB_Remove = _context.CaseInsuranceMappings.Where(p => p.CaseId == CaseId 
                                                                        && !PatientInsuranceInfoIds_New.Contains(p.PatientInsuranceInfoId)
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                .ToList<CaseInsuranceMapping>();

                    listCaseInsuranceMappingDB_Remove.ForEach(p => p.IsDeleted = true);
                    _context.SaveChanges();

                    //List<int> PatientInsuranceInfoIds_Old = listCaseInsuranceMappingDB_Remove.Select(p => p.PatientInsuranceInfoId).ToList<int>();
                    List<int> PatientInsuranceInfoIds_Existing = _context.CaseInsuranceMappings.Where(p => p.CaseId == CaseId
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .Select(p => p.PatientInsuranceInfoId).ToList<int>();

                    //Call for insert data
                    List<CaseInsuranceMapping> listCaseInsuranceMappingDB_Insert = new List<CaseInsuranceMapping>();

                    listCaseInsuranceMappingDB_Insert = PatientInsuranceInfoIds_New.Where(p => !PatientInsuranceInfoIds_Existing.Contains(p))
                                                                        .Select(p => new CaseInsuranceMapping()
                                                                        {
                                                                            CaseId = CaseId,
                                                                            PatientInsuranceInfoId = p
                                                                        })
                                                                        .ToList<CaseInsuranceMapping>();

                    if (listCaseInsuranceMappingDB_Insert != null && listCaseInsuranceMappingDB_Insert.Count > 0)
                    {
                        listCaseInsuranceMappingDB_Insert.ForEach(p => _context.CaseInsuranceMappings.Add(p));                        
                    }

                    _context.SaveChanges();

                    List<CaseInsuranceMapping> CaseInsuranceMapping_Existing = _context.CaseInsuranceMappings.Where(p => p.CaseId == CaseId
                                                                                            && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                                       .ToList<CaseInsuranceMapping>();

                    foreach (var item in CaseInsuranceMapping_Existing)
                    {
                        int AdjusterMasterID = 0;
                        AdjusterMasterID = caseInsuranceMappingBO.Mappings.Where(p => p.PatientInsuranceInfo.ID == item.PatientInsuranceInfoId)
                                                                          .Select(p2 => p2.AdjusterMaster.ID)
                                                                          .FirstOrDefault();

                        if (AdjusterMasterID > 0)
                        {
                            item.AdjusterMasterId = AdjusterMasterID;
                        }
                    }

                    //CaseInsuranceMapping_Existing.ForEach(p => p.AdjusterMasterId = caseInsuranceMappingBO.Mappings
                    //                                                                                      .Where(p2 => p2.PatientInsuranceInfo.ID == p.PatientInsuranceInfoId)
                    //                                                                                                .Select(p2 => p2.AdjusterMaster.ID)
                    //                                                                                                .FirstOrDefault()
                    //                                                                                            );
                    _context.SaveChanges();
                }                

                dbContextTransaction.Commit();

            listCaseInsuranceMappingDB = _context.CaseInsuranceMappings.Include("PatientInsuranceInfo")
                                                                        .Include("AdjusterMaster")
                                                                        .Where(p => p.CaseId == CaseId
                                                                        && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                                        .ToList<CaseInsuranceMapping>();
            }

            var res = Convert<BO.CaseInsuranceMapping, List<CaseInsuranceMapping>>(listCaseInsuranceMappingDB);
            return (object)res;
        }
        #endregion

        #region Delete By ID
        public override object Delete(int id)
        {
            var acc = _context.CaseInsuranceMappings.Where(p => p.Id == id && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
                                                    .FirstOrDefault<CaseInsuranceMapping>();
            if (acc != null)
            {
                acc.IsDeleted = true;
                _context.SaveChanges();
            }
            else if (acc == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            var res = Convert<BO.CaseInsuranceMapping, CaseInsuranceMapping>(acc);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
