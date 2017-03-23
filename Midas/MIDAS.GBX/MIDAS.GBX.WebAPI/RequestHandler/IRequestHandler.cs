﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace MIDAS.GBX.WebAPI
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject1(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbDocObject(HttpRequestMessage request, int id, string type, List<HttpContent> streamContent);
        HttpResponseMessage CreateGb(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, T gbObject);
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject);
        
        HttpResponseMessage AddUploadedFileData(HttpRequestMessage request, int id, string FileUploadPath);
        HttpResponseMessage GenerateToken(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateToken(HttpRequestMessage request,string tokenId);
        HttpResponseMessage Kill(HttpRequestMessage requeststring,int tokenId);
        HttpResponseMessage DeleteByUserId(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage Delete(HttpRequestMessage request, int id);
        HttpResponseMessage GetDocumentList(HttpRequestMessage request, int id);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByLocationAndSpecialty(HttpRequestMessage request, int locationId, int specialtyId);

        HttpResponseMessage GetObjects(HttpRequestMessage request);
        HttpResponseMessage GetObjects(HttpRequestMessage request, string param1);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects3(HttpRequestMessage request, int id);
        HttpResponseMessage GetgbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjects4(HttpRequestMessage request, int id);
        HttpResponseMessage IsInsuranceInfoAdded(HttpRequestMessage request, int id);
        HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetByCaseId(HttpRequestMessage request, int CaseId);
        HttpResponseMessage GetByPatientId(HttpRequestMessage request, int CaseId);
        HttpResponseMessage GetByLocationId(HttpRequestMessage request, int id);
        HttpResponseMessage GetByDoctorId(HttpRequestMessage request, int id);
        HttpResponseMessage GetPatientAccidentInfoByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage GetCurrentROByPatientId(HttpRequestMessage request, int PatientId);
        HttpResponseMessage DeleteById(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteVisit(HttpRequestMessage request, int id);
        HttpResponseMessage DeleteCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage CancleVisit(HttpRequestMessage request, int id);
        HttpResponseMessage CancleCalendarEvent(HttpRequestMessage request, int id);
        HttpResponseMessage GetCurrentEmpByPatientId(HttpRequestMessage request, int PatientId);

        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int param1, int param2);
        HttpResponseMessage GetGbObjects2(HttpRequestMessage request, int param1, int param2);
        HttpResponseMessage AssociateUserToCompany(HttpRequestMessage request, string UserName, int CompanyId, bool sendEmail);
        HttpResponseMessage GetByDates(HttpRequestMessage request,  DateTime FromDate,DateTime ToDate);
        HttpResponseMessage GetByRoomId(HttpRequestMessage request, int RoomId);
    }
}
