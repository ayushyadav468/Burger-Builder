import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axiosInstance from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import PropTypes from 'prop-types';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        label: 'Your Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      },
      email: {
        label: 'Your Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
      },
      street: {
        label: 'Your Street',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street',
        },
        value: '',
      },
      zipCode: {
        label: 'Your Zip Code',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code',
        },
        value: '',
      },
      country: {
        label: 'Your Country',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country',
        },
        value: '',
      },
      deliveryMode: {
        label: 'Delivery Method',
        elementType: 'dropdown',
        elementConfig: {
          option: [
            { name: 'fastest', displayName: 'Fastest' },
            { name: 'normal', displayName: 'Normal' },
          ],
        },
        value: '',
      },
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
    const inputElementArray = [];
    for (let key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {inputElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
          />
        ))}
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

export default withErrorHandler(ContactData, axiosInstance);
