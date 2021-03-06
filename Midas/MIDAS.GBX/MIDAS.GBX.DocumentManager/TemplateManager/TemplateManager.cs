﻿using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using Novacode;
using Aspose.Words;
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
        string tempIMGpath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/uploads/sign.jpeg");
        string tempDOCpath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/uploads/tempUpload.docx");
        string tempPDFpath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/uploads/test.pdf");
        #endregion

        public TemplateManager()
        {            
            util.BlobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageConnectionString"];
        }

        public override object Template(Int32 CompanyId, string templateBlobPath, Dictionary<string, string> templateKeywords)
        {
            util.ContainerName = "company-" + CompanyId;
            string blobName = util.getBlob(templateBlobPath);
            _cblob = util.BlobContainer.GetBlockBlobReference(blobName);
            //_cblob.FetchAttributes();

            var ms = new MemoryStream();
            _cblob.DownloadToStream(ms);

            long fileByteLength = _cblob.Properties.Length;
            byte[] fileContents = new byte[fileByteLength];
            _cblob.DownloadToByteArray(fileContents, 0);

            DocX _template = DocX.Load(ms);

            if (templateKeywords != null  && templateKeywords.Keys.Count > 0)
            {
                foreach (string key in templateKeywords.Keys)
                {
                    if (key.ToLower().Equals("{signature}"))
                    {
                        using (FileStream imageFile = new FileStream(tempIMGpath, FileMode.Create))
                        {
                            byte[] bytes = System.Convert.FromBase64String(templateKeywords[key].Replace("data:image/jpeg;base64,", string.Empty));
                            imageFile.Write(bytes, 0, bytes.Length);
                            imageFile.Flush(); imageFile.Dispose();
                        }
                        Novacode.Image img = _template.AddImage(tempIMGpath);
                        Picture pic1 = img.CreatePicture();
                        Novacode.Paragraph p1 = _template.InsertParagraph();
                        p1.InsertPicture(pic1);
                        _template.ReplaceText(key, "");
                    }
                    else
                    { _template.ReplaceText(key, templateKeywords[key]); }
                }
            }
            _template.SaveAs(tempDOCpath);


            Aspose.Words.Document doc = new Aspose.Words.Document(tempDOCpath);
            doc.Save(tempPDFpath);
            //doc.Remove();
            /*Microsoft.Office.Interop.Word.Document wordDocument;
            Application appWord = new Application();
            wordDocument = appWord.Documents.Open(tempDOCpath);
            wordDocument.ExportAsFixedFormat(tempPDFpath, WdExportFormat.wdExportFormatPDF);

            wordDocument.Close();*/
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