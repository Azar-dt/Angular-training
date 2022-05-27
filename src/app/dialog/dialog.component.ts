import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';
import { TableDataService } from '../service/table-data.service';
import { SuDungData } from '../types/SuDungData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  formData!: FormGroup;
  actionBtnPrimary: string = 'Thêm';
  actionBtnWarn: string = '';
  title: string = 'Thêm dữ liệu';

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SuDungData,
    private tableData: TableDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      ma: ['', Validators.required],
      tenNgan: ['', Validators.required],
      tenDayDu: ['', Validators.required],
      diaChi: ['', Validators.required],
      maSoThue: ['', Validators.required],
      lienHeDienToan: ['', Validators.required],
    });
    // console.log(this.data);
    if (this.data) {
      this.actionBtnPrimary = 'Sửa';
      this.actionBtnWarn = 'Xóa';
      this.title = 'Sửa dữ liệu';
      const edit = this.data;
      this.formData.patchValue({
        ma: edit.ma,
        tenNgan: edit.tenNgan,
        tenDayDu: edit.tenDayDu,
        diaChi: edit.diaChi,
        maSoThue: edit.maSoThue,
        lienHeDienToan: edit.lienHeDienToan,
      });
    }
  }

  addRecord() {
    if (this.formData.valid && !this.data) {
      console.log('run add record');

      this.api.addRecord(this.formData.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.snackBar.open('Thêm thành công 🚀🚀🚀', 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            });
            this.tableData.getDataOnInit();
            this.formData.reset();
            this.matDialogRef.close();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    if (this.formData.valid && this.data) {
      this.api
        .editRecord({ id: this.data.id, ...this.formData.value })
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              this.snackBar.open('Sửa thành công 🚀🚀🚀', 'Đóng', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 3000,
              });
              this.tableData.getDataOnInit();
              // this.data.fetchData();
              this.matDialogRef.close();
              this.formData.reset();
            } else {
              this.snackBar.open('Lỗi 💣💣💣', 'Đóng', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 3000,
              });
            }
          },
          error: (error) => {
            this.snackBar.open('Lỗi 💣💣💣', 'Đóng', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            });
            console.log(error);
          },
        });
    }
  }

  deleteRecord() {
    const data = this.data;
    this.api.deleteRecord(data!.id as number).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Xóa thành công');
          this.tableData.getDataOnInit();
          this.matDialogRef.close();
          this.formData.reset();
        } else alert('Lỗi');
      },
      error: (error) => {
        alert('Lỗi');
        console.log(error);
      },
    });
  }
}
