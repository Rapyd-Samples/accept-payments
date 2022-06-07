import config from "../config.js";

const baseURL = config.baseURL
export default {
    test: function(){
        console.log("OK");
        console.log(baseURL);
    },
    sendRequest: function(form){
        let formData = new FormData(form);
        let resultContainer = document.querySelector('#create_customer pre');
        formData.set('name', formData.get('customer_name'));
        formData.delete('customer_name');
        console.log(Object.fromEntries(formData));
        
        
        fetch(baseURL + 'customers', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
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
