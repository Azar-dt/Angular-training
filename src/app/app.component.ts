import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import { TableDataService } from './service/table-data.service';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'training';

  constructor(
    private tokenService: TokenService,
    private tableService: TableDataService
  ) {}
  ngOnInit(): void {
    this.tokenService.onInit();
    this.tableService.getDataOnInit();
  }
}
