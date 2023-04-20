import { ChangeEvent, ComponentType, useState } from 'react'
import { ValidationObj, useValidation } from '../hooks/validation.hook'
import { DataAuth, DataRegister } from '../../typings/appTypes'
import { Subtract } from 'utility-types'

//type Subtract<A, C> = A extends C ? never : A;

export interface CustomComponentProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  validObj: ValidationObj
  dataForm: DataAuth | DataRegister
}

//type form = DataAuth|DataRegister|{}

export const ComponentWithValidation = <T extends CustomComponentProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<Subtract<T, CustomComponentProps>> => {
  const NewComponent = () => {
    const componentName = WrappedComponent.name
    const [dataForm, onChangeDataForm] = useState<
      CustomComponentProps['dataForm']
    >(
      componentName === 'Login'
        ? { login: '', password: '' }
        : {
            login: '',
            first_name: '',
            second_name: '',
            password: '',
            email: '',
            phone: '',
          }
    )

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
    }

    return <WrappedComponent {...(propsComp as T)} />
  }
  return NewComponent
}
