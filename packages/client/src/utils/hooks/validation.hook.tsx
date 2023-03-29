import { ChangeEvent, useState } from 'react'

enum ErrorMessages {
  Email = 'Невалидный email',
  Login = 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  FirstNameOrSecondName = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  Password = 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  PasswordRepeat = 'пароль не совпадает',
  Phone = 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
  Message = 'не должно быть пустым',
}

interface IValidationObj {
  [key: string]: { valid: boolean; text: string }
}

export const useValidation = (): [
  IValidationObj,
  (e: ChangeEvent<HTMLInputElement>) => void
] => {
  const [objValidation, setObjValidation] = useState<IValidationObj>({})
  const [passwordValid, setPasswordValid] = useState<string>('')

  const validation = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement
    switch (input.name) {
      case 'email':
        email(input)
        break

      case 'login':
        login(input)
        break

      case 'first_name':
        firstNameOrSecondName(input)
        break

      case 'second_name':
        firstNameOrSecondName(input)
        break

      case 'phone':
        phone(input)
        break

      case 'message':
        message(input)
        break
      case 'password':
        password(input)
        break
      case 'passwordRepeat':
        passwordRepeat(input)
        break
      case 'display_name':
        login(input)
        break
      case 'oldPassword':
        password(input)
        break
      case 'newPassword':
        password(input)
        break

      default:
        break
    }
  }
  const email = (input: HTMLInputElement) => {
    if (/^[\w]+@[\w]+\.[A-Za-z]{2,}$/i.test(input.value)) {
      setObjValidation(state => ({
        ...state,
        email: { valid: true, text: '' },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        email: {
          valid: false,
          text: 'Невалидный email',
        },
      }))
    }
  }
  const login = (input: HTMLInputElement) => {
    if (
      /^[\w]{3,20}$/i.test(input.value) &&
      input.value.match(/\D/gi)?.length &&
      !input.value.match(/[`~!@#$%^&*()|+=?;:'",.<>{}[]\\\/]/gi)?.length
    ) {
      setObjValidation(state => ({
        ...state,
        [input.name === 'login' ? 'login' : 'displayName']: {
          valid: true,
          text: '',
        },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        [input.name === 'login' ? 'login' : 'displayName']: {
          valid: false,
          text: ErrorMessages.Login,
        },
      }))
    }
  }
  const firstNameOrSecondName = (input: HTMLInputElement) => {
    if (
      (/^[A-Z][A-Za-z]+$/.test(input.value) ||
        /^[А-Я][А-Яа-яЁё]+$/.test(input.value)) &&
      !input.value.match(/[`~!@#$%^&*()|+=_?;:'",.<>{}[]\\\/]/gi)?.length
    ) {
      setObjValidation(state => ({
        ...state,
        [input.name === 'first_name' ? 'firstName' : 'secondName']: {
          valid: true,
          text: '',
        },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        [input.name === 'first_name' ? 'firstName' : 'secondName']: {
          valid: false,
          text: ErrorMessages.FirstNameOrSecondName,
        },
      }))
    }
  }
  const password = (input: HTMLInputElement) => {
    if (
      /\w{8,40}/.test(input.value) &&
      input.value.match(/[A-Z]/g) &&
      input.value.match(/\d/g)
    ) {
      setObjValidation(state => ({
        ...state,
        password: { valid: true, text: '' },
      }))
      setPasswordValid(input.value)
    } else {
      setObjValidation(state => ({
        ...state,
        password: {
          valid: false,
          text: ErrorMessages.Password,
        },
      }))
    }
  }
  const passwordRepeat = (input: HTMLInputElement) => {
    if (passwordValid === input.value) {
      setObjValidation(state => ({
        ...state,
        passwordRepeat: { valid: true, text: '' },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        passwordRepeat: {
          valid: false,
          text: ErrorMessages.PasswordRepeat,
        },
      }))
    }
  }
  const phone = (input: HTMLInputElement) => {
    if (/^\+?\d{10,15}$/.test(input.value)) {
      setObjValidation(state => ({
        ...state,
        phone: { valid: true, text: '' },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        phone: {
          valid: false,
          text: ErrorMessages.Phone,
        },
      }))
    }
  }
  const message = (input: HTMLInputElement) => {
    if (input.value.length !== 0) {
      setObjValidation(state => ({
        ...state,
        message: { valid: true, text: '' },
      }))
    } else {
      setObjValidation(state => ({
        ...state,
        message: {
          valid: false,
          text: ErrorMessages.Message,
        },
      }))
    }
  }
  return [objValidation, validation]
}
