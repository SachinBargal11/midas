﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.DataAccessManager;

namespace MIDAS.GBX.PatientWebAPI.RequestHandler
{
    public class GbApiRequestHandler<T> : IRequestHandler<T>
    {
        private IGbDataAccessManager<T> dataAccessManager;

        public GbApiRequestHandler()
        {
            dataAccessManager = new GbDataAccessManager<T>();
        }

        public string Download(HttpRequestMessage request, int caseId, int documentid)
        {
            string path = dataAccessManager.Download(caseId, documentid);
            if (caseId > 0)
            {
                return path;
            }
            else
            {
                return string.Empty;
            }
        }

        public object DownloadSignedConsent(HttpRequestMessage request, T gbObject)
        {
            object path = dataAccessManager.DownloadSignedConsent(gbObject);
            return path;
        }
        public HttpResponseMessage Login(HttpRequestMessage request, T gbObject)
        {
            User userBO = (User)(object)gbObject;
            if (userBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.Login(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);

            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject)
        {
            OTP otpBO = (OTP)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.RegenerateOTP(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject)
        {
            ValidateOTP otpBO = (ValidateOTP)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidateOTP(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbDocObject(HttpRequestMessage request, int id, string type, List<HttpContent> streamContent,string uploadpath)
        {
            var objResult = dataAccessManager.Save(id, type, streamContent,uploadpath);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.OK, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }            
        }

        public HttpResponseMessage CreateGbDocObject1(HttpRequestMessage request, int caseid, int companyid, List<HttpContent> streamContent, string uploadpath, bool signed)
        {
            var objResult = new object();
            objResult = dataAccessManager.ConsentSave(caseid, companyid, streamContent, uploadpath, signed);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.OK, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Save(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByCompanyWithOpenCases(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int param1, int param2)
        {
            var objResult = dataAccessManager.Get2(param1, param2);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage SaveDoctor(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.SaveDoctor(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObject(HttpRequestMessage request, int id, string type)
        {
            var objResult = dataAccessManager.Get(id, type);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Get(gbObject);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObject(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.Get(id);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage GetCaseCompanies(HttpRequestMessage request, int caseId)
        {
            var objResult = dataAccessManager.GetCaseCompanies(caseId);
            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetgbObjects(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByInsuranceMasterId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteFile(HttpRequestMessage request, int caseId, int id)
        {
            var res = dataAccessManager.DeleteFile(caseId, id);
            if (id > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }

        public HttpResponseMessage GetByPatientVisitId(HttpRequestMessage request, int patientVisitId)
        {
            var objResult = dataAccessManager.GetByPatientVisitId(patientVisitId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.DeleteObject(gbObject);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject)
        {
            PasswordToken otpBO = (PasswordToken)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.GeneratePasswordLink(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject)
        {
            PasswordToken otpBO = (PasswordToken)(object)gbObject;
            if (otpBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "OTP object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidatePassword(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject)
        {
            Invitation invitationBO = (Invitation)(object)gbObject;
            if (invitationBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "Invitation object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.ValidateInvitation(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, objResult);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.Update(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetObjects(HttpRequestMessage request)
        {
            var objResult = dataAccessManager.Get();
            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        public HttpResponseMessage GetObjects(HttpRequestMessage request, string param1)
        {
            var objResult = dataAccessManager.Get(param1);
            try
            {
                //var res = (GbObject)(object)objResult;
                var res = (object)objResult;

                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetByCompanyId(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject)
        {
            var objResult = dataAccessManager.ResetPassword(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByCaseId(HttpRequestMessage request, int CaseId)
        {
            var objResult = dataAccessManager.GetByCaseId(CaseId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetCurrentEmpByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetCurrentEmpByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetCurrentROByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetCurrentROByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteById(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteById(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage Delete(HttpRequestMessage request, int id)
        {
            var res = dataAccessManager.Delete(id);
            if (id > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }

        public HttpResponseMessage Delete(HttpRequestMessage request, int param1,int param2,int param3)
        {
            var res = dataAccessManager.Delete(param1, param2, param3);
            if (param1 > 0)
            {
                return request.CreateResponse(HttpStatusCode.Accepted, res);
            }
            else
            {
                return request.CreateResponse(HttpStatusCode.NoContent, new ErrorObject { ErrorMessage = "Id can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
        }

        public HttpResponseMessage GetByDoctorId(HttpRequestMessage request, int DoctorId)
        {
            var objResult = dataAccessManager.GetByDoctorId(DoctorId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteVisit(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteVisit(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage DeleteCalendarEvent(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.DeleteCalendarEvent(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CancleVisit(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.CancleVisit(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CancleCalendarEvent(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.CancleCalendarEvent(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        //public HttpResponseMessage IsInsuranceInfoAdded(HttpRequestMessage request, int id)
        //{
        //    var objResult = dataAccessManager.IsInsuranceInfoAdded(id);
        //    try
        //    {
        //        return request.CreateResponse(HttpStatusCode.Created, objResult);
        //    }
        //    catch (Exception ex)
        //    {
        //        return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
        //    }
        //}

        public HttpResponseMessage GetByLocationId(HttpRequestMessage request, int LocationId)
        {
            var objResult = dataAccessManager.GetByLocationId(LocationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, int param1, int param2)
        {
            var objResult = dataAccessManager.Get(param1, param2);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage AddUploadedFileData(HttpRequestMessage request, int id, string FileUploadPath)
        {
            var objResult = dataAccessManager.AddUploadedFileData(id, FileUploadPath);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetDocumentList(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetDocumentList(id);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByRoomId(HttpRequestMessage request, int RoomId)
        {
            var objResult = dataAccessManager.GetByRoomId(RoomId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationAndSpecialty(HttpRequestMessage request, int locationId, int specialtyId)
        {
            var objResult = dataAccessManager.GetByLocationAndSpecialty(locationId, specialtyId);

            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetOpenCaseForPatient(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetOpenCaseForPatient(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetConsentList(HttpRequestMessage request, int id)
        {
            var objResult = dataAccessManager.GetConsentList(id);
            try
            {
                var res = (GbObject)(object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationAndPatientId(HttpRequestMessage request, int LocationId, int PatientId)
        {
            var objResult = dataAccessManager.GetByLocationAndPatientId(LocationId, PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByLocationDoctorAndPatientId(HttpRequestMessage request, int locationId, int doctorId, int patientId)
        {
            var objResult = dataAccessManager.GetByLocationDoctorAndPatientId(locationId, doctorId, patientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        
        public HttpResponseMessage GetByLocationRoomAndPatientId(HttpRequestMessage request, int locationId, int roomId, int patientId)
        {
            var objResult = dataAccessManager.GetByLocationRoomAndPatientId(locationId, roomId, patientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetLocationForPatientId(HttpRequestMessage request, int patientId)
        {
            var objResult = dataAccessManager.GetLocationForPatientId(patientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByPatientIdAndLocationId(HttpRequestMessage request, int PatientId, int LocationId)
        {
            var objResult = dataAccessManager.GetByPatientIdAndLocationId(PatientId, LocationId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByDocumentId(HttpRequestMessage request, int documentId)
        {
            var objResult = dataAccessManager.GetByDocumentId(documentId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByObjectIdAndType(HttpRequestMessage request, int objectId,string objectType)
        {
            var objResult = dataAccessManager.GetByObjectIdAndType(objectId, objectType);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetVisitsByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetVisitsByPatientId(PatientId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetReadOnly(HttpRequestMessage request, int CaseId, int companyId)
        {
            var objResult = dataAccessManager.GetReadOnly(CaseId, companyId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetOpenCaseCompaniesByPatientId(HttpRequestMessage request, int PatientId)
        {
            var objResult = dataAccessManager.GetOpenCaseCompaniesByPatientId(PatientId);
            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage GetByPatientVisitIdWithProcedureCodes(HttpRequestMessage request, int PatientVisitId)
        {
            var objResult = dataAccessManager.GetByPatientVisitIdWithProcedureCodes(PatientVisitId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage CancelSingleEventOccurrence(HttpRequestMessage request, int PatientVisitId, DateTime CancelEventStart)
        {
            var objResult = dataAccessManager.CancelSingleEventOccurrence(PatientVisitId, CancelEventStart);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        #region LoginWithUserName
        public HttpResponseMessage LoginWithUserName(HttpRequestMessage request, T gbObject)
        {
            User userBO = (User)(object)gbObject;
            if (userBO == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new ErrorObject { ErrorMessage = "User object can't be null", errorObject = "", ErrorLevel = ErrorLevel.Error });
            }
            var objResult = dataAccessManager.LoginWithUserName(gbObject);

            try
            {
                var res = (GbObject)(object)objResult;
                return request.CreateResponse(HttpStatusCode.Created, objResult);

            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
        #endregion

        public HttpResponseMessage GetMasterAndByCaseId(HttpRequestMessage request, int CaseId)
        {
            var objResult = dataAccessManager.GetMasterAndByCaseId(CaseId);
            try
            {
                return request.CreateResponse(HttpStatusCode.Created, objResult);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
    }
}