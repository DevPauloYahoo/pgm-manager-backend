import { VisitDto } from '../visit';

export type TypeCreateVisit = Omit<VisitDto, 'id'>;
export type TypeVisit = Omit<VisitDto, 'id' | 'visitor_id'>;
