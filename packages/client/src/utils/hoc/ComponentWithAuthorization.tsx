import { ComponentType } from 'react'
import { useAppSelector } from '../../store'
import { Navigate } from 'react-router-dom'

type WrappedProps = { Component: ComponentType; isPrivate: boolean }

export const ComponentWithAuthorization = <T extends WrappedProps>({
  Component,
  isPrivate,
  ...props
}: WrappedProps & T) => {
  const { loggedIn } = useAppSelector(state => state.auth)

  return (isPrivate && loggedIn) || (!isPrivate && !loggedIn) ? (
    <Component {...props} />
  ) : isPrivate ? (
    <Navigate to="/auth" replace={true}/>
  ) : (
    <Navigate to="/start" replace={true}/>
  )
}
