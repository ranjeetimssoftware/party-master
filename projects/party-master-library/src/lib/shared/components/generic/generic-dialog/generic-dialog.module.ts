import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button/button-module";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { GenericDialogComponent } from "./generic-dialog.component";

@NgModule({
    declarations: [GenericDialogComponent
    ],
    imports: [MatButtonModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
    exports: [],
    providers:[]
  })
  export class GenericDialogModule {}