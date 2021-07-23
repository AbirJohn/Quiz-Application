//selecting all required elements
const start_btn = document.querySelector(".start_btn button");

//info_btn
const info_box = document.querySelector(".info_box");

//exit_btn
const exit_btn = info_box.querySelector(".buttons .quit");

// Continue_btn
const continue_btn = info_box.querySelector(".buttons .restart");

//Quiz_box 
const quiz_box =document.querySelector(".quiz_box");

//next_btn
const next_btn =quiz_box.querySelector(".next_btn");


//retun_btn
const result_box = document.querySelector(".result_box");

//restart_btn 
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//time line + timeConter
const timecount =quiz_box.querySelector(".timer .time_sec");
const timeline =quiz_box.querySelector("header .time_line");

// Time off 
const timeoff =quiz_box.querySelector("header .time_text");

// Option_list Of documents 
const option_list = document.querySelector(".option_list");

// if restart_quiz Go back To result_box function add To CLasslist ;
restart_quiz.onclick  = () =>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    
    let que_count = 0;
    let count_numb =1;
    let timevalue =15;
    let widthValue = 0;
    let userScore = 0;
    showQusestion(que_count);
    quecounter (count_numb);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterline);
    startTimerline(widthValue);
    next_btn.style.display ="none";
    timeoff.textContent   = "Time left"
}


// if quit Quiz Go back To Start button ;
quit_quiz.onclick  = () =>{
    window.location.reload();
}



// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}


// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}


// if continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show Quiz box

    //Counter system all quiz;
    showQusestion(0);
    quecounter(1);
    startTimer(15);
    startTimerline(0);
   
}


// if next_btn clicked

next_btn.onclick =() =>{
    if(que_count < questions.length - 1){
        que_count++;
        count_numb++;
        showQusestion(que_count);
        quecounter (count_numb);
        clearInterval(counter);
        startTimer(timevalue);
        clearInterval(counterline);
        startTimerline(widthValue);
        next_btn.style.display ="none";
       
    }else{
        clearInterval(counter);
        clearInterval(counterline);
        console.log("Questions Completed ");
        showResultBox();
    }
        
}



//Counter increesments Variables  
let que_count = 0;
let count_numb =1;
let counter;
let counterline;
let timevalue =15;
let widthValue = 0;
let userScore = 0;






//get questions and options  from array  in index value;

function showQusestion(index){

const que_text = document.querySelector(".que_text");
const que_tag = '<span>'+questions [index].numb +"."+ questions [index].question + '</span>';
let option_tag = '<div class="option">'+ questions [index].options[0] +'<span></span></div>'
                 +'<div class="option">'+ questions [index].options[1] +'<span></span></div>'
                 +'<div class="option">'+ questions [index].options[2] +'<span></span></div>'
                 +'<div class="option">'+ questions [index].options[3]+'<span></span></div>';
que_text.innerHTML = que_tag ;
option_list.innerHTML = option_tag ;



const option = option_list.querySelectorAll(".option");


// set onclick attribute to all available options
for(i=0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}

}


// set onclick attribute to all available options
function quecounter(index){
    const button_ques_counter = quiz_box.querySelector(".total_que");
    let totalquesContTag = '<span><p>'+ index +'</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';

    button_ques_counter.innerHTML = totalquesContTag;

}





//Answer is incorrect and the Correct answer  Function 


let ThickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon =' <div class="icon cross"><i class="fas fa-times"></i></div>';




//Answer is incorrect and the Correct answer  Function 

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterline);
    
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    let allOptions = option_list.children.length; 

    if(userAns == correcAns){
        userScore += 1;
        console.log(userScore); 
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend",ThickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        //if Answer is incorrect then automatically  Selected the Correct answer 

        for(i=0; i < allOptions; i++){
           if(option_list.children[i].textContent == correcAns){
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend",ThickIcon);
           }
        }
    }

    //once  user is disabled  all options

    for (let i = 0; i< allOptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }

    next_btn.style.display ="block";


}



//Counter function add 

function startTimer(time){

    counter =setInterval(timer,1000);
    function timer(){
        timecount.textContent = time;
        time--;

        if(time <9 ){
            let addZero  = timecount.textContent;
            timecount.textContent = '0'+ addZero;
        }


        let correcAns = questions[que_count].answer; 
        let allOptions = option_list.children.length; 
        if(time < 0){
            clearInterval(counter);
            timecount.textContent ="00";
            timeoff.textContent   = "Time Up"

            //When time up then Automaticaly Show the Correct Answer.
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                 option_list.children[i].setAttribute("class", "option correct");
                 option_list.children[i].insertAdjacentHTML("beforeend",ThickIcon);
                }
             }

             
            for (let i = 0; i< allOptions; i++) {
            option_list.children[i].classList.add("disabled");
            
            }

            next_btn.style.display ="block";

        }
    }
}




// Quit && Restart function work

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const ScoreText = result_box.querySelector(".score_text");


    //if userscore condistion use

    if(userScore > 3){
        let ScoreTag = '<span>and Congrats ! you get  <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = ScoreTag;
    }


    else if(userScore >1){
        let ScoreTag = '<span>and nice! you get <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = ScoreTag;
    }


    else{
        let ScoreTag = '<span>and sorry, you get only <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = ScoreTag;
    }


}



//Counter Color  function add  

function startTimerline(time){

    counterline =setInterval(timer,29);
    function timer(){
        time+=  1;
        timeline.style.width =time + "px";
        if(time > 549){
            clearInterval(counterline);
        }
    }
}

