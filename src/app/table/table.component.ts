import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { TableDataService } from '../service/table-data.service';
import { SuDungData } from '../types/SuDungData';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // limit: number = 2; // dung de gui ve server
  currentPage: number = 0; // page hien tai , dung de gui ve server
  pageSizeOptions: number[] = [3, 5, 7];
  length: number = 0; // total element
  pageSize: number = 0; // view ra man hinh bao nhieu row
  searchData: SuDungData = {};
  displayedColumns: string[] = [
    'id',
    'ma',
    'tenNgan',
    'tenDayDu',
    'diaChi',
    'maSoThue',
    'lienHeDienToan',
  ];

  dataSource = new MatTableDataSource<SuDungData>();

  constructor(private tableData: TableDataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tableData.getDataOnInit();

    // subcribe component to dataSUbject, khi dataSubject thay doi thi component thay doi
    this.tableData.dataSubject.subscribe((data) => {
      console.log('dataSubject', data);

      this.dataSource.data = data;
    });
    this.tableData.searchData.subscribe((val) => (this.searchData = val));
    this.tableData.limit.subscribe((val) => (this.pageSize = val));
    this.tableData.length.subscribe((val) => (this.length = val));
    this.tableData.currentPage.subscribe((val) => (this.currentPage = val));
  }

  openEdit(row: SuDungData) {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        editData: row,
        fetchData: this.fetchData.bind(this),
      },
    });
  }

  // use to bind to dialog, when dialog press save method will call this and update data in table
  fetchData(data: SuDungData) {
    this.tableData.getDataOnInit();
  }

  paging(e: PageEvent) {
    console.log(e.pageSize);

    this.tableData.updateLimit(e.pageSize);
    this.tableData.updateCurrentPage(e.pageIndex);
    this.tableData.paging({
      suDung: this.searchData,
      limit: e.pageSize,
      currentPage: e.pageIndex,
    });
  }
}
