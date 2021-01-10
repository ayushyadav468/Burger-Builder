import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import styles from './Order.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log('[OrderSummary component did update]');
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: 'capitalize' }}>{igkey}</span>:{' '}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>The burger you build with ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: Rs. {this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  purchaseCancel: PropTypes.func,
  purchaseContinue: PropTypes.func,
};

export default OrderSummary;
