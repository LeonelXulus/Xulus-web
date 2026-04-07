import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-ai-receptionist-dialog',
  templateUrl: './ai-receptionist-dialog.component.html',
  styleUrls: ['./ai-receptionist-dialog.component.scss']
})
export class AiReceptionistDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AiReceptionistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseStudy
  ) {}

  close() {
    this.dialogRef.close();
  }
}
