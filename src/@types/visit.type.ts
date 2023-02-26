import { VisitDto } from '../visit';

export type TypeCreateVisit = Omit<VisitDto, 'id'>;
export type TypeVisit = Omit<VisitDto, 'id' | 'visitor_id'>;

export type TypeVisitPaginator<T> = {
  content: Content<T>;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};
type Content<T> = Array<T>;

export type TypeVisitByVisitorResponse = {
  status: boolean;
  visitorName?: string;
  secretaryName?: string;
  badgeNumber?: string;
};

export type TypeVisitByBadgeResponse = {
  visitId?: string;
  statusVisit: boolean;
};
