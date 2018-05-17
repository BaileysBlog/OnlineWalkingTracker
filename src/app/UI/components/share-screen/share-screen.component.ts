import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Blog } from '../../../_Models/blog.model';

@Component({
  selector: 'app-share-screen',
  templateUrl: './share-screen.component.html',
  styleUrls: ['./share-screen.component.css']
})
export class ShareScreenComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShareScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blog)
  {
    console.log(`Trying to share blog: ${data.Id}`);  
  }

  OnCloseClick(): void
  {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}
