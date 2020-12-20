import React, { Component } from 'react';
import styles from './BurgerBuilder.module.css';
import div from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
  salad: 20,
  cheese: 40,
  meat: 100,
  bacon: 120,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 50,
    isPurchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    axiosInstance
      .get(
        'https://burger-builder-61128-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  purchasableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ isPurchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const newIngredient = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newIngredient;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.purchasableHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldIngredient = this.state.ingredients[type];
    if (oldIngredient <= 0) {
      return;
    }
    const newIngredient = oldIngredient - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = newIngredient;
    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.purchasableHandler(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseContinueHandler = () => {
    // alert('Continue Clicked');
    this.setState({ loading: true });
    const order = {
      id: this.state.id,
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      user: {
        name: 'Test Name',
        email: 'testemail@gmail.com',
        address: {
          street: 'test street',
          state: 'test state',
          country: 'test country',
        },
        deliveryMode: 'fastest',
      },
    };
    axiosInstance
      .post('/orders.json', order)
      .then((response) => {
        // console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? (
      <p style={{ textAlign: 'center' }}>
        Can not reach firebase to load ingredients. Check Internet
      </p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <div className={styles.BurgerBuilder}>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.isPurchasable}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
