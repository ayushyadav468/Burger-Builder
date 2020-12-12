import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  const stylesToBeApplied = props.show ? styles.Show : styles.Remove;
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClose} />
      <div className={[styles.Modal, stylesToBeApplied].join(' ')}>
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
