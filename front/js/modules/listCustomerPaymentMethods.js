import config from "../config.js";

const baseURL = config.baseURL
export default {
    test: function(){
        console.log("OK");
        console.log(baseURL);
    },
    sendRequest: function(form){
        let formData = new FormData(form);
        let resultContainer = document.querySelector('#list_customer_payment_methods pre');
        console.log(Object.fromEntries(formData));
        
        fetch(baseURL + 'customers/' + formData.get('customer') + '/paymentMethods', {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    response.text().then(error => {
                        console.log(error);
                        let respJson = error.match(/{.+}/);
                        if (respJson) {
                            resultContainer.innerHTML = resultContainer.innerHTML + '<br>' + JSON.stringify(JSON.parse(respJson[0]), null, 4);
                        }
                    });
                    throw new Error('Network response was not OK. Check logs in the console.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                resultContainer.innerHTML = JSON.stringify(data, null, 4);
            })
            .catch((error) => {
                console.error(error);
                resultContainer.innerHTML = error;
            });

    }
}
