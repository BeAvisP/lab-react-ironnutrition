import React from 'react';
import 'bulma/css/bulma.css';
import foods from '../../foods.json';
import FoodBox from '../foodbox/FoodBox';
import FoodForm from '../FoodForm/FoodForm';

export default class FoodList extends React.Component {
  state = {
    foods: foods.map((food, index) => ({
      ...food,
      id: `${food.name}${index}`,
    })),
    showAddForm: false,
  };

  onFoodChange = (food) => {
    this.setState((previous) => {
      const index = previous.foods.findIndex(
        (element) => element.id === food.id
      );
      return {
        foods: [
          ...previous.foods.slice(0, index),
          food,
          ...previous.foods.slice(index + 1),
        ],
      };
    });
  };

  addFood = (food) => {
    const arrayCopy = [...this.state.foods];
    arrayCopy.push(food);

    this.setState({ foods: arrayCopy });
  };

  showAddForm() {
    const arrayCopy = [...this.state.foods];
    const showForm = !this.state.showAddForm;

    this.setState({ foods: arrayCopy, showAddForm: showForm });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.showAddForm()}>Add food</button>
        {this.state.showAddForm ? (
          <FoodForm addFood={(food) => this.addFood(food)} />
        ) : (
          ''
        )}
        <div className="foods-container">
          {this.state.foods.map((food, index) => {
            return (
              <FoodBox
                {...food}
                onChange={this.onFoodChange}
                key={`${food.name}${index}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
