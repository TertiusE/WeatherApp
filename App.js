import WeatherApp from './WeatherApp';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from './redux/store';


export default function App() {
  
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
}

