import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentObj, PartyMasterLibraryService } from '../../party-master-library.service';
import { ConfigService } from '../../config.service';


@Component({
  selector: 'lib-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  documentName: any;
  fileToUpload!: any;
  viewDoc:boolean=false;
  doc:DocumentObj = <DocumentObj>{};
  apiUrl:string = '';
  @ViewChild("fileSelect") fileSelect!: ElementRef;
  @Input() documentUpload:DocumentObj[] = [];
  @Input() mode:string = 'add';

  constructor(private partyMasterService:PartyMasterLibraryService, private configService: ConfigService) { 
  }
  
  ngOnInit(): void {
    this.apiUrl = this.configService.getApiUrl();
  }
  displayedColumns: string[] = [
    'sn',
    'Document',
    'action'
  ];

  ngAfterViewInit() {
  }


  fileUpload(event:Event) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      this.fileToUpload = input.files[0];
      this.documentName = input.files[0].name;
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append("DocumentHeading", this.documentName);
    formData.append("file", this.fileToUpload);
    formData.append("TenantId",'' );
    this.partyMasterService.uploadDocument(formData).subscribe(
      (res: any) => {
        if (res.message) {
          const sanitizedPath = res.path.replace(/\\/g, '/').replace(/\/+/g, '/');
          const finalUrl = `${sanitizedPath}`;
          let el:DocumentObj = {documentExtenstion :this.fileToUpload.type, documentFileName :this.documentName, acid:'', path:finalUrl};
          this.documentUpload.push(el);
          this.partyMasterService.openSuccessDialog(res.message);
            this.fileToUpload = undefined;
            this.fileSelect.nativeElement.value = null;
        }
        else if (res.status == "error")
        {
          this.partyMasterService.openErrorDialog(res.status);

        }        
      },error => {
        console.log("error",error.message);
      }
    )

  }

  deleteFile(i:number){
    this.documentUpload.splice(i,1);
  }

  ToggleDoc(i:number){
    this.viewDoc = true;
    this.doc = this.documentUpload[i];
  }

  closeDocView(){
    this.viewDoc = false;;
  }


}
