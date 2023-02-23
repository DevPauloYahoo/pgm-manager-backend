import { TypeVisit } from '../@types';

export interface VisitorDto {
  id: string;
  name: string;
  document: string;
  visit?: TypeVisit;
}
