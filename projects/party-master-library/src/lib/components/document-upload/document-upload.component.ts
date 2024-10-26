import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  sn: number;
  Document: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    sn: 1,
    Document: 'Tax Document.pdf',
  },
  {
    sn: 2,
    Document: 'Document2.pdf',
  },
  {
    sn: 3,
    Document: 'Document3.pdf',
  },
  {
    sn: 4,
    Document: 'Document3.pdf',
  },
  {
    sn: 5,
    Document: 'Document3.pdf',
  },
];

@Component({
  selector: 'lib-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  newRow: PeriodicElement = { sn: this.dataSource.data.length+1, Document: '',};
  documentName: any;
  fileToUpload!: any;
  filesNames:any[]=[];
  documentFileList : any[]=[];
  @ViewChild("fileSelect") fileSelect!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // if(this.dataSource.data[this.dataSource.data.length-1].Document != ''){
    //   ELEMENT_DATA.push(this.newRow);
    //   this.dataSource.data = [...ELEMENT_DATA];
    // }
  }
  displayedColumns: string[] = [
    'sn',
    'Document',
    'action'
  ];

  ngAfterViewInit() {
  }

  fileUpload(files: FileList) {
    if(files && files.length>0){
      this.fileToUpload = files.item(0);
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append("DocumentHeading", this.documentName);
    formData.append("file", this.fileToUpload);
    console.log("documentName ",this.documentName)
    this.documentFileList.push(this.fileToUpload);
    this.fileToUpload = undefined;
    this.fileSelect.nativeElement.value = null;
    this.filesNames.push(this.documentName);
    // this.documentHeadingService.uploadDocument(formData).subscribe(
    //   (res: any) => {
    //     if (res.status == "ok") {
    //     }
    //     else if (res.status == "error")
    //     {
    //     }        
    //   },error => {
    //   }
    // )
  }


}
