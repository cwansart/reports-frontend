import { Selection } from '../selections/selection';

export interface Report {
  creationDate: Date;
  processingDate: Date;
  selection: Selection[];
  freeText: string;
}

export interface CreateReport {
  creationDate: string;
  selectionIds: number[];
  freeText?: string;
}
