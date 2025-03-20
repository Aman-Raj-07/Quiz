const n = document.querySelector("#next");
const q = document.querySelector("#question");
const o = document.querySelector("#options")
const s = document.querySelector("#start");
const r = document.querySelector("#restart");
const op1 = document.querySelector("#op1");
const op2 = document.querySelector("#op2");
const op3 = document.querySelector("#op3");
const op4 = document.querySelector("#op4");
const p = document.querySelector("p");
const t = document.querySelector("#timer");

const op = [op1,op2,op3,op4];

let count = 0;
let show = 0;
let ls = 0;
let time = 0;

const questions = [
    {ques : "Which batsman have third most centuries in One Day Internationals", option : ["Virat","Rohit","Sachin","Dhoni"], answer : "2"},
    {ques : "2+2=?", option : ["5","3","4","6"], answer : "3"},
    {ques : "Capital city of India?", option : ["New Delhi", "Kolkata","Ahmedabad","Patna"], answer : "1"},
    {ques : "Sin² + cos²=?", option : ["0","1","-1","2"], answer : "2"}
];


s.addEventListener("click",()=>{
    s.classList.add("hidden");
    n.classList.remove("hidden");
    q.classList.remove("hidden");
    o.classList.remove("hidden");
    t.classList.remove("hidden");
    q.innerHTML = questions[count].ques;
    for(let i = 0; i < 4;i++){
        op[i].innerHTML = questions[count].option[i];
    }
    timer();
});

document.getElementById("choosen").addEventListener("submit", function(event){
    event.preventDefault();

    let selectedOption = document.querySelector('input[name="q1"]:checked');
    if(selectedOption){
        questions[count].opt = selectedOption.value;
    }
    
    count++;
    if(count === 4){
        r.classList.remove("hidden");
        //q.classList.add("hidden");
        o.classList.add("hidden");
        n.classList.add("hidden");
        t.classList.add("hidden");

        let result = questions.filter(item=>item.answer===item.opt);
        let marks = result.length;

        show = marks == 4 ? "Excellent!" : (marks>2) ? "Good, but can improve.." : "Try again";
        
        q.innerHTML = "Current score:  " + marks + "           "+ show ; 
        show = marks; 
        if(ls){
            p.classList.remove("hidden");
            p.innerHTML = `Last score : ${ls}/4`;
        }

        clearInterval(timeInterval);

    }else{
        q.innerHTML = questions[count].ques;
    for(let i = 0; i < 4;i++){
        op[i].innerHTML = questions[count].option[i];
      }
      const radioButtons = document.querySelectorAll('input[name="q1"]');
      radioButtons.forEach(button => button.checked = false);
      clearInterval(timeInterval);
      timer();
    }
    
});
r.addEventListener("click",()=>{
    count = 0;
    r.classList.add("hidden");
    n.classList.remove("hidden");
    q.classList.remove("hidden");
    o.classList.remove("hidden");
    q.innerHTML = questions[count].ques;
    for(let i = 0; i < 4;i++){
        op[i].innerHTML = questions[count].option[i];
    }
    localStorage.setItem("last",show);
    ls = localStorage.getItem("last");
        p.innerHTML = `Last score : ${ls}/4`;
    questions.map(item => item.opt = 0);
    p.classList.add("hidden");
    t.classList.remove("hidden");
    const radioButtons = document.querySelectorAll('input[name="q1"]');
    radioButtons.forEach(button => button.checked = false);
    timer();
});
function timer(){
    time = 10;
    timeInterval = setInterval(next,1000);
}
function next(){
    t.innerHTML = `${time} second`;
    time--;
    if(time == 0){
        clearInterval(timeInterval);

        let selectedOption = document.querySelector('input[name="q1"]:checked');
    if(selectedOption){
        questions[count].opt = selectedOption.value;
    }
    
    count++;
    if(count === 4){
        r.classList.remove("hidden");
        o.classList.add("hidden");
        n.classList.add("hidden");
        t.classList.add("hidden");


        let result = questions.filter(item=>item.answer===item.opt);
        let marks = result.length;

        show = marks == 4 ? "Excellent!" : (marks>2) ? "Good, but can improve.." : "Try again";
        
        q.innerHTML = "Current score:  " + marks + "        "+ show ; 
        show = marks; 
        if(ls){
            p.classList.remove("hidden");
            p.innerHTML = `Last score : ${ls}/4`;
        }

        clearInterval(timeInterval)

    }else{
        q.innerHTML = questions[count].ques;
    for(let i = 0; i < 4;i++){
        op[i].innerHTML = questions[count].option[i];
      }
      const radioButtons = document.querySelectorAll('input[name="q1"]');
      radioButtons.forEach(button => button.checked = false);
    timer();
    }
    }
}
