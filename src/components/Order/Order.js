import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
  let ingredientsTemp = [];
  for (let key in props.ingredients) {
    ingredientsTemp.push({ name: key, amout: props.ingredients[key] });
  }

  const ingredients = ingredientsTemp.map((item) => {
    return (
      <span
        key={item.name}
        style={{
          textTransform: 'capitalize',
          border: '1px solid #ccc',
          padding: '5px',
          margin: '0 5px',
          display: 'inline-block',
        }}
      >
        {item.name} ({item.amount})
      </span>
    );
  });

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>Rs. {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
