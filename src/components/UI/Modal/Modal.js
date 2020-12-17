import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const stylesToBeApplied = this.props.show ? styles.Show : styles.Remove;
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
        <div className={[styles.Modal, stylesToBeApplied].join(' ')}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  modalClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
