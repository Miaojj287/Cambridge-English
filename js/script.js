let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}
document.addEventListener('DOMContentLoaded', () => {
   fetch('read/reading1.txt')
       .then(response => response.text())
       .then(text => {
           const paragraphs = document.getElementById('paragraphs');
           const questions = document.getElementById('questions');
           
           const parts = text.split('\n\n'); // Assuming paragraphs are separated by double newlines
           paragraphs.innerHTML = parts[0];

           const questionList = [];
           for (let i = 1; i <= 10; i++) {
               const question = parts.find(part => part.startsWith(i + '.'));
               if (question) {
                   questionList.push(question);
               }
           }

           let currentQuestionIndex = 0;
           const totalQuestions = questionList.length;

           function displayQuestion(index) {
               questions.innerHTML = questionList[index];
           }

           function navigateQuestion(direction) {
               currentQuestionIndex += direction;
               if (currentQuestionIndex < 0) {
                   currentQuestionIndex = 0;
               } else if (currentQuestionIndex >= totalQuestions) {
                   currentQuestionIndex = totalQuestions - 1;
               }
               displayQuestion(currentQuestionIndex);
           }

           document.getElementById('backBtn').addEventListener('click', () => navigateQuestion(-1));
           document.getElementById('nextBtn').addEventListener('click', () => navigateQuestion(1));

           displayQuestion(currentQuestionIndex);
       })
       .catch(error => console.error('Error fetching the reading material:', error));
});