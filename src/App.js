import React from 'react';
import classNames from 'classnames';
import './App.scss';

const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

class App extends React.Component {
  state = {
    goods: [...goodsFromServer],
    selectedGoods: ['Jam'],
  }

  addItem = (good) => {
    this.setState(prevState => ({
      selectedGoods: [...prevState.selectedGoods, good],
    }));
  }

  removeItem = (good) => {
    this.setState(prevState => ({
      selectedGoods: prevState.selectedGoods.filter(el => el !== good),
    }));
  }

  removeAll = () => {
    this.setState(({
      selectedGoods: [],
    }));
  }

  selectedGoodssTitle = () => {
    const { selectedGoods } = this.state;
    const selected = [...selectedGoods];
    const last = selected.splice(selected.length - 1, 1);

    switch (selectedGoods.length) {
      case 0:
        return 'No goods selected';
      case 1:
        return `${selectedGoods} is selected`;
      case 2:
        return `${selectedGoods[0]} and ${selectedGoods[1]} are selected`;
      default:
        return `${selected.map(good => ` ${good}`)} and ${last} are selected`;
    }
  };

  render() {
    const { selectedGoods } = this.state;

    return (
      <div className="App">
        <div className="App__wrapper">
          <h1 className="App__wrapper--title">
            {this.selectedGoodssTitle()}
          </h1>
          {!!selectedGoods.length && (
          <button
            type="button"
            className="App__wrapper--button"
            onClick={this.removeAll}
          >
            X
          </button>
          )}
        </div>
        <ul className="App__list">
          {this.state.goods.map(good => (
            <li
              key={good}
              className={classNames('App__list--item', {
                selected: selectedGoods.includes(good),
              })}
            >
              <span className="App__list--title">
                {good}
              </span>
              {!selectedGoods.includes(good)
                ? (
                  <button
                    type="button"
                    className="App__list--button"
                    onClick={() => this.addItem(good)}
                  >
                    Select
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="App__list--button remove"
                    onClick={() => this.removeItem(good)}
                  >
                    Remove
                  </button>
                )
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;