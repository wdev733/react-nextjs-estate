import React, { Component } from 'react'
import {
  ItemPageInfoTitle, Content,
  StarsRating, FlexGrid
} from 'components'
import { StarsRatingContainer } from 'containers'
import s from './ItemPageRating.sass'


const ItemPageRating = ({value, edit, data}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Рейтинг объекта"/>
      <FlexGrid justify="start" align="center">
        <Content lightColor light size="2">
          {data.name}
        </Content>
        {edit && <StarsRatingContainer __value={value} className={s.stars}/>}
        {!edit && value != null && <StarsRating value={value} className={s.stars}/>}
      </FlexGrid>
    </div>
  )
};

export default ItemPageRating;

