import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'training';

  constructor(private dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }
}
