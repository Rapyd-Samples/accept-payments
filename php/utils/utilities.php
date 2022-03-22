<?php
namespace Utils;

class Utilities
{
    public static function generateString($length=12) {
        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return substr(str_shuffle($permitted_chars), 0, $length);
    }


    // makeRequest method - Includes the logic to communicate with the Rapyd sandbox server.
    public static function makeRequest($method, $path, $body = null) {
        $base_url = 'https://sandboxapi.rapyd.net';
        $access_key = $_ENV['ACCESS_KEY'];     // The access key received from Rapyd.
        $secret_key = $_ENV['SECRET_KEY'];     // Never transmit the secret key by itself.

        $idempotency = self::generateString();      // Unique for each request.
        $http_method = $method;                // Lower case.
        $salt = self::generateString();             // Randomly generated for each request.
        $date = new \DateTime();
        $timestamp = $date->getTimestamp();    // Current Unix time.

        $body_string = !is_null($body) ? json_encode($body,JSON_UNESCAPED_SLASHES) : '';
        $sig_string = "$http_method$path$salt$timestamp$access_key$secret_key$body_string";

        $hash_sig_string = hash_hmac("sha256", $sig_string, $secret_key);
        $signature = base64_encode($hash_sig_string);

        $request_data = NULL;

        if ($method === 'post') {
            $request_data = array(
                CURLOPT_URL => "$base_url$path",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $body_string

            );
        } else {
            $request_data = array(
                CURLOPT_URL => "$base_url$path",
                CURLOPT_RETURNTRANSFER => true,
            );
        }

        $curl = curl_init();
        curl_setopt_array($curl, $request_data);

        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "access_key: $access_key",
            "salt: $salt",
            "timestamp: $timestamp",
            "signature: $signature",
            "idempotency: $idempotency"
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            throw new \Exception("cURL Error #:".$err);
        } else {
            return json_decode($response, true); 
        }
    }
    
    public static function AuthWebhookRequest($incomeSign, $urlPath, $salt, $timestamp, $body)
    {
        $access_key = $_ENV['ACCESS_KEY'];     // The access key received from Rapyd.
        $secret_key = $_ENV['SECRET_KEY'];     // Never transmit the secret key by itself.
        
        $sig_string = $urlPath.$salt.$timestamp.$access_key.$secret_key.$body;

        $hash_sig_string = hash_hmac("sha256", $sig_string, $secret_key);
        $signature = base64_encode($hash_sig_string);
        
        return $signature == $incomeSign;
    }
}
