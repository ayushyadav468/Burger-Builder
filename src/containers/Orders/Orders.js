import React, { Component } from 'react';
import axiosInstance from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    isloading: true,
  };

  componentDidMount() {
    axiosInstance
      .get('/orders.json')
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            id: key,
            ...res.data[key],
          });
        }
        this.setState({ isloading: false, orders: fetchOrders });
      })
      .catch((e) => {
        this.setState({ isloading: false });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosInstance);
