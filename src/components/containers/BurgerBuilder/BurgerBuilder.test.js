import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BuilderBurger";
import BuildControls from "../../Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
  wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
});

describe("<BurgerBulder />", () => {
  it("should render <BuildControls /> if receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
