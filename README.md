# Accept Payments 
Explore top payment methods to learn how you can build with Rapyd in a single integration offering customers their preferred local payment features. 

## What do you need to start
- Rapyd Account (https://dashboard.rapyd.net/sign-up)
- In order for webhooks to work properly it is necessary to expose the corresponding port of your computer to the outside world (by default port 5000). There are many ways to achieve this. You can use the ngrok application (https://ngrok.com) which will generate a random web address for you and redirect all traffic to a specified port on your local machine
- Node.js and npm
## How to run a sample application
- Log in to your Rapyd account
- Make sure you are using the panel in "sandbox" mode (switch in the bottom left part of the panel)
- Go to the "Developers" tab. You will find your API keys there. Copy them to the version of your sample application of your choice
- Go to the "Webhooks" tab and enter the URL where the application listens for events. By default it is "https://{YOUR_BASE_URL}/api/webhook" and mark which events should be reported to your app
- Run the version of the application of your choice
## How to run a sample application frontend
- Open /front/js/config.js file and type your backend URL (by default "http://localhost:5000/api/")
- Open terminal and type "npm install http-server -g"
- Open terminal in /front directory and type "http-server".
- Turn on your browser and go to "http://localhost:8080"
## Get Support 
- https://community.rapyd.net 
- https://support.rapyd.net 
