<?php
require_once('./config.php');
require_once('./SimpleRest.php');

class Register extends SimpleRest{

    public function add(){
       
        header("Content-type:application/json");
        $jsdata=json_decode(file_get_contents('php://input'),true);
        $dataField = ['username','password','email'];
        

        $error  = [];
        $insert = [];
       
        foreach($dataField as $field){
            if(isset($jsdata[$field])){
                $insert[$field] = $jsdata[$field];
            }else{
                $error[]=$field;
            }
        }  
        if(empty($error)){  
            $exist = getFieldUnique('email',$jsdata['email'],'admin');            
            if($exist > 0){
                echo die(json_encode(['status'=>302,'message'=>"Email Already Exist"]));
            }

            $insert['password'] = md5($jsdata['password']);
            $result = insert_data($insert,'admin');
            echo die(json_encode(['status'=>200,'message'=>"User Register Sucessfully"]));

        }else{
            echo die(json_encode(['status'=>400,'message'=>$this->getHttpStatusMessage(400),'fields_reueired'=>$error]));
        }
        

    }

    public function login(){

        header("Content-type:application/json");
        $jsdata=json_decode(file_get_contents('php://input'),true);
        
        if(!isset($jsdata['email'])){
            echo die(json_encode(['status'=>406,'message'=>$this->getHttpStatusMessage(406)]));
        }
        if(!isset($jsdata['password'])){
            echo die(json_encode(['status'=>406,'message'=>$this->getHttpStatusMessage(406)]));
        }
        $email = $jsdata['email']; $password = md5($jsdata['password']);
        $user = getUser($email,$password);
        if($user){
            echo die(json_encode(['status'=>200,'message'=>$this->getHttpStatusMessage(010),'user'=>$user]));

        }else{
            echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));
        }



    }

    public function addQuestion(){

        header("Content-type:application/json");
        $jsdata=json_decode(file_get_contents('php://input'),true);
        $newData = $jsdata;
       
        if(!empty($jsdata)){

            if(!isset($jsdata['topic'])){
                echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));  
            }else{
                unset($newData['topic']);
            }
            if(count($newData) % 7 !== 0){
                echo die(json_encode(['status'=>518,'message'=>$this->getHttpStatusMessage(518)]));  
            }
            $loopCount = count($newData) / 7;
            // print_r($loopCount);die;
            $topicId = insert_data(['name'=>$jsdata['topic']],'topics');

            for ($i=0; $i < $loopCount; $i++) { 
              
                $insertQuestion =['topic_id' =>$topicId,
                                  'answer'=>$newData[($i+1).'answer'],
                                  'q_type'=>$newData[($i+1).'questiontype'],
                                  'question'=>$newData[($i+1).'question']
                                ];

                $question_id = insert_data($insertQuestion,'questions');
                
                $insertOptions = [ 'q_id' =>$question_id,
                                    'option_first'=>$newData[($i+1).'optionFirst'],
                                    'option_second'=>$newData[($i+1).'optionSecond'],
                                    'option_third'=>$newData[($i+1).'optionThird'],
                                    'option_fourth'=>$newData[($i+1).'optionFourth']
                                ];
                
                $optionid = insert_data($insertOptions,'options');
            }
            echo die(json_encode(['status'=>200,'message'=>$this->getHttpStatusMessage(519)]));  
           

        }else{
            echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));  
        }

        echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404),'data'=>$jsdata]));  



    }

    public function getTopic(){

        $topic = getTopics();
        if($topic){
            echo die(json_encode(['status'=>200,'message'=>$this->getHttpStatusMessage(010),'data'=>$topic]));  
        }else{
            echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));  
        }
    }

    public function getQuestioByTopic(){

        $jsdata=json_decode(file_get_contents('php://input'),true);
       
        if(!isset($jsdata['topic_id'])){
            echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));  
        }

       $question = getQuestion($jsdata['topic_id']);
       if($question){
         echo die(json_encode(['status'=>200,'message'=>$this->getHttpStatusMessage(010),'data'=>$question]));  
         }else{
         echo die(json_encode(['status'=>404,'message'=>$this->getHttpStatusMessage(404)]));  
        }

    }

}




