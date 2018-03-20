<?php

defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Login extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('login_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
		
	}
	
	
	public function check_login() {
		
		$post_login = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_login) {
			$result = $this->login_model->check_login($post_login);
			if ($result)
			{
				$token = array(
				"UserId" => $result[0]->UserId,
			    "EmailAddress" => $result[0]->EmailAddress,
				"FirstName" => $result[0]->FirstName,
				"LastName" => $result[0]->LastName
				);

				$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
				$output['token'] = $jwt;
				echo json_encode($output);
		
			}
			else
			{
				return $this->output
				->set_status_header(404)
				->set_output(json_encode(array(
						'text' => 'Invalid username or password.',
						'type' => 'danger'
				)));
			}
		}
	}
	
}
