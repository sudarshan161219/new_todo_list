const day = document.querySelector('.day')
const time = document.querySelector('.time')
const form = document.querySelector('.form');
const input = document.querySelector('.form__field')
const darggable_list = document.querySelector('.list-container');
const btn = document.querySelector('.button-86')


function showDayDateTime (){
 const today = new Date();
const options = {
   weekday: "long",
   day: "numeric",
   month: "long",
}
day.textContent = today.toLocaleDateString("en-Us", options);
time.textContent = today.getHours() +':' + String(today.getMinutes()).padStart(2, "0")+':'+ String( today.getSeconds()).padStart(2, "0");
}

setInterval(() => {
    showDayDateTime()
}, 1000);

form.addEventListener('submit', (e) => {
    e.preventDefault();
});



let startIndex = 0;
let list = ['hello']
let listItems = []


function createList() {

let inputValue = document.querySelector('.form__field').value;
list.push(inputValue)
input.value = ''


const listItem = document.createElement('li');

listItem.setAttribute('data-index', startIndex );


listItem.innerHTML =`
<span class="number">${startIndex++}</span>
<div class="draggable" draggable="true">
<p class="person-name">${list[startIndex %= list.length]}</p>
<i class="fas fa-grip-lines"></i>
</div>`;

listItems.push(listItem)
darggable_list.appendChild(listItem)

addEventListeners()

}


btn.addEventListener('click', () => {

    if(input.value === ''){
        return
    }else{
        createList()
    }
    })


function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}


function dragEnter(){
    this.classList.add('over');
}


function dragLeave(){
    this.classList.remove('over');
}


function dragOver(e){
    e.preventDefault()
}

function dragDrop(){
    const dragEndIndex =  +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

// Swap  list items that are darg and drop
function swapItems(fromIndex, toIndex) {
 const itemOne = listItems[fromIndex].querySelector('.draggable')
 const itemTwo = listItems[toIndex].querySelector('.draggable')

listItems[fromIndex].appendChild(itemTwo)
listItems[toIndex].appendChild(itemOne)

}



function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.list-container li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}