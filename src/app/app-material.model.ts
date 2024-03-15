import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const item = [MatButtonModule, MatMenuModule, MatTableModule];

@NgModule({
  imports: item,
  exports: item,
})
export class MaterialModule {}
