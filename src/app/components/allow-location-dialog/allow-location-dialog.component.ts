import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-allow-location-dialog',
  templateUrl: './allow-location-dialog.component.html'
})
export class AllowLocationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AllowLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
    // document.location.reload();
  }

}
