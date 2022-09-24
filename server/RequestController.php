<?php
require_once('./SimpleRest.php');
require_once('./register.php');

if (@$_SERVER['HTTP_ORIGIN']) {
    header("Origin: http://localhost:8000");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  } 


$action = '';
$id     = '';


if(isset($_GET['action'])){
    $action = $_GET['action'];
}

if(isset($_GET['id'])){
    $id = $_GET['id'];
}

$request = new SimpleRest();

switch ($action) {

    case "register":
        // to handle REST Url api/auth/register/
        $register = new Register();
        $register->add();
        break;

    case "login":
        // to handle REST Url api/auth/login/
        $register = new Register();
        $register->login();
        break;

    case "addquestion":
        // to handle REST Url api/auth/addquestion/
        $register = new Register();
        $register->addQuestion();
        break;
    case "getTopic":
        // to handle REST Url api/auth/getTopic/
        $register = new Register();
        $register->getTopic();
        break;
    case "getQuestioByTopic":
        // to handle REST Url api/auth/getQuestioByTopic/
        $register = new Register();
        $register->getQuestioByTopic();
        break;
    default:
        // 404 - not found;
        echo die(json_encode(['status'=>'404','message'=>$request->getHttpStatusMessage(404)]));
        break;


}

