import { SuDungData } from './SuDungData';

export interface PagingData {
  suDung: SuDungData;
  limit: number;
  currentPage: number;
}
