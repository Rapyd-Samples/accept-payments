# Accept Payments with Go
See a simple checkout workflow in action.

The Go code in this folder implements a purchase flow for woolen socks. (Sorry, the shop is still tiny, there are no other items to buy.) 


## What do you need to start
- An installed Go toolchain. (https://go.dev/dl)
- A Rapyd Account (https://dashboard.rapyd.net/sign-up)
- For redirects and webhooks to work properly it is necessary to expose the corresponding port of your computer to the outside world (by default port 5000). \
  There are many ways to achieve this. You can use the ngrok application (https://ngrok.com), which will generate a random web address for you and redirect all traffic to a specified port on your local machine. \
  Remote dev environments like Gitpod.io usually provide a similar service to expose local ports through a generated proxy URL. See the documents for your remote dev environment provider.
 
## How to run the Go application
- Clone the repository. 
- Open a terminal and navigate to the `go` folder in the local repo.
- Log in to your Rapyd account
- Make sure you are using the panel in "sandbox" mode (switch in the bottom left part of the panel)
- Go to the "Developers" tab. Under "Credentials Details", you can find two keys. 
- Copy the access key. 
- In the terminal, create an environment variable "RAPYD_ACCESS_KEY" and set it to the copied key. Ensure the variable is exported to sub-processes.\
   For example, in Bash:\
   `export RAPYD_ACCESS_KEY=<your access key here>`
- Do the same for the secret key.\
   `export RAPYD_SECRET_KEY=your secret key here>` 
- Ensure that the port forwarding service is up and running. The service should provide you with a URL that exposes the web server.
- In the repo's `go` directory, run `go run .`
- Open the home page through the exposed URL.

> Important: If you use a proxy service like ngrok, ensure to open the home page through the proxy URL that the proxy service provides.
>
> The demo app uses the proxy URL for constructing the redirect URLs that it sends to the Rapyd API. If you access the demo app through a `localhost` URL, it cannot construct the correct redirect URLs.
>
> If the API call fails although you use the proxy URL, inspect the log output. If the redirect URLs look like, "http//localhost:8080/...", then the proxy service has translated the proxy URL back into the local URL. In this case, the demo app has no chance to determine the proxy URL required for the redirects. In this case, try a different proxy service. Ngrok.com and Gitpod.io have been tested and work well.

## How to test the flow
- The home page is a single-item shopping cart page. 
- Enter the number of socks to buy and click the checkout button.
- The code creates a hosted checkout page through the Rapyd API
- It then redirects to that page. The final price to pay is $5.99 multiplied by the number of items in the cart.
- Complete or cancel the purchase. Rapyd redirects to the respective `/complete` or `/cancel` page, from where you can navigate back to the home page.