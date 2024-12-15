import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericDivisionMappingComponent } from "./generic-division-mapping.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [GenericDivisionMappingComponent],
  exports: [GenericDivisionMappingComponent]
})
export class DivisionMappingModule {
  static forRoot(): ModuleWithProviders<DivisionMappingModule> {
    return {
      ngModule: DivisionMappingModule    };
  }
}
