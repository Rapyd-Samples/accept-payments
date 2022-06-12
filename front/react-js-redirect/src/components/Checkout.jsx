import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import cc from 'currency-codes';
import CurrencyInput from 'react-currency-input-field';
import config from '../config';
import Select from 'react-select';
import countryList from 'react-select-country-list'
import Image from "./Image/Image";


const locale = window.navigator.language || 'en-US';

const formatAmount = ({ amount, currency}) => {
    const numberFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    });
    return numberFormat.format(amount);
};

const buildForm = ({ url, data }) => {
    const form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.method = 'POST';
    form.action = url;
    Object.keys(data)
        .map(key => [key, data[key]])
        .forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;

            form.appendChild(input);
        });
    form.style.visibility = 'hidden';
    document.body.append(form);
    return form;
}

const Checkout = () => {
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [formDisabled, setFormDisabled] = useState(false);
    const currencies = useMemo(() => cc.codes().map(code => ({label: code, value: code})), []);
    const countries = useMemo(() => countryList().getData(), [])
    const amountAvailable = amount && currency && country;
    const submitForm = () => {
        setFormDisabled(true);
        const form = buildForm({url: `${config.baseURL}/checkout/redirect`, data: {amount, currency, country}});
        form.submit();
    };
    return (
        <Wrapper>
            <Image src="https://rapyd.b-cdn.net/wp-content/uploads/2019/09/rapyd-logo-png.png" alt="logo"/>
            <Box>
                Click generate to redirect the browser to the generated checkout page.
                complete_checkout_url and cancel_checkout_url will be sent by the server as the pathname of the complete and error routes.
            </Box>
            <StyledSelect options={countries} value={!country ? "" : {value: country, label: country}} onChange={option => setCountry(option?.value || "")} isSearchable={true} isClearable={true}/>
            <StyledSelect
                value={!currency ? "" : {value: currency, label: currency}}
                isClearable={true}
                isSearchable={true}
                name="currency"
                options={currencies}
                onChange={option => setCurrency(option?.value || "")}
            />
            <StyledCurrencyInput
                id="amount"
                name="amount"
                placeholder="Please enter an amount"
                value={amount}
                allowNegativeValue={false}
                onValueChange={(value, name, values) => {
                    setAmount(values.value);
                }}
                maxLength={15}
            />
            <StyledFlex>
                {amountAvailable &&
                    <AmountDiv>
                        <AmountText>
                            {formatAmount({currency, amount})}
                        </AmountText>
                    </AmountDiv>
                }
                <button onClick={submitForm} disabled={!amountAvailable || formDisabled}>
                    Generate Checkout Page
                </button>
            </StyledFlex>
        </Wrapper>
    );
}

export default Checkout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 50vw;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
`;

const Box = styled.div`
  border: solid 1px #adcad9;
  background-color: #f3faff;
  border-radius: 4px;
  padding: 18px 30px;
  white-space: pre-line;
  overflow-wrap: break-word;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const AmountDiv = styled.div`
  width: 220px;
  background: #f0f2f3;
  min-height: 51px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding: 16px 25px 16px 25px;
  flex-wrap: wrap;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  height: 38px;
  width: 100%;
`

const AmountText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: black;
  overflow-wrap: anywhere;
`;