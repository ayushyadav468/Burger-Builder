import React from 'react';
import styles from './Order.module.css';

const order = (props) => (
  <div className={styles.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>
      Price: <strong>Rs.250</strong>
    </p>
  </div>
);

export default order;
