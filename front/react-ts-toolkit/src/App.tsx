import React, {useEffect, useRef, useState} from 'react';
import config from "./config";
import styled from "styled-components";
import loadScript from "./hooks/loadScript";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from  'react-loader-spinner'



const DEFAULT_GENERATE_PARAMS = {amount: 100, country: "IL", currency: "USD"};

function App() {
  const [checkoutObject, setCheckoutObject] = useState<Record<string, any> | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const checkoutWasFetched = useRef(false); // React 18 StrictMode https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
  const [checkoutId, setCheckoutId] = useState('');
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState<Record<string, any> | null>(null)
  useEffect(() => {
      if (checkoutWasFetched.current === false) {
          checkoutWasFetched.current = true;
          loadScript('rapyd-toolkit-script', 'https://sandboxcheckouttoolkit.rapyd.net');
          const generateCheckout = async () => {
              // will be generated according to a specific product id in the backend of the merchant
              setGenerating(true);
              const response = await fetch(`${config.baseURL}/checkout`, {headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }, method: 'POST', body: JSON.stringify(DEFAULT_GENERATE_PARAMS)});
              if (!response.ok) {
                  setError(`Something went wrong, ${response.statusText}`)
              }
              const {id} = await response.json();
              setGenerating(false);
              return id;
          };
          generateCheckout().then(id => setCheckoutId(id)).catch(e => setError(e.message));
      }
  }, []);
  useEffect(() => {
      if (!checkoutId) return;
      const checkout = new (window as any).RapydCheckoutToolkit({
          pay_button_text: "Click to pay",
          // Text that appears on the 'Pay' button.
          // String. Maximum length is 16 characters.
          // Default is "Place Your Order". Optional.
          pay_button_color: "blue",
          // Color of the 'Pay' button. String.
          // Standard CSS color name or hexadecimal code such as #323fff.
          // Default is the color that is returned in the 'merchant_color'
          // field of the response to 'Create Checkout Page'. Optional.
          id: checkoutId,
          // ID of the 'Create Checkout Page' response. String. Required.
          close_on_complete: true,
          // Causes the embedded Rapyd Checkout Toolkit window to close
          // when the payment is complete. Boolean. Default is 'true'. Optional.
          page_type: "collection",
          meta: {}
      });
      window.addEventListener('onCheckoutPaymentSuccess', (event) => {
          const payment = (event as any).detail;
          setPayment(payment);
      })

      window.addEventListener('onCheckoutPaymentFailure', (event) => {
          setError((event as any).detail.error);
      });
      window.addEventListener('onCheckoutFailure', (event) => {
          setError((event as any).detail.error);
      });

      window.addEventListener('onLoading', (event) => {
          const loading = (event as any).detail.loading;
          setLoading(loading);
      })
      setCheckoutObject(checkout);
  }, [checkoutId]);
  const loadCheckout = () => {
    if (checkoutObject) {
        checkoutObject.displayCheckout();
        setCheckoutOpen(true);
    }
  };
  const closeCheckout = () => {
      if (checkoutObject) {
          checkoutObject.closeCheckout();
          setCheckoutOpen(false);
      }
  }
  return (
      <Wrapper>
        {generating ? <div>Loading...</div> : <button style={{display: payment ? 'none' : 'initial'}} onClick={checkoutOpen ? closeCheckout : loadCheckout} disabled={Boolean(error) || !checkoutObject}>{checkoutOpen ? 'Close Checkout' : 'Open Checkout'}</button>}
        {checkoutId && <div style={{display: loading ? 'none' : 'initial'}} id="rapyd-checkout"></div>}
        {loading && <Bars
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
        />}
        {payment && <PaymentBox>{JSON.stringify(payment)}</PaymentBox>}
        {error && <ErrorBox>{error}</ErrorBox>}
      </Wrapper>
  );
}

export default App;

const ErrorBox = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 18px 30px;
  white-space: pre-line;
  overflow-wrap: break-word;
  border: solid 1px #e6a9a1;
  background-color: #f8ecea;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const PaymentBox = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 18px 30px;
  white-space: pre-line;
  overflow-wrap: break-word;
  border: solid 1px #adcad9;
  background-color: #f3faff;
`;