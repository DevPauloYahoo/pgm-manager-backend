import { VisitorDto } from '../visitor';

export type TypeCreateVisitor = Omit<VisitorDto, 'id'>;

export type TypeVisitorPaginator<T> = {
  content: Content<T>;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};
type Content<T> = Array<T>;

export type TypeIsExistsCPF =
  | {
      document: string;
    }
  | TypeErrorResponse
  | null;

type TypeErrorResponse = {
  message: string;
};
