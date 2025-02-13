export interface TodoContextType {
  filteredTodoList: TodoItemType[];
  setFilterType: (arg: true | false | null) => void;
  handleAddTodo: (nTodo: TodoItemType["name"]) => Error | TodoItemType;
  handleUpdateTodo: (nTodo: TodoItemType) => TodoItemType;
  handleDeleteTodo: (dTodoId: TodoItemType["id"]) => string;
  handleMoveTodo: (way: "up" | "down", id: string) => void;
}

export interface TodoItemType {
  id: string;
  name: string;
  completed: boolean;
}
