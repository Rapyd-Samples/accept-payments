<?php
namespace Controllers\Api;

use Exception;
use Pecee\SimpleRouter\SimpleRouter as Router;
use Utils\Utilities;

class Webhooks
{
    private $inputHandler;
    private $webhookLog;
        
    public function __construct()
    {
        $this->inputHandler = Router::request()->getInputHandler();
        $this->webhookLog = $_SERVER["DOCUMENT_ROOT"].DIRECTORY_SEPARATOR.'webhooks.log';
    }
    
    public function addWebhook()
    {
        $timestamp = Router::request()->getHeader('timestamp');
        $salt = Router::request()->getHeader('salt');
        $signature = Router::request()->getHeader('signature');
        
        $url = 'http://'.$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
        $body = file_get_contents('php://input');
        if (!Utilities::AuthWebhookRequest($signature, $url, $salt, $timestamp, $body)) {
            http_response_code(401);
            return;
        }
        try {
            $messages = [];
            if (file_exists($this->webhookLog)) {
                $messages = unserialize(file_get_contents($this->webhookLog)) ?: [];
            }
            
            $data = $this->inputHandler->getOriginalPost();
            $messages[] = [
                'id' => $data['id'],
                'type' => $data['type'],
                'timestamp' => (new \DateTime())->setTimestamp((int)$data['created_at']),
                'data' => $data['data']
            ];
            file_put_contents($this->webhookLog, serialize($messages));
            
            http_response_code(200);
        } catch (Exception $e) {
            http_response_code(500);
            file_put_contents($_SERVER["DOCUMENT_ROOT"].'\error.log', var_export($e), FILE_APPEND);
        }
    }
    
    public function getWebhookEvents()
    {
        try {
            $messages = [];
            if (file_exists($this->webhookLog)) {
                $messages = unserialize(file_get_contents($this->webhookLog)) ?: [];
            }
            $messages = array_map(function($message) {
                $message['timestamp'] = $message['timestamp']->format('r');
                return $message;
            }, $messages);
            Router::response()->json($messages);
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error => $e";
        }
    }
    
}
