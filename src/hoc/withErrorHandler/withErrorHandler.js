import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class errorMessage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentDidMount() {
      this.reqInterceptor = axiosInstance.interceptors.request.use((req) => {
        this.setState = { error: null };
        return req;
      });
      this.resInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        'Will Unmount is called',
        this.reqInterceptor,
        this.resInterceptor
      );
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
