export interface Todo {
  id: number; //unique identifier, auto set by database
  title: string;
  description?: string;
  completed: boolean; //default as false
  createdAt: Date; // default as current date
  updatedAt: Date; // default as current date
}

export type TodoAddInput = {
  title: string;
  description?: string;
};

export type TodoUpdateInput = {
  title: string;
  description?: string;
  completed: boolean;
  updatedAt: Date;
};
