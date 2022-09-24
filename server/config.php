<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quiz2";
$conn = new mysqli($servername, $username, $password, $dbname);


function insert_data($array, $table_name)
{
    $placeholders = array_fill(0, count($array), '?');

    $keys   = array();
    $values = array();
    foreach ($array as $k => $v) {
        $keys[] = $k;
        $values[] = !empty($v) ? $v : null;
    }

    $query = "insert into $table_name " .
        '(' . implode(', ', $keys) . ') values ' .
        '(' . implode(', ', $placeholders) . '); ';

    $stmt = $GLOBALS['conn']->prepare($query);

    $params = array();
    foreach ($array as &$value) {
        $params[] = &$value;
    }
    $types  = array(str_repeat('s', count($params)));
    $values = array_merge($types, $params);

    call_user_func_array(array($stmt, 'bind_param'), $values);

    $success = $stmt->execute();
    if($success > 0){
        return mysqli_insert_id($GLOBALS['conn']);   
    }
   
}

function getFieldUnique($field,$value,$table_name)
{
    $sql = "SELECT * FROM ".$table_name." where ".$field."='".$value."'";
    $result =  $GLOBALS['conn']->query($sql);
    return $result->num_rows;
}

function getUser($email,$password){

    $sql = "SELECT * FROM admin where email='".$email."' AND password='".$password."' ";
    $result =  $GLOBALS['conn']->query($sql);
   
    if($result->num_rows >0){
        return $result->fetch_assoc();
    }else{
        return false;
    }

}

function getTopics(){
    
    $sql = "SELECT id,name FROM topics";
    $result =  $GLOBALS['conn']->query($sql);
   
    if($result->num_rows >0){

        return $result->fetch_all(MYSQLI_ASSOC);

    }else{
        return false;
    }
    
}

function getQuestion($id){
    $sql = 'SELECT q.question,q.answer,q.q_type,o.option_first,o.option_second,o.option_third,o.option_fourth FROM `topics` as t JOIN questions as q on q.topic_id = t.id JOIN options as o on  o.q_id=q.id  WHERE t.id='.$id.' ORDER BY q.q_type ASC';
    $result =  $GLOBALS['conn']->query($sql);
    if($result->num_rows >0){
        return $result->fetch_all(MYSQLI_ASSOC);
    }else{
        return false;
    }

}