let inputMoney = document.querySelector('.money-count');
let inputBtn = document.querySelector('.add-state');
let list = document.querySelector('.list');

let state = {
    allMoney: 0,
    middleMoneyWeek: 0,
    value: 0,
    check: true,
    date: [],
    state: []
}

window.onload = () => {
    if (localStorage.getItem('state') !== null) {
        state = JSON.parse(localStorage.getItem('state'));
        for (let i = 1; i < state.state.length; i++) {
            addItem(state.state[i][0], state.state[i][1], i, state.date[i])
            state.value = i
        }
        document.querySelector('.allMoney'). innerHTML = 'Всего: ' + state.allMoney + ' руб';


        document.querySelectorAll('.iteml').forEach(el => {
            el.addEventListener('click', (item) => {

                document.querySelector('.' + item.target.className.split(' ')[0]).innerHTML = '';
                let x = [item.target.className.split(' ')[0].split('list-item-')[1]]
                state.allMoney -= state.state[x][0]
                state.state.splice(x , 1);
                console.log(state.state)
                localStorage.setItem('state', JSON.stringify(state))
            })

        })
    }
}

document.querySelector('.clearr').addEventListener('click', () => {
    window.localStorage.removeItem('state');
    window.localStorage.clear()
})

inputBtn.addEventListener('click', function() {
    let text = inputMoney.value.split(' ')
    if (inputMoney.value !== '') {
        state.allMoney += Number(text[0])
    }
    state.value++
    state.state[state.value] = text;
    addItem(Number(text[0]), text[1], state.value)
    console.log(state.allMoney)
    inputMoney.value = '';
    document.querySelector('.allMoney'). innerHTML = 'Всего: ' + state.allMoney + ' руб';
})

function addItem(text, deadline, index, datte) {
    let date = new Date();
    let datee = date.getDate() + '.' + (Number(date.getMonth()) + 1);
    list.insertAdjacentHTML('beforeend', '<li class="list-item-' + index + ' iteml" id="item">Дата: ' + datte + ' __ Цена: ' + text + ' руб __ Срок: ' + deadline + '</li>');
    state.date[state.value] = datee;
    localStorage.setItem('state', JSON.stringify(state))
    console.log(state.date)
}

