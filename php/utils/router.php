<?php
namespace Utils;

use Pecee\SimpleRouter\SimpleRouter;
use Pecee\Http\Request;

class Router
{
    public static function run()
    {
        SimpleRouter::setDefaultNamespace('\Controllers\Api');
        
        SimpleRouter::group(['prefix' => '/api'], function () {
            
            SimpleRouter::post('/customers', 'Customers@createCustomer');
            SimpleRouter::get('/customers/{customerId}/paymentMethods', 'Customers@listCustomerPaymentMethods');
            
            SimpleRouter::get('/paymentMethods', 'Payments@listPaymentMethodsByCountry');
            SimpleRouter::get('/paymentMethodRequiredFields/{paymentType}', 'Payments@getPaymentMethodRequiredFields');
            SimpleRouter::post('/payment', 'Payments@createPayment');
            SimpleRouter::delete('/payment/{paymentId}', 'Payments@cancelPayment');
            
            SimpleRouter::post('/checkout', 'Payments@createCheckoutPage');
            
            SimpleRouter::post('/webhook', 'Webhooks@addWebhook');
            SimpleRouter::get('/webhook/events', 'Webhooks@getWebhookEvents');
            
            SimpleRouter::options('/{path}', [self::class, 'setCorsHeaders'], ['defaultParameterRegex' => '[\w\/-]+']);
        });
        SimpleRouter::error(function(Request $request, \Exception $exception) {
            switch($exception->getCode()) {
                // Page not found
                case 404:
                    header($_SERVER['SERVER_PROTOCOL']." 404 Not Found");
                    echo '404';
                    break;
                // Forbidden
                case 403:
                    if ($request->getMethod() != "options") {
                        header($_SERVER['SERVER_PROTOCOL']." 404 Not Found");
                        echo '404';
                    } else {
                        header($_SERVER['SERVER_PROTOCOL']." 403 Forbidden");
                        echo '403';
                    }
                    break;
            }
        });
        
        try{
            SimpleRouter::start();
        } catch (\Exception $e){
            
        }
    }
    
    public static function setCorsHeaders() {
        header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: *");
    }
}
