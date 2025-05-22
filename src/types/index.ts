export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoAddInput = {
  title: string;
  description?: string;
  createdAt: Date;
};

export type TodoUpdateInput = {
  id: number;
  title?: string;
  description?: string;
  completed: boolean;
  updatedAt: Date;
};

export type ErrorHandlers = {
  //A string that likely serves as a default or fallback error message when no specific message is provided.
  fallbackMessage: string;
  //A method (function) that takes a string argument (msg) and returns void (i.e., no //return value).
  setHttpError: (msg: string) => void;
  //Similar to setHttpError, but likely for errors that are not specific to HTTP — more general or application-wide issues.
  setGlobalError: (msg: string) => void;
};
