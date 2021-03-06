import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DocumentAdapter } from '../../services/adapters/document-adapter';
import { Document } from '../../models/document';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DocumentUploadService } from '../../../commons/services/document-upload-service';
import { SignatureFieldComponent } from '../../../commons/components/signature-field/signature-field.component';
import { ConsentService } from '../../../patient-manager/cases/services/consent-service';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  private _penColorForSignature = '#000000';
  private _signaturePadColor = '#e9e9e9';

  scannerContainerId: string;
  documentMode: string = '1';
  twainSources: TwainSource[] = [];
  selectedTwainSource: TwainSource = null;
  dwObject: any = null;
  scannedFileName: string = '';
  digitalForm: FormGroup;
  cosentFormUrl: SafeResourceUrl;

  @Input() signedDocumentUploadUrl: string;
  @Input() signedDocumentPostRequestData: any;
  @Input() isElectronicSignatureOn: boolean = false;
  @Output() signedDocumentUploadComplete: EventEmitter<Document> = new EventEmitter();
  @Output() signedDocumentUploadError: EventEmitter<Error> = new EventEmitter();

  @Input() url: string;
  @Output() uploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();



  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('signatureContainer') public signatureContainer: QueryList<ElementRef>;

  constructor(
    private _fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _scannerService: ScannerService,
    private _notificationsService: NotificationsService,
    private _documentUploadService: DocumentUploadService,
    private _progressBarService: ProgressBarService,
    private _consentService: ConsentService
  ) {
    this._updateScannerContainerId();
    this.digitalForm = this._fb.group({
      signatureField: ['', Validators.required],
      iAgreeChkBox: [false, Validators.pattern('true')]
    });
  }

  ngOnInit() {
    if (this.signedDocumentPostRequestData) {
      this.cosentFormUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._consentService.getConsentFormDownloadUrl(this.signedDocumentPostRequestData.caseId, this.signedDocumentPostRequestData.companyId, false));
    }
  }

  ngOnDestroy() {
    this.unloadWebTwain();
  }

  ngAfterViewInit() {
    _.defer(() => {
      this._createDWObject();
    });
  }

  onDocumentModelChange(value) {
    if (value == '3') {
      _.defer(() => {
        this.beResponsive();
        this.setOptions();
      });
    }
  }

  beResponsive() {
    this.size(this.signatureContainer.first, this.sigs.first);
  }

  size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.offsetWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.offsetHeight);
  }

  setOptions() {
    this.sigs.first.signaturePad.set('penColor', this._penColorForSignature);
    this.sigs.first.signaturePad.set('backgroundColor', this._signaturePadColor);
    this.sigs.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  saveDigitalForm() {
    this.signedDocumentPostRequestData = _.extend(this.signedDocumentPostRequestData, {
      base64Data: this.sigs.first.signature
    });
    this._documentUploadService.uploadSignedDocument(this.signedDocumentUploadUrl, this.signedDocumentPostRequestData)
      .then((document: Document) => {
        this.digitalForm.reset();
        this.clear();
        this.signedDocumentUploadComplete.emit(document);
      })
      .catch((error) => {
        this.digitalForm.reset();
        this.clear();
        this.signedDocumentUploadError.emit(error);
      });

  }

  clear() {
    this.sigs.first.clear();
  }

  private _updateScannerContainerId() {
    this.scannerContainerId = `scanner_${moment().valueOf()}`;
  }

  onFilesUploadComplete(event) {
    let responseDocuments: any = JSON.parse(event.xhr.responseText);
    let documents: Document[] = (<Object[]>responseDocuments).map((document: any) => {
      return DocumentAdapter.parseResponse(document);
    });
    this.uploadComplete.emit(documents);
  }

  onFilesUploadError(event) {
    this.uploadError.emit(new Error('Unable to upload selected files.'));
  }

  uploadScannedDocuments() {
    let fileName = this.scannedFileName.trim();
    if (!fileName) {
      this._notificationsService.error('File Name not present', 'Please provide name of file for scanned document.');
      return;
    }
    this._documentUploadService.uploadScanDocument(this.dwObject, this.url, fileName)
      .then((documents: Document[]) => {
        this.uploadComplete.emit(documents);
        this.resetWebTwain();
        this.scannedFileName = '';
      })
      .catch((error) => {
        this.uploadError.emit(error);
      });
  }

  unloadWebTwain() {
    this._scannerService.deleteWebTwain(this.scannerContainerId);
    this._scannerService.unloadAll();
  }

  resetWebTwain() {
    this.unloadWebTwain();
    this._updateScannerContainerId();
    this._createDWObject();
  }

  private _createDWObject() {
    // this.scannedFileName = `scanned_file_${moment().format('DD-MMM-YYYY hh-mm')}`;
    this._scannerService.getWebTwain(this.scannerContainerId)
      .then((dwObject) => {
        this.dwObject = dwObject;
        this.dwObject.SetViewMode(1, -1);
        if (this.dwObject) {
          let twainSources: TwainSource[] = [];
          for (let i = 0; i < this.dwObject.SourceCount; i++) {
            twainSources.push({ idx: i, name: this.dwObject.GetSourceNameItems(i) });
          }
          this.twainSources = twainSources;
        }
      }).catch(() => {
        this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
      });
  }

  acquireImage() {
    if (this.dwObject) {
      this.dwObject.IfDisableSourceAfterAcquire = true;
      if (this.selectedTwainSource) {
        this.dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
      } else {
        this.dwObject.SelectSource();
      }
      this.dwObject.OpenSource();
      this.dwObject.AcquireImage();
    }
  }

}
export interface TwainSource {
  idx: number;
  name: string;
}