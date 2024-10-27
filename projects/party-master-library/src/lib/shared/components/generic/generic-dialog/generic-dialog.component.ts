import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @title Dialog elements
 */

@Component({
  selector: 'generic-dialog',
  templateUrl: 'generic-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDialogComponent {
  DialogObj:DialogObj = <DialogObj>{};
  constructor(@Inject(MAT_DIALOG_DATA) private data:DialogObj){
    this.DialogObj = data;
  }

  
  
}

export interface DialogObj{
  Title:string;
  Message:string;
}