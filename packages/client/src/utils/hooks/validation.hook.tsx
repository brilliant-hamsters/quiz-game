import { ChangeEvent, useState } from 'react'

type FormFields =
  | 'email'
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'phone'
  | 'message'
  | 'password'
  | 'passwordRepeat'
  | 'display_name'
  | 'oldPassword'
  | 'newPassword'

type ErrorMessages =
  | Exclude<
      FormFields,
      | 'first_name'
      | 'second_name'
      | 'display_name'
      | 'oldPassword'
      | 'newPassword'
    >
  | 'FirstNameOrSecondName'

const errorMessages: { [key in ErrorMessages]: string } = {
  email: 'невалидный email',
  login:
    'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  FirstNameOrSecondName:
    'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  password:
    'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  passwordRepeat: 'пароль не совпадает',
  phone: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
  message: 'не должно быть пустым',
}

type ValidationObj = {
  [key in FormFields]?: { valid: boolean; text: string }
}
export const useValidation = (): [
  ValidationObj,
  (e: ChangeEvent<HTMLInputElement>) => void
] => {
  const [objValidation, setObjValidation] = useState<ValidationObj>({})
  const [passwordValid, setPasswordValid] = useState<string>('')

  const validation = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement
    const inputName = input.name as FormFields
    switch (inputName) {
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
          text: errorMessages.email,
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
          text: errorMessages.login,
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
          text: errorMessages.FirstNameOrSecondName,
        },
      }))
    }
  }
  const password = (input: HTMLInputElement) => {
    const typePassword =
      input.name === 'password'
        ? 'password'
        : input.name === 'oldPassword'
        ? 'oldPassword'
        : 'newPassword'
    if (
      /\w{8,40}/.test(input.value) &&
      input.value.match(/[A-Z]/g) &&
      input.value.match(/\d/g)
    ) {
      setObjValidation(state => ({
        ...state,
        [typePassword]: { valid: true, text: '' },
      }))
      setPasswordValid(input.value)
    } else {
      setObjValidation(state => ({
        ...state,
        [typePassword]: {
          valid: false,
          text: errorMessages.password,
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
          text: errorMessages.passwordRepeat,
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
          text: errorMessages.phone,
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
          text: errorMessages.message,
        },
      }))
    }
  }
  return [objValidation, validation]
}
