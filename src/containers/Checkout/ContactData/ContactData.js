import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axiosInstance from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import PropTypes from 'prop-types';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.setState({ loading: true });
    const order = {
      id: this.state.id,
      ingredients: this.props.ingredients,
      price: this.props.price,
      user: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.street,
          state: 'test state',
          country: 'test country',
        },
        deliveryMode: 'fastest',
      },
    };
    axiosInstance
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postalCode"
          placeholder="Your postal code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Details</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
};

export default ContactData;
