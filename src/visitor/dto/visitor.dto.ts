export type TypeCreateVisitorDto = {
  id: string;
  name: string;
  document: string;
  visits: TypeVisitToVisitor[];
};

export type TypeVisitToVisitor = {
  badge: string;
  secretary: string;
};
