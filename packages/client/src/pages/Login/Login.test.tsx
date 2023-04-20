import React from 'react';
import { render, screen} from "@testing-library/react"
import Login  from './Login';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom'
import useEvent from "@testing-library/user-event"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('Компонент Логин', () => {
  const {asFragment} = render(
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )

  test('-> Input must be in the login ', () => {
      expect(screen.getByLabelText<HTMLSelectElement>('Логин')).toBeInTheDocument();
  })

  test('-> Changing an input when entering a value', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    )
     await useEvent.type(screen.getByLabelText<HTMLInputElement>('Логин'), "TestID");
     await useEvent.type(screen.getByLabelText<HTMLInputElement>('Пароль'), "TestPassword");

    expect(screen.getByLabelText<HTMLSelectElement>(/Логин/i).value).toBe("TestID");
    expect(screen.getByLabelText<HTMLSelectElement>(/Пароль/i).value).toBe("TestPassword")
  });

  test('-> Login snapshot', async () => {
    expect(asFragment()).toMatchSnapshot();
  });
})


