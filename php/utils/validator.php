<?php
namespace Utils;

class Validator extends \SimpleValidator\Validator
{
    public static $rules = [
        'createCustomer' => [
            'name' => [
                'required',
                'extended_alpha_numeric'
            ]
        ],
        'listCustomerPaymentMethods' => [
            'customer_id' => [
                'required',
                'customer_id'
            ]
        ],
        'listPaymentMethodsByCountry' => [
            'country' => [
                'required',
                'country_code'
            ]
        ],
        'getPaymentMethodRequiredFields' => [
            'payment_type' => [
                'required',
                'payment_type'
            ]
        ],
        'createPayment' => [
            'amount' => [
                'required',
                'float',
                'positive'
            ],
            'currency' => [
                'required',
                'currency_code'
            ],
            'customer' => [
                'customer_id'
            ],
            'payment_method' => [
                'payment_method_id'
            ],
            'complete_payment_url' => [
                'url'
            ],
            'error_payment_url' => [
                'url'
            ]
        ],
        'cancelPayment' => [
            'payment_id' => [
                'payment_id'
            ]
        ],
        'createCheckoutPage' => [
            'amount' => [
                'required',
                'float',
                'positive'
            ],
            'country' => [
                'required',
                'country_code'
            ],
            'currency' => [
                'required',
                'currency_code'
            ],
            'customer' => [
                'customer_id'
            ],
            'complete_payment_url' => [
                'url'
            ],
            'complete_checkout_url' => [
                'url'
            ],
            'error_payment_url' => [
                'url'
            ],
        ],
    ];
    
    public static $naming = [
        'createCustomer' => [
            'name' => 'Customer Name'
        ],
        'listCustomerPaymentMethods' => [
            'customer_id' => 'Customer ID'
        ],
        'listPaymentMethodsByCountry' => [
            'country' => 'Country'
        ],
        'getPaymentMethodRequiredFields' => [
            'payment_type' => 'Payment Type'
        ],
        'createPayment' => [
            'amount' => 'Amount',
            'currency' => 'Currency',
            'customer' => 'Customer ID',
            'payment_method' => 'Payment Method ID',
            'complete_payment_url' => 'Complete Payment URL',
            'error_payment_url' => 'Error Payment URL'
        ],
        'cancelPayment' => [
            'payment_id' => 'Payment ID'
        ],
        'createCheckoutPage' => [
            'amount' => 'Amount',
            'country' => 'Country',
            'currency' => 'Currency',
            'customer' => 'Customer ID',
            'complete_payment_url' => 'Complete Payment URL',
            'complete_checkout_url' => 'Complete Checkout URL',
            'error_payment_url' => 'Error Payment URL'
        ],
    ];
    
    public static $countryCodes = ['AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CD', 'CG', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'UM', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'AX'];
    
    public static $currencyCodes = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UYW', 'UZS', 'VED', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL'];

    /**
     * Constructor is not allowed because SimpleValidator uses its own
     * static method to instantiate the validaton
     */
    private function __construct($errors, $namings) {
        $this->errors  = (array) $errors;
        $this->namings = (array) $namings;
    }

    protected static function extended_alpha_numeric($input) {
        return (preg_match("#^[\w -]+$#", $input) == 1);
    }
    
    protected static function customer_id($input) {
        return (preg_match("#^cus_[a-z0-9]{32}$#", $input) == 1);
    }
    
    protected static function country_code($input) {
        return in_array($input, self::$countryCodes);
    }
    
    protected static function currency_code($input) {
        return in_array($input, self::$currencyCodes);
    }
    
    protected static function payment_type($input) {
        return (preg_match("#^[a-z0-9_]+$#", $input) == 1);
    }
    
    protected static function payment_method_id($input) {
        return (preg_match("#^[a-z]+_[a-z0-9]{32}$#", $input) == 1);
    }
    
    protected static function payment_id($input) {
        return (preg_match("#^payment_[a-z0-9]{32}$#", $input) == 1);
    }
    
    protected static function positive($input) {
        return ($input > 0);
    }
    
    protected function getErrorFilePath($lang) {
        return __DIR__ . "/validation_errors/" . $lang . ".php";
    }
    
    /**
     *
     * @param Array $inputs
     * @param Array $rules
     * @param Array $naming
     * @return Validator
     * @throws SimpleValidatorException
     */
    public static function validate($inputs, $rules, $naming = null) {
        $errors = null;
        foreach ($rules as $input => $input_rules) {
            if (is_array($input_rules)) {
                if (!isset($inputs[(string) $input]))
                    $input_value = null;
                else
                    $input_value = $inputs[(string) $input];
                if ((is_null($input_value) || $input_value == '') && !in_array('required', $input_rules))
                    continue;
                foreach ($input_rules as $rule => $closure) {
                    /**
                     * if the key of the $input_rules is numeric that means
                     * it's neither an anonymous nor an user function.
                     */
                    if (is_numeric($rule)) {
                        $rule = $closure;
                    }
                    $rule_and_params = static::getParams($rule);
                    $params = $real_params = $rule_and_params['params'];
                    $rule = $rule_and_params['rule'];
                    $params = static::getParamValues($params, $inputs);
                    array_unshift($params, $input_value);
                    /**
                     * Handle anonymous functions
                     */
                    if(is_object($closure) && get_class($closure) == 'Closure') {
                        $refl_func = new \ReflectionFunction($closure);
                        $validation = $refl_func->invokeArgs($params);
                    }
                    /**
                     * handle class methods
                     */ 
                    else if (@method_exists(get_called_class(), $rule)) {
                        $refl = new \ReflectionMethod(get_called_class(), $rule);
                        if ($refl->isStatic()) {
                            $refl->setAccessible(true);
                            $validation = $refl->invokeArgs(null, $params);
                        } else {
                            throw new SimpleValidatorException(SimpleValidatorException::STATIC_METHOD, $rule);
                        }
                    } else {
                        throw new SimpleValidatorException(SimpleValidatorException::UNKNOWN_RULE, $rule);
                    }
                    if ($validation == false) {
                        $errors[(string) $input][(string) $rule]['result'] = false;
                        $errors[(string) $input][(string) $rule]['params'] = $real_params;
                    }
                }
            } else {
                throw new SimpleValidatorException(SimpleValidatorException::ARRAY_EXPECTED, $input);
            }
        }
        return new static($errors, $naming);
    }

    /**
     * Gets the parameter names of a rule
     * @param type $rule
     * @return mixed
     */
    private static function getParams($rule) {
        if (preg_match("#^([a-zA-Z0-9_]+)\((.+?)\)$#", $rule, $matches)) {
            return array(
                'rule' => $matches[1],
                'params' => explode(",", $matches[2])
            );
        }
        return array(
            'rule' => $rule,
            'params' => array()
        );
    }

    /**
     * Handle parameter with input name
     * eg: equals(:name)
     * @param mixed $params
     * @return mixed
     */
    private static function getParamValues($params, $inputs) {
        foreach ($params as $key => $param) {
            if (preg_match("#^:([\[\]a-zA-Z0-9_]+)$#", $param, $param_type)) {
                $params[$key] = @$inputs[(string) $param_type[1]];
            }
        }
        return $params;
    }
}
