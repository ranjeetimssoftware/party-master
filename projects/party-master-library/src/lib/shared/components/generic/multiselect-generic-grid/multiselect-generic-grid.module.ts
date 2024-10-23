import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectGenericGridComponent } from "./multiselect-generic-grid.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [MultiSelectGenericGridComponent],
  exports: [MultiSelectGenericGridComponent]
})
export class MultiSelectGenericGridModule {
  static forRoot(): ModuleWithProviders<MultiSelectGenericGridModule> {
    return {
      ngModule: MultiSelectGenericGridModule    };
  }
}
