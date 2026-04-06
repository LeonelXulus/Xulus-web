import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-case-detail-dialog',
  templateUrl: './case-detail-dialog.component.html',
  styleUrls: ['./case-detail-dialog.component.scss']
})
export class CaseDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CaseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseStudy
  ) {}

  close() {
    this.dialogRef.close();
  }
}
