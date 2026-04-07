import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-trading-engine-dialog',
  templateUrl: './trading-engine-dialog.component.html',
  styleUrls: ['./trading-engine-dialog.component.scss']
})
export class TradingEngineDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TradingEngineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CaseStudy
  ) {}

  close() {
    this.dialogRef.close();
  }
}
