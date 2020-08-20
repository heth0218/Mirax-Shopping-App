import React, { useState } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux'
import ShopNavigator from './navigation/ShopNavigator'
import productReducer from './store/reducers/products'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import cartReducer from './store/reducers/cart'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
})

const store = createStore(rootReducer, composeWithDevTools())

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={() => {
      setFontLoaded(true)
    }} />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

