const { createStore } = require('redux');

const ADD_TODO = 'ADD_TODO'; 
const DELET_TODO = 'REMOVE_TODO'; 
const UPDATE_TODO = 'UPDATE_TODO'; 
const GET_TODOS = 'GET_TODOS'; 

const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), task } 
});


const daletTodo = (id) => ({
  type: DELET_TODO,
  payload: id 
});

const updateTodo = (id, newTask) => ({
  type: UPDATE_TODO,
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

    case DELET_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) }; 

    case UPDATE_TODO:
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

store.dispatch(addTodo('lorem')); 
store.dispatch(getTodos()); 
// store.dispatch(updateTodo(1, 'Learn Redux Basics'));
// store.dispatch(daletTodo(1)); 
// store.dispatch(getTodos()); 
