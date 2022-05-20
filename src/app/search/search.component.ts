import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableDataService } from '../service/table-data.service';
import { SuDungData } from '../types/SuDungData';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formData!: FormGroup;
  limit: number = 0;
  currentPage: number = 0;
  searchData: SuDungData = {};
  constructor(
    private formBuilder: FormBuilder,
    private tableData: TableDataService
  ) {}

  ngOnInit(): void {
    this.tableData.limit.subscribe((val) => (this.limit = val));
    this.tableData.currentPage.subscribe((val) => (this.currentPage = val));
    this.tableData.searchData.subscribe((val) => (this.searchData = val));
    this.formData = this.formBuilder.group({
      ma: [''],
      tenNgan: [''],
      tenDayDu: [''],
      diaChi: [''],
      maSoThue: [''],
      lienHeDienToan: [''],
    });
  }

  search() {
    this.tableData.updateSearchData({ id: null, ...this.formData.value });
    this.tableData.paging({
      suDung: this.searchData,
      limit: this.limit,
      currentPage: this.currentPage,
    });
  }
}
