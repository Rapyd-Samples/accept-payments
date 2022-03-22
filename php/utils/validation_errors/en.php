<?php
/**
 * :attribute => input name
 * :params => rule parameters ( eg: :params(0) = 10 of max_length(10) )
 */
return array(
    'extended_alpha_numeric' => ':attribute field can only contain letters, digits, spaces, dashes and underscores',
    'customer_id' => ':attribute is incorrect',
    'country_code' => ':attribute must contain a valid two-letter uppercase ISO 3166-1 ALPHA-2 code for the country',
    'currency_code' => ':attribute must contain a valid three-letter ISO 4217 code for the currency',
    'payment_type' => ':attribute is incorrect',
    'payment_method_id' => ':attribute is incorrect',
    'positive' => ':attribute value should be greater than 0'
);
