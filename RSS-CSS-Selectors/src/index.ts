import './style.css';
import levels from './components/levels';
import hljs from 'highlight.js';
import 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/base16/classic-light.css';
hljs.highlightAll();

const mainHeader = document.querySelector('.main__header') as HTMLElement;
const lawn = document.querySelector('.lawn') as HTMLDivElement;
const input: HTMLInputElement | null = document.querySelector('.code-input');
const enterButton = document.querySelector('.enter-button');
const codeHTML = document.querySelector('.code-editor__code_html') as HTMLDivElement;
const codeEditor = document.querySelector('.editor-wrapper');
const level = document.querySelectorAll('.levels__level');
const reset = document.querySelectorAll('.levels__reset');
const helpButton = document.querySelector('.help-button');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close-button');


let currentLevel: number = Number(localStorage.getItem('currentLevel')) || 1;
localStorage.setItem('currentLevel', `${currentLevel}`);

interface levelState {
  correct: boolean,
  help: boolean
}

let passedLevels: Record<string, levelState> = JSON.parse(localStorage.getItem('passedLevels')!) || {};
localStorage.setItem('passedLevels', JSON.stringify(passedLevels));

fillPage();

lawn.addEventListener('mouseover', (event) => {
  let target = event?.target as Element;
  if (!target.classList.contains('lawn')) {
    target.classList.add('hover');
  }
})

lawn.addEventListener('mouseout', (event) => {
  let target = event?.target as Element;
  if (!target.classList.contains('lawn')) {
    target.classList.remove('hover');
  }
})

function fillPage() {
  mainHeader.innerText = levels[currentLevel - 1].title;
  lawn.innerHTML = levels[currentLevel - 1].boardMarkup;
  input!.value = '';
  codeHTML.innerText = `<div class="lawn"> ${levels[currentLevel - 1].boardMarkup} </div>`;
  passedLevels[currentLevel] = {
    correct: false,
    help: false
  }
  localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
  animateActiveElements();
  level[currentLevel-1].classList.add('levels__level_current');
  for (let key in passedLevels) {
    if (passedLevels[key].correct && !passedLevels[key].help) level[+key-1].classList.add('levels__level_passed');
    if (passedLevels[key].correct && passedLevels[key].help) level[+key-1].classList.add('levels__level_passed_help');
  }
}

function animateActiveElements() {
  lawn.querySelectorAll(`${levels[currentLevel - 1].selector}`).forEach((el) => el.classList.add('active'))
}

function isCorrect() {
  const answer = input!.value;
  try { //https://stackoverflow.com/questions/34849001/check-if-css-selector-is-valid
    document.querySelectorAll(`${answer}`);
  } catch (e) {
    return false
  }
  const inputAnswer = document.querySelectorAll(`${answer}`);
  const taskAnswer = document.querySelectorAll(levels[currentLevel - 1].selector);
  if (inputAnswer.length !== taskAnswer.length) return false
  inputAnswer.forEach((el, index) => {
    if (el !== taskAnswer[index]) return false
  })
  return true;
}

function isRightAnswer() {
  if (!isCorrect()) {
    codeEditor?.classList.add('shake');
    setTimeout(() => {
      codeEditor?.classList.remove('shake')
    }, 1000);
  } else {
    if (levels.length === currentLevel) {
      level[currentLevel - 1].classList.remove('levels__level_current');
      passedLevels[currentLevel].correct = true;
      localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
      if (passedLevels[currentLevel].correct && !passedLevels[currentLevel].help) level[+currentLevel-1].classList.add('levels__level_passed');
      if (passedLevels[currentLevel].correct && passedLevels[currentLevel].help) level[+currentLevel-1].classList.add('levels__level_passed_help');
      modal?.classList.add('modal_open');
    } else {
      document.querySelectorAll(`${levels[currentLevel - 1].selector}`).forEach((el) => el.classList.add('clean'));
      setTimeout(() => {
        input!.value = '';
        level[currentLevel-1].classList.remove('levels__level_current');
        passedLevels[currentLevel].correct = true;
        localStorage.setItem('passedLevels', JSON.stringify(passedLevels))
        currentLevel++;
        localStorage.setItem('currentLevel', `${currentLevel}`);
        level[currentLevel-1].classList.add('levels__level_current');
        fillPage();
      }, 1000);
    }
  }
};

enterButton?.addEventListener('click', isRightAnswer);
input!.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    isRightAnswer();
  }
});

reset.forEach((el) => el.addEventListener('click', () => {
  currentLevel = 1;
  localStorage.setItem('currentLevel', `${currentLevel}`);
  passedLevels = {};
  passedLevels[currentLevel] = {
    correct: false,
    help: false
  }
  localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
  document.querySelectorAll('.levels__level').forEach(el => {
    el.classList.remove('levels__level_current');
    el.classList.remove('levels__level_passed');
    el.classList.remove('levels__level_passed_help')
  });
  modal?.classList.remove('modal_open');
  fillPage();
}))

level.forEach((el) => {
  el.addEventListener('click', () => {
    level[currentLevel-1].classList.remove('levels__level_current');
    currentLevel = +el.innerHTML;
    localStorage.setItem('currentLevel', `${currentLevel}`);
    passedLevels[`${currentLevel}`] = {
      correct: false,
      help: false
    }
    localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
    fillPage();
  })
})

helpButton?.addEventListener('click', () => {
  input!.value = '';
  const help = levels[currentLevel - 1].selector;
  typeText(help);
  passedLevels[currentLevel].help = true;
  localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
})

function typeText(text: string) {
  if (text.length > 0) {
    input!.value += text[0];
    setTimeout(() => typeText(text.slice(1)), 300)
  }
}

modalClose?.addEventListener('click', () => {
  modal?.classList.remove('modal_open');
})
