import * as actions from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = { ingredients: null, price: 4 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return state;
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
  this.updatePurchaseState(updatedIngredients);
};

export default reducer;
