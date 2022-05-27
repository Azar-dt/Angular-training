import { Injectable, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { from, map, Observable, Subject } from 'rxjs';
import { MapSuDungRes } from '../helper/MapSuDungRes';
import { dataElement } from '../types/mock-data';
import { PagingData } from '../types/PagingData';
import { SuDungData } from '../types/SuDungData';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  dataSubject = new Subject<SuDungData[]>();
  searchData = new Subject<SuDungData>();
  limit = new Subject<number>();
  currentPage = new Subject<number>();
  length = new Subject<number>();
  constructor(private api: ApiService) {}

  updateDataSubject(data: SuDungData[]) {
    this.dataSubject.next(data);
  }

  updateSearchData(data: SuDungData) {
    this.searchData.next(data);
  }

  updateLimit(newLimit: number) {
    this.limit.next(newLimit);
  }

  updateCurrentPage(newCurrentPage: number) {
    this.currentPage.next(newCurrentPage);
  }

  updateLength(newLength: number) {
    this.length.next(newLength);
  }
  getDataOnInit() {
    console.log('get data');
    // this.updateSearchData({});

    this.api.paging({ suDung: {}, limit: 3, currentPage: 0 }).subscribe({
      next: (res: any) => {
        console.log(res);
        const { suDungs } = res;

        let newDataSource: SuDungData[] = MapSuDungRes(suDungs);
        console.log(newDataSource);

        this.updateDataSubject(newDataSource);

        this.updateLimit(3);
        this.updateCurrentPage(0);
        this.updateLength(res.total);
        // console.log(this.dataSource.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getAllRecord() {
    return this.dataSubject.asObservable();
  }

  searchRecord(data: SuDungData) {
    this.api.getRecord(data).subscribe((res: any) => {
      console.log(res);

      const newDataSource: SuDungData[] = MapSuDungRes(res);

      this.updateDataSubject(newDataSource);
      console.log(newDataSource);
    });
    return this.dataSubject.asObservable();
  }

  searchRecordProcedure(data: SuDungData) {
    this.api.getRecordProcedure(data).subscribe((res: any) => {
      console.log(res);
      let newDataSource: SuDungData[] = MapSuDungRes(res);
      this.updateDataSubject(newDataSource);
      console.log(newDataSource);
    });
    return this.dataSubject.asObservable();
  }

  paging(data: PagingData) {
    console.log(data);

    this.api.paging(data).subscribe((res: any) => {
      console.log(res);
      this.updateDataSubject(res.suDungs);
      this.updateLength(res.total);
    });
    return this.dataSubject.asObservable();
  }
}
