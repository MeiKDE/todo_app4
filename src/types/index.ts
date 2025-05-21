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
