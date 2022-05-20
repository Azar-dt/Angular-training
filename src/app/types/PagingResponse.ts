import { SuDungData } from './SuDungData';

export interface PagingResponse {
  suDungs: SuDungData[];
  total: number;
}
