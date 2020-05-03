import * as actionsList from "./actions";

const initialState = {
  ingredients: { salad: 0, cheese: 0, meat: 0, bacon: 0 },
  price: 4,
  purchasable: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const burgerReducer = (state = initialState, action) => {
  console.log("[reducer.js] in reducer method", action);
  switch (action.type) {
    case actionsList.ADD_INGREDIENT:
      return addIngredientHandler(state, action.newIngredType);
    case actionsList.REMOVE_INGREDIENT:
      return removeIngredientHandler(state, action.oldIngredType);
    case actionsList.UPDATE_PURCHASE_STATE:
      return updatePurchaseState(state);
    default:
      return state;
  }
};

const addIngredientHandler = (state, type) => {
  const oldCount = state.ingredients[type];
  const updatedCount = oldCount + 1;
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[type] = updatedCount;
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = state.price;
  const newPrice = oldPrice + priceAddition;
  return {
    ...state,
    ingredients: updatedIngredients,
    price: newPrice,
  };
};

const removeIngredientHandler = (state, type) => {
  const oldCount = state.ingredients[type];
  const updatedCount = oldCount - 1 >= 0 ? oldCount - 1 : 0;
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[type] = updatedCount;
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = state.price;
  const newPrice = oldPrice - priceAddition;
  return {
    ...state,
    ingredients: updatedIngredients,
    price: newPrice,
  };
};

const updatePurchaseState = (state) => {
  const sum = Object.values(state.ingredients).reduce((sum, el) => {
    return sum + el;
  }, 0);
  return {
    ...state,
    purchasable: sum > 0,
  };
};

export default burgerReducer;
