import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  CheckoutPrices,
  LoadingAnimation
} from 'components'
import s from './CheckoutPage.sass'

const mapStateToProps = ({payment: {isFetching}, subscription}) => ({
  isFetching, sub: subscription
});

@inject(mapStateToProps) @observer
export default class CheckoutPage extends Component {
  isInitial = true;
  getType = type => {
    return this.props.sub.data.find(it => it.name === type)
  };

  close = () => {
    this.props.sub.setTemp(null);
    this.props.history.push('/checkout/info');
  };

  componentDidMount() {
    this.isInitial = false;
  }

  render() {
    const {
      isFetching,
      match: {params: {stage, type}},
      location: {pathname},
      sub: {temp}
    } = this.props;

    const subType = this.getType(type);
    let redirect, props = {};

    if (temp.name || this.isInitial && type) {
      redirect = `/checkout/payment/${temp.name || type}`;
      props = {isPayment: true, isBanner: false, paymentData: subType};
    } else {
      redirect = '/checkout/info';
      props = {isPayment: false, isBanner: true, paymentData: {}};
    }

    if (pathname === redirect)
      redirect = null;

    return (
      <section className={s.wrapper}>
        <Helmet>
          <title>Оплата подписки</title>
        </Helmet>
        <CheckoutPrices onCloseClick={this.close} {...props}/>
        {isFetching && <LoadingAnimation />}
        {redirect && <Redirect to={redirect}/>}
      </section>
    )
  }
}

