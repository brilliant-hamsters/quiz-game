import { ChangeEvent, ComponentType, useState } from 'react'
import { ValidationObj, useValidation } from '../hooks/validation.hook'
import {
  DataAuth,
  DataMessage,
  DataProfile,
  DataRegister,
} from '../../typings/appTypes'
import { Subtract } from 'utility-types'

export interface CustomComponentProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  validObj: ValidationObj
  dataForm: DataAuth | DataRegister | DataProfile | DataMessage
}

export const ComponentWithValidation = <T extends CustomComponentProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<Subtract<T, CustomComponentProps>> => {
  const NewComponent = (props:Subtract<T, CustomComponentProps>) => {
    const componentName = WrappedComponent.name
    const [dataForm, onChangeDataForm] = useState<
      CustomComponentProps['dataForm']
    >(getInitObject())

    function getInitObject():
      | DataAuth
      | DataProfile
      | DataRegister
      | DataMessage {
      switch (componentName) {
        case 'Login':
          return { login: '', password: '' } as DataAuth
        case 'Profile':
          return {
            login: '',
            first_name: '',
            second_name: '',
            display_name: '',
            email: '',
            phone: '',
            newPassword: '',
            oldPassword: '',
          } as DataProfile
        case 'Register':
          return {
            login: '',
            first_name: '',
            second_name: '',
            password: '',
            email: '',
            phone: '',
          } as DataRegister
        default:
          return { text: '' } as DataMessage
      }
    }

    const [validObj, setValidity] = useValidation()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const nameInput = e.target.name
      onChangeDataForm({ ...dataForm, [nameInput]: value })
      console.log(componentName)
      setValidity(e)
    }
    const propsComp = {
      onChange: onChange,
      validObj: validObj,
      dataForm: dataForm,
      ...props
    }

    return <WrappedComponent {...(propsComp as T)} />
  }
  return NewComponent
}
