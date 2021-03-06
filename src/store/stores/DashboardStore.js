import React from 'react'
import { observable, reaction, computed } from 'mobx'
import { store } from 'store'
import { statusTypes } from 'constants'

import coolIcon from 'images/emoji/1.png'
import fiveIcon from 'images/emoji/2.png'
import kindIcon from 'images/emoji/3.png'
import spyIcon from 'images/emoji/4.png'
import eyesIcon from 'images/emoji/5.png'
import starsIcon from 'images/emoji/6.png'

class DashboardStore {
  @computed get data() {
    return [
      ...this.notifications,
      ...this.promotion,
      ...this.tips,
    ];
  }
  @observable notifications = [];
  @observable promotion = [];
  @observable tips = [];

  bannedSlide = () => ({
    color: '#37474f',
    title: (
      <span>
        Мы подозреваем, что Вы агент. <br/>
        Ваш аккаунт и объявления заблокированы.
      </span>
    ),
    icon: spyIcon,
    buttons: [
      {
        children: 'Связь с модератором',
        type: 'gray'
      },
      {
        children: 'Подробнее',
        type: 'text'
      }
    ]
  });
  restrictedSlide = ({link, _link}) => ({
    color: '#616161',
    title: (
      <span>
          Объявление не прошло проверку. <br/>
          Пожалуйста, исправьте ошибки, мы проверим все ещё раз.
        </span>
    ),
    icon: eyesIcon,
    buttons: [
      {
        children: 'Исправить',
        type: 'blue',
        to: `/manage/${_link || link}`
      },
      {
        children: 'Связь с модератором',
        type: 'text'
      }
    ]
  });
  justCreatedSlide = ({link, _link}) => ({
    color: '#1976d2',
    title: (
      <span>
          Ваше объявление успешно добавлено.
          Мы опубликуем его после проверки.
        </span>
    ),
    icon: starsIcon,
    buttons: [
      {
        children: 'Просмотр',
        type: 'pink',
        to: `/y/${_link || link}`
      },
      {
        children: 'Изменить',
        type: 'text',
        to: `/manage/${_link || link}`
      }
    ]
  });
  verifiedSlide = () => ({
    color: '#448aff',
    title: (
      <span>
          Ура! Ваш аккаунт подтвержден. <br/>
          Теперь Вы можете опубликовать свое первое объявление.
        </span>
    ),
    icon: coolIcon,
    buttons: [
      {
        children: 'Начать',
        type: 'pink',
        to: '/manage/create'
      },
      {
        children: 'Подробнее',
        type: 'text'
      }
    ]
  });
  notVerifiedSlide = user => ({
    color: '#ff8a80',
    title: (
      <span>
        Здравствуйте!<br/>
        Мы отправили Вам на почту письмо для активации аккаунта.
      </span>
    ),
    icon: fiveIcon,
    buttons: [
      {
        children: 'Повторить',
        type: 'blue',
        onClick: () => {
          store.user.verify();
        }
      },
      {
        children: 'Подробнее',
        type: 'text'
      }
    ]
  });
  onModerationSlide = ({link, _link}) => ({
    color: '#42d08a',
    title: (
      <span>
        Ваше объявление успешно отредактировано.
        Мы опубликуем его после проверки.
      </span>
    ),
    icon: kindIcon,
    buttons: [
      {
        children: 'Просмотр',
        type: 'blue',
        to: `/y/${_link || link}`
      },
      {
        children: 'Изменить',
        type: 'text',
        to: `/manage/${_link || link}`
      }
    ]
  });

  addNotification = data => {
    this.notifications.push(data);
  }

  onUserChange = (user, objects) => {
    this.notifications.replace([]);

    const { addNotification } = this;
    const hasObjects = !!objects && !!objects.length || false;
    const statuses = statusTypes.types;
    if (user.banned) {
      return addNotification(
        this.bannedSlide(user)
      )
    }

    // if user verified and did not create an objects
    if (user.verified && !hasObjects) {
      addNotification(this.verifiedSlide(user))
    }

    // if user not verified
    if (!user.verified) {
      addNotification(this.notVerifiedSlide(user))
    }

    if (hasObjects) {
      const restricted = objects.find(
        item => item.status === statuses[2].id
      );

      if (restricted) {
        addNotification(this.restrictedSlide(restricted))
      }
    }

    if (hasObjects) {
      const onModeration = objects.find(item => {
        if (item.justCreated) {
          return false;
        }

        const itemStatus = item.status;
        const statusType = statuses[0];

        return itemStatus.id
          ? itemStatus.id === statusType.id
          : itemStatus === statusType.id
      });

      if (onModeration) {
        addNotification(this.onModerationSlide(onModeration))
      }
    }

    if (hasObjects) {
      const justCreated = objects.find(
        item => item.justCreated
      );
      if (justCreated) {
        addNotification(this.justCreatedSlide(justCreated))
      }
    }
  };

  update = (user, items) => {
    this.onUserChange(user || store.user, items || store.items.users);

    this.subscribeToUserStore();
    this.subscribeToUserObjects();
  }

  subscribeToUserStore = () => reaction(
    () => {
      if (!store) {
        return {}
      }

      const { verified, banned } = store.user;
      return { verified, banned };
    },
    user => this.onUserChange(store.user, store.items.users)
  )
  subscribeToUserObjects = () => reaction(
    () => {
      if (!store) {
        return {}
      }

      return {
        data: store.items.users.map(({justCreated, status}) => ({
          justCreated, status,
        }))
      }
    },
    ({data}) => this.onUserChange(store.user, store.items.users)
  )
}

export default new DashboardStore();
