import config from "../config.js";

const baseURL = config.baseURL
export default {
    messages: {},
    ws: null,
    poll: null,
    abortCtrl: null,
    init: function() {
        let selection = document.querySelector('input[name="webhook"]:checked').value;
        this.initWHHandler(selection);
        for (const WHradio of document.querySelectorAll('input[name="webhook"]')) {
            WHradio.addEventListener("change", e => {
                this.closeWHHandler(e.target.value);
                this.initWHHandler(e.target.value);
            });
        }
    },
    initWHHandler: function(selection) {
        switch (selection) {
            case 'poll':
                this.abortCtrl = new AbortController();
                var self = this;
                this.poll = async function() {
                    fetch(baseURL + 'webhook/events', {
                            method: 'GET',
                            signal: self.abortCtrl.signal
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
                            for (const message of data) {
                                if (!self.messages.hasOwnProperty(message.id)) {
                                    self.addWHMessage(message);
                                }
                            }
                            setTimeout(self.poll, 1000);
                        })
                        .catch((error) => {
                            if (error.name === 'AbortError') {
                                console.log('Webhooks poll aborted');
                                alert('Webhooks poll aborted.');
                            } else {
                                console.error(error);
                                alert('Webhooks poll error! Check logs in the console.');
                            }
                        });
                }
                this.poll();
                break;
            case 'ws':
                // Create WebSocket connection.
                this.ws = new WebSocket(baseURL.replace('http', 'ws') + 'webhook/socketserver');
                // Listen for possible errors
                this.ws.addEventListener('error', function (event) {
                    console.error('WebSocket error: ', event);
                    alert('WebSocket error! Check logs in the console.');
                });
                // Connection opened
                this.ws.addEventListener('open', function () {
                    console.log('Webhooks WebSocket opened');
                    alert('Webhooks WebSocket opened.');
                });
                // Listen for messages
                this.ws.addEventListener('message', function (event) {
                    console.log('Message from server ', event.data);
                    this.addWHmessage(event.data);
                });
                // Connection closed
                this.ws.addEventListener('close', function (event) {
                    console.log('Webhooks WebSocket closed.', event);
                    alert('Webhooks WebSocket closed.');
                });
                break;
            default:
                alert(`Webhook selection value "${selection}" is invalid.`);
        }
    },
    closeWHHandler: function(selection) {
        switch (selection) {
            case 'poll':
                // Close WebSocket connection.
                if (this.ws) {
                    this.ws.close();
                }
                break;
            case 'ws':
                if (this.abortCtrl) {
                    this.abortCtrl.abort();
                }
                break;
            default:
                alert(`Webhook selection value "${selection}" is invalid.`);
        }
    },
    addWHMessage: function(message) {
        this.messages[message.id] = message;
        let whContainer = document.getElementById('webhooks_list');
        let messageContainer = document.createElement('div');
        messageContainer.id = message.id;
        messageContainer.style = 'margin: 1px; border: 1px solid gray;';
        let type = document.createElement('p');
        type.innerText = message.type;
        let timestamp = document.createElement('p');
        timestamp.innerText = message.timestamp;
        messageContainer.append(type, timestamp);
        whContainer.prepend(messageContainer);
    }
}
