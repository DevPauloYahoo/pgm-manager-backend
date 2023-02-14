export type createVisitDto = Omit<Visit, 'id'>;

export type Visit = {
  id: string;
  badge: string;
  secretary: string;
  visitor_id: string;
};
