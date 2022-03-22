<?php
namespace Controllers\Api;

use Exception;
use Pecee\SimpleRouter\SimpleRouter as Router;
use Utils\Utilities;
use Utils\Validator;

class Payments
{
    private $inputHandler;
        
    public function __construct()
    {
        $this->inputHandler = Router::request()->getInputHandler();
    }
    
    public function listPaymentMethodsByCountry()
    {
        $data = $this->inputHandler->getOriginalParams();
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('get', '/v1/payment_methods/country?country='.$data['country']);
                Router::response()->json($object['data']);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
    public function getPaymentMethodRequiredFields($paymentType)
    {
        $data = ['payment_type' => $paymentType];
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('get', '/v1/payment_methods/required_fields/'.$data['payment_type']);
                Router::response()->json($object['data']);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
    public function createPayment()
    {
        $data = $this->inputHandler->getOriginalPost();
        $rules = Validator::$rules[__FUNCTION__];
        $data = array_filter($data, function($field) use($rules) {
            return array_key_exists($field, $rules);
        }, ARRAY_FILTER_USE_KEY);
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('post', '/v1/payments', $data);
                Router::response()->json($object['data']);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
    public function cancelPayment($paymentId)
    {
        $data = ['payment_id' => $paymentId];
        $rules = Validator::$rules[__FUNCTION__];
        $data = array_filter($data, function($field) use($rules) {
            return array_key_exists($field, $rules);
        }, ARRAY_FILTER_USE_KEY);
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('delete', '/v1/payments/'.$paymentId);
                Router::response()->json($object);
            } else {
                Router::response()->httpCode(422)->json(['Validation Errors' => $validation_result->getErrors()]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
    public function createCheckoutPage()
    {
        $data = $this->inputHandler->getOriginalPost();
        $rules = Validator::$rules[__FUNCTION__];
        $data = array_filter($data, function($field) use($rules) {
            return array_key_exists($field, $rules);
        }, ARRAY_FILTER_USE_KEY);
        try {
            $validation_result = Validator::validate($data, Validator::$rules[__FUNCTION__], Validator::$naming[__FUNCTION__]);
            if ($validation_result->isSuccess() == true) {
                $object = Utilities::makeRequest('post', '/v1/checkout', $data);
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
