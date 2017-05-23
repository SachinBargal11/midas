﻿using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using Novacode;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.Office.Interop.Word;

namespace MIDAS.GBX.DocumentManager
{
    public class TemplateManager : BlobServiceProvider, IDisposable
    {
        #region private members
        private CloudBlockBlob _cblob;
        private string blobStorageContainerName = ConfigurationManager.AppSettings["BlobStorageContainerName"];              
        private Utility util = new Utility();
        string tempDOCpath = System.Web.HttpContext.Current.Server.MapPath(@"~/app_data/uploads/tempUpload.docx");
        string tempPDFpath = System.Web.HttpContext.Current.Server.MapPath(@"~/app_data/uploads/test.pdf");
        #endregion

        public TemplateManager(MIDASGBXEntities context) : base(context)
        {            
            util.BlobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageConnectionString"];
        }

        public override object Template(string templateBlobPath, Dictionary<string, string> templateKeywords)
        {
            util.ContainerName = "company-95";
            string blobName = util.getBlob(templateBlobPath);
            _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            //_cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStream(ms);

            long fileByteLength = _cblob.Properties.Length;
            byte[] fileContents = new byte[fileByteLength];
            _cblob.DownloadToByteArray(fileContents, 0);

            DocX _template = DocX.Load(ms);
            foreach (string key in templateKeywords.Keys)
            {
                _template.ReplaceText(key, templateKeywords[key]);
            }
            _template.SaveAs(tempDOCpath);
            
            Microsoft.Office.Interop.Word.Document wordDocument;
            Application appWord = new Application();
            wordDocument = appWord.Documents.Open(tempDOCpath);
            wordDocument.ExportAsFixedFormat(tempPDFpath, WdExportFormat.wdExportFormatPDF);

            wordDocument.Close();
            ms.Flush();
            ms.Close();

            return tempPDFpath;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}