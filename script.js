var $start = document.querySelector('#start') // переменная кнопки "начать"
var $game = document.querySelector('#game') // игровое поле 
var $time = document.querySelector('#time') // секунды в таймере 
var $timer = document.querySelector('#time-header') //вверхняя облать с обратным отсчетом времени 
var $inputTime = document.querySelector('#game-time') //инпут с выбором секунд 
var $result = document.querySelector('#result') //количество нажатых квадратов
var $resultHeader = document.querySelector('#result-header') //область с результатом
var $recordTable = document.querySelector('.record') //область лучшего результата с его значением 
var $record = document.querySelector('#best') //лучший результат 

var isGameStart = false
var score = 0;
$time.textContent = parseFloat($inputTime.value)

$start.addEventListener('click', startGame)
$game.addEventListener('click', changeBox) 
$inputTime.addEventListener('click', changeTime)

function hide($el) {
    $el.classList.add('hide')
}

function show($el) {
    $el.classList.remove('hide')
}

// начало игры 
function startGame(){
    isGameStart = true
    score = 0
    hide($resultHeader)
    show($timer)
    hide($start) 
    $game.style.backgroundColor = '#fff'

    $inputTime.setAttribute('disabled', 'true') //блокирует возможность изменять время во время игры 

    // создаение квадратов
    createBox()


    // отвечает за обратный отсчет до конца игры 
    var gameTime = setInterval(function() {
        var t = parseFloat($time.textContent)

        if (t > 0) {
            $time.textContent = (t - 0.1).toFixed(1)
        } else {
            clearInterval(gameTime)
            endGame()
        }
    }, 100)
}

// функция, создающая квадраты 
function createBox() {
    $game.innerHTML = '' 
    var box = document.createElement('div') 
    var sizeBox = random(30, 70) 
    var colorBox = random(100000, 999999)

    // возможность перемещаться по экрану 
    var sizeGame = $game.getBoundingClientRect()
    var topMax = sizeGame.height - sizeBox
    var leftMax = sizeGame.width - sizeBox  
    
    // различные стили высоты широты для квадрата 
    box.style.height = box.style.width = sizeBox + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#' + colorBox
    box.style.top = random(0, topMax) + 'px'
    box.style.left = random(0, leftMax) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')
    
    $game.style.border = '3px solid #' + colorBox
    $game.insertAdjacentElement('afterbegin', box) 
}

//смена квадрата при выполненных условиях
function changeBox(event) {
    if(!isGameStart) {
        return
    }

    if (event.target.dataset.box) {
        score++
        createBox()
    }
}

//функция для вызова рандомного числа в указанном диапазоне 
function random(min, max) {
    return Math.floor(Math.random() * (max-min) + min)  
}

//конец игры
function endGame() {
    isGameStart = false
    show($recordTable)
    show($start) 
    $game.style.backgroundColor = '#c7b3b3'
    hide($timer)
    show($resultHeader)
    $result.textContent = score
    $time.textContent = parseFloat($inputTime.value)
    $inputTime.removeAttribute('disabled')
    $game.style.border = 'none'
    $game.innerHTML = ''
    bestGame()
}

// функция возможности изменять время игры
function changeTime() {
    $time.textContent = parseFloat($inputTime.value)
    show($timer)
    hide($resultHeader)
}

//вывод лучшего результата
function bestGame() {
    if ($record.textContent < score) {
        $record.textContent = score
    }
}


// полезные методы и функции: 
// clearInterval() - отменяет многократные повторения действий, установленные вызовом функции setInterval(), можно использовать только в случае если setInterval присвоен какой-то переменной
// getBoundingClientRect() - выводит данные про элемент(ширину, высоту и тд)
// insertAdjacentElement() - размещение созданного элемента 

