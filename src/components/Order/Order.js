import React from 'react';
import styles from './Orders.module.css';

const order = (props) => (
  <div className={styles.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>
      Price: <stron>Rs.250</stron>{' '}
    </p>
  </div>
);

export default order;
