const area = document.getElementById('area')
const cell = document.getElementsByClassName('cell')
const currentPlayer = document.getElementById('curPlayer')
// Обьявление игрока
let player = "x"

//Логика статистики
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

// Выйграшные комбинации
const winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

// Создание игрового поля
for (let i = 1; i <= 9; i++){
    area.innerHTML += "<div class='cell' pos=" + i + "></div>"
}


for (let i = 0; i<cell.length; i++){
    cell[i].addEventListener('click', cellClick, false)
}

function cellClick(){
    let data = []
    if(!this.innerHTML){
        this.innerHTML = player;
    } else {
        alert('Ячейка занята')
        return
    }

    for (let i in cell){
        if (cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }
  
    if(checWin(data)) {
        stat[player]+= 1
        restart(`Выйграл: ${player}`)
    } else {
        let draw = true
        for(var i in cell){
            if(cell[i].innerHTML == '') draw = false
        }
        if(draw){
            stat[player]+= 1
            restart('Ничья')
        }

    }

    player = player == 'x' ? 'o' : 'x';
    currentPlayer.innerHTML = player.toUpperCase()
}

function checWin(data) {
    for(let i in winIndex){
        let win = true
        for(let j in winIndex[i]){
            let id = winIndex[i][j]
            let ind = data.indexOf(id)

            if (ind == -1){
                win = false
            }
        }
        if(win) return true
    }
    return false
}

function restart(text) {
    
    alert (text)
    for(let i = 0; i < cell.length; i++){
        cell[i].innerHTML = ''
    }

    updateStat();
}

function updateStat(){
    document.getElementById('wX').innerHTML = stat.x
    document.getElementById('wO').innerHTML = stat.o
    document.getElementById('xo').innerHTML = stat.d
}