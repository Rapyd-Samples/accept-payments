<?php
namespace Controllers\Api;

use Exception;
use Pecee\SimpleRouter\SimpleRouter as Router;
use Utils\Utilities;
use Utils\Validator;

class Customers
{
    private $inputHandler;
        
    public function __construct()
    {
        $this->inputHandler = Router::request()->getInputHandler();
    }
    
    public function createCustomer()
    {
        $data = $this->inputHandler->getOriginalPost();
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('post', '/v1/customers', $data);
                Router::response()->json($object['data']);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
    public function listCustomerPaymentMethods($customerId)
    {
        $data = ['customer_id' => $customerId];
        $rules = Validator::$rules[__FUNCTION__];
        $data = array_filter($data, function($field) use($rules) {
            return array_key_exists($field, $rules);
        }, ARRAY_FILTER_USE_KEY);
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('get', '/v1/customers/'.$customerId.'/payment_methods');
                Router::response()->json($object['data']);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
}
