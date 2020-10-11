import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { UtilsService } from "../../utils.service";

export interface DialogData {
	imageUrl: string;
  	base64ImageBytes: string;
  	title: string;
  	description: string;
  	formattedDate: string;
    url: string;
    vendor:string
}

export interface DialogFeed {
    imageUrl: string;
  	base64ImageBytes: string;
  	title: string;
  	description: string;
  	formattedDate: string;
    url: string;
    vendor:string

}


@Component({
  selector: 'app-item-info-dialog',
  templateUrl: './item-info-dialog.component.html'
})


export class ItemInfoDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ItemInfoDialogComponent>,
      // public utils: UtilsService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
    
  public feed: DialogFeed;


  ngOnInit() {
    this.feed = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
    // document.location.reload();
  }

  returnDefualtImageForSite( base64Image, imageURL ){

    if(
      base64Image === null ||
      imageURL === null 
    ){
      return false;
    }

    if(
      base64Image.length < 7  &&
      imageURL.length < 7
    ){

      return true;
    }

    return false;


  }

}
