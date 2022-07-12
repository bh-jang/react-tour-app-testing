import OrderContext, { OrderContextProvider } from './contexts/OrderContext';
import logo from './logo.svg';
import OrderPage from './pages/OrderPage/OrderPage';

function App() {
  return (
    <div className="App" style={{ padding: "4rem" }}>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
}

export default App;
