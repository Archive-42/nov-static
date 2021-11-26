const redux = require('redux');

//CONSTANTS MUST BE UNIQUE
const ADD_ONE = 'calculator/addOne';
const ADD = 'calculator/add';
const SUBTRACT = 'calculator/subtract';
const MULTIPLY = 'calculator/multiply';
const DIVIDE = 'calculator/divide';
const MAKE_FRUIT = 'fruit/addFruit';

//import store creation and combineReducer functions from redux
const { createStore, combineReducers } = redux;

//action is an object with a type
// {type:ADD_ONE}

//action creator
const addOne = () => {
  return {
    type: ADD_ONE
  };
};

const add = (num) => {
  return {
    type: ADD,
    payload: num
  };
};

const addFruit = (fruit) => {
  return {
    type: MAKE_FRUIT,
    payload: fruit
  };
};

const divide = (num) => {
  return {
    type: DIVIDE,
    payload: num
  };
};
const subtract = (num) => {
  return {
    type: SUBTRACT,
    payload: num
  };
};
const multiply = (num) => {
  return {
    type: MULTIPLY,
    payload: num
  };
};

// default state
const initialState = {
  total: 0
};

//reducer with initial state
const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE:
      return { ...state, total: state.total + 1 };
    case ADD:
      return { ...state, total: state.total + action.payload };
    case SUBTRACT:
      return { ...state, total: state.total - action.payload };
    case MULTIPLY:
      return { ...state, total: state.total * action.payload };
    case DIVIDE:
      return { ...state, total: state.total / action.payload };

    default:
      return state;
  }
};

//fruit reducer always takes a state and an action
// state is defaulted in the argument
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case MAKE_FRUIT:
      return [...state, action.payload];
    default:
      return state;
  }
};

//reducer to add to createStore
const rootReducer = combineReducers({
  calculatorReducer,
  fruitReducer
});

//create the store
const store = createStore(rootReducer);

// component getting State
const FruitComponent = () => {
  console.log('Fruit Component', store.getState());
};
// component getting State
const CalculatorComponent = () => {
  console.log('Calculator Component', store.getState());
};

//unsubscribe from store
const unsubscribeFruit = store.subscribe(FruitComponent);
const unsubscribeCalculator = store.subscribe(CalculatorComponent);

console.log(store.getState());
//dispatch the action creator
store.dispatch(addOne());
store.dispatch(addFruit('pear'));
//fruitComponent unsubscribes from the store
unsubscribeFruit();
store.dispatch(add(5));
store.dispatch(subtract(2));
