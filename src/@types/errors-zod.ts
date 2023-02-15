export type ErrorsZod =
  | {
      message: string;
      path: (string | number)[];
    }
  | undefined;
