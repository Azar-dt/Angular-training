import { from, map, Observable } from 'rxjs';
import { SuDung } from '../types/SuDung';
import { SuDungData } from '../types/SuDungData';
// ID: id,
// MA: ma,
// TEN_NGAN: tenNgan,
// TEN_DAY_DU: tenDayDu,
// DIA_CHI_CN: diaChi,
// MA_SO_THUE: maSoThue,
// LIEN_HE_DIEN_TOAN: lienHeDienToan,
export const MapSuDungRes = (res: SuDung[]): SuDungData[] => {
  const source = from(res);
  let newDataSource: SuDungData[] = [];
  let ex;
  res[0].id
    ? (ex = source.pipe(
        map(
          ({
            id,
            ma,
            tenNgan,
            tenDayDu,
            diaChi,
            maSoThue,
            lienHeDienToan,
          }: any) => {
            return {
              id,
              ma,
              tenNgan,
              tenDayDu,
              diaChi,
              maSoThue,
              lienHeDienToan,
            };
          }
        )
      ))
    : (ex = source.pipe(
        map(
          ({
            ID: id,
            MA: ma,
            TEN_NGAN: tenNgan,
            TEN_DAY_DU: tenDayDu,
            DIA_CHI_CN: diaChi,
            MA_SO_THUE: maSoThue,
            LIEN_HE_DIEN_TOAN: lienHeDienToan,
          }: any) => {
            return {
              id,
              ma,
              tenNgan,
              tenDayDu,
              diaChi,
              maSoThue,
              lienHeDienToan,
            };
          }
        )
      ));
  ex.subscribe((val) => newDataSource.push(val));

  return newDataSource;
};
