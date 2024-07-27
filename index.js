const { createStore } = require('redux');

const ADD_TODO = 'ADD_TODO';
const DALET_TODO = 'DALET_TODO';
const EDIT_TODO = 'EDIT_TODO'; // UPDATE_TODO ni EDIT_TODO deb o'zgartirdik
const GET_TODOS = 'GET_TODOS';

const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), task }
});

const daletTodo = (id) => ({
  type: DALET_TODO,
  payload: id
});

// EDIT_TODO funksiyasi
const editTodo = (id, newTask) => ({
  type: EDIT_TODO,
  payload: { id, task: newTask }
});

const getTodos = () => ({
  type: GET_TODOS
});

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case DALET_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };

    case EDIT_TODO: // Bu yerda UPDATE_TODO o'rniga EDIT_TODO ishlatiladi
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, task: action.payload.task } : todo
        )
      };

    case GET_TODOS:
      console.log(state.todos);
      return state;

    default:
      return state;
  }
};

const store = createStore(todoReducer);

store.subscribe(() => console.log('State yangilandi:', store.getState()));

const todos = store.getState().todos;
const firstTodoId = todos[0].id; // Birinchi todo ID'sini olish
store.dispatch(addTodo('Learn Redux'));
store.dispatch(addTodo('Build a Redux app'));
// store.dispatch(getTodos());
// store.dispatch(editTodo(firstTodoId, 'Learn Redux Basics')); // TODO yangilash (edit)
// store.dispatch(daletTodo(firstTodoId)); // TODO o'chirish
// store.dispatch(getTodos());
