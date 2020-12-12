import React from 'react';
import styles from './Modal.module.css';

const modal = (props) => {
  const stylesToBeApplied = props.show ? styles.Show : styles.Remove;
  return (
    <div className={styles.Modal + ' ' + stylesToBeApplied}>
      {props.children}
    </div>
  );
};

export default modal;
