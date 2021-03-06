﻿using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using static MIDAS.GBX.BusinessObjects.GBEnums;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/FileUpload")]
    public class FileUploadController : ApiController
    {
        internal string sourcePath = string.Empty;
        internal string remotePath = string.Empty;
        internal DirectoryInfo directinfo;

        private IRequestHandler<Document> requestHandler;

        public FileUploadController()
        {
            sourcePath = HttpContext.Current.Server.MapPath("~/App_Data/uploads").ToString();
            remotePath = "C:\\Users\\Sonali.A\\Midas\\Midas\\MIDAS.GBX\\MIDAS.GBX.PatientWebAPI\\App_Data\\uploads";
            requestHandler = new GbApiRequestHandler<Document>();
        }

        [HttpPost]
        [Route("upload/{id}/{type}")]
        public async Task<HttpResponseMessage> Post(int id, string type)
        {
            try
            {
                if (Request.Content.IsMimeMultipartContent())
                {
                    var streamProvider = new MultipartFormDataStreamProvider(sourcePath);
                    await Request.Content.ReadAsMultipartAsync(streamProvider);
                    foreach (MultipartFileData fileData in streamProvider.FileData)
                    {
                        if (type == "case")
                        {
                            directinfo = Directory.CreateDirectory(remotePath + "/case-" + id + "/CH/reports");
                        }
                        else if (type == "visit")
                        {
                            directinfo = Directory.CreateDirectory(remotePath + "/visit-" + id + "/CH/reports");
                        }
                        if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                            return Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted");
                        string fileName = fileData.Headers.ContentDisposition.FileName;
                        fileName = (fileName.StartsWith("\"") && fileName.EndsWith("\"")) ? fileName.Trim('"') : fileName;
                        fileName = (fileName.Contains(@"/") || fileName.Contains(@"\")) ? Path.GetFileName(fileName) : fileName;

                        if (File.Exists(Path.Combine(directinfo.FullName, fileName))) File.Delete(Path.Combine(directinfo.FullName, fileName));
                        File.Move(fileData.LocalFileName, Path.Combine(directinfo.FullName, fileName));

                        if (type == "case")
                        {
                            CaseController caseAPI = new CaseController();
                            caseAPI.ControllerContext = ControllerContext;
                            return caseAPI.AddUploadedFileData(id, Path.Combine(directinfo.FullName, fileName));
                        }
                        else if (type == "visit")
                        {
                            PatientVisitController visitAPI = new PatientVisitController();
                            visitAPI.ControllerContext = ControllerContext;
                            return visitAPI.AddUploadedFileData(id, Path.Combine(directinfo.FullName, fileName));
                        }
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "Uploaded file successfully.");
                }
                else return Request.CreateResponse(HttpStatusCode.NotAcceptable, new JavaScriptSerializer().Deserialize("{\"fileUploadPath\":\"\"}", typeof(object)));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize("{\"fileUploadPath\":\"\"}", typeof(object)));
            }
        }

        [HttpGet]
        [Route("get/{id}/{type}")]
        //[AllowAnonymous]
        public HttpResponseMessage Get(int id, string type)
        {
            return requestHandler.GetObject(Request, id, type);
        }

        [HttpPost]
        [Route("multiuploadtest/{id}/{type}")]
        public async Task<HttpResponseMessage> UploadTest(int id, string type)
        {
            if (!Request.Content.IsMimeMultipartContent("form-data")) return new HttpResponseMessage(HttpStatusCode.BadRequest);
            var streamProvider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(streamProvider);
            List<HttpContent> streamContent = streamProvider.Contents.ToList();
            string contenttype = streamContent.ToList().Select(p => p.Headers.ContentType).FirstOrDefault().MediaType;
            HttpResponseMessage resMessage = requestHandler.CreateGbDocObject(Request, id, type, streamContent, sourcePath);

            return resMessage;
        }

        [HttpPost]
        [Route("multiupload/{id}/{type}")]
        public async Task<HttpResponseMessage> Upload(int id, string type)
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent("form-data"))
                return new HttpResponseMessage(HttpStatusCode.BadRequest);

            //If size of a file is not big then read file directly into stream
            var streamProvider = new MultipartMemoryStreamProvider();
            //If size is quite big to upload then store file to desk and then move to appropriate directory
            //var streamProvider = new MultipartFormDataStreamProvider(sourcePath);
            await Request.Content.ReadAsMultipartAsync(streamProvider);

            List<HttpContent> streamContent = streamProvider.Contents.ToList();
            /*foreach (HttpContent ctnt in streamProvider.Contents)
            {                
                using (Stream stream = ctnt.ReadAsStreamAsync().Result)
                {                   
                    stream.Seek(0, SeekOrigin.Begin);
                    FileStream filestream = File.Create(remotePath+ "/"+ctnt.Headers.ContentDisposition.FileName.Replace("\"", string.Empty));
                    
                    stream.CopyTo(filestream);
                    stream.Close();
                    filestream.Close();
                }
            }*/

            string contenttype = streamContent.ToList().Select(p => p.Headers.ContentType).FirstOrDefault().MediaType;
            HttpResponseMessage resMessage = requestHandler.CreateGbDocObject(Request, id, type, streamContent, sourcePath);
            return resMessage;
        }
        /*[HttpPost]
        [Route("upload")]
        public HttpResponseMessage Post()
        {
            if (Request.Content.IsMimeMultipartContent())
            {

                //string fullPath = HttpContext.Current.Server.MapPath("E://uploads");

                MultipartFormDataStreamProvider streamProvider = new MultipartFormDataStreamProvider("E://uploads");
                IEnumerable<HttpContent> parts = null;
                Task.Factory.StartNew(() => parts = Request.Content.ReadAsMultipartAsync().Result.Contents, 
                                                    CancellationToken.None, 
                                                    TaskCreationOptions.LongRunning, 
                                                    TaskScheduler.Default).Wait();

                var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                    {
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                    }

                    var fileInfo = streamProvider.FileData.Select(i =>
                    {
                        var info = new FileInfo(i.LocalFileName);
                        return "File uploaded as " + info.FullName + " (" + info.Length + ")";
                    });
                    return fileInfo;

                });               
            }
            else
            {
                Request.CreateResponse(HttpStatusCode.NotAcceptable, "Invalid Request!");
                return null;
            }
            return new HttpResponseMessage();
        }*/

        [HttpGet]
        [Route("download/{caseId}/{documentid}")]
        //[AllowAnonymous]
        public void Download(int caseId, int documentid)
        {
            string filepath = requestHandler.Download(Request, caseId, documentid);
            filepath = filepath.Replace(ConfigurationManager.AppSettings.Get("BLOB_PATH"), ConfigurationManager.AppSettings.Get("LOCAL_PATH"));

            FileInfo fileInfo = new System.IO.FileInfo(filepath);

            HttpContext.Current.Response.ContentType = "application/pdf";
            HttpContext.Current.Response.AddHeader("Content-Disposition", String.Format("attachment;filename=\"{0}\"", fileInfo.Name));
            HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.WriteFile(filepath);
            //HttpContext.Current.Response.BinaryWrite(btFile);
            HttpContext.Current.Response.End();
        }

        [HttpGet]
        [Route("Delete/{caseId}/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage DeleteFile(int caseId, int id)
        {
            return requestHandler.DeleteFile(Request, caseId, id);
        }

    }
}