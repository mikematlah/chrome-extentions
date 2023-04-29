
const saveBtn = document.getElementById('input-btn')
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const saveUrlBtn = document.getElementById ('url-btn')
const deleteBtn = document.getElementById ('delete-btn')
let myLeads = JSON.parse(localStorage.getItem('urls'))?JSON.parse(localStorage.getItem('urls'))  : []

function render(arr){
    let listItems = ''
    for(let i = 0; i < arr.length;i++){
        listItems +=
        `<li class='url-container'>
            <a href=${arr[i].url} target='_blank' >${arr[i].url}</a>
            <button class='delete-url' id =${arr[i].id}>delete</button>
           
        </li>`
    }
    ulEl.innerHTML = listItems
}

render(myLeads)

saveBtn.addEventListener('click',function(){
    if(inputEl.value){
        myLeads.push({url:inputEl.value,id:generateId()})
        saveToStorage(myLeads)
        render(myLeads)
        inputEl.value = ''
    }
  
   
})

saveUrlBtn.addEventListener ('click',function(){
 
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myLeads.push({url:tabs[0].url,id:generateId()})
        saveToStorage(myLeads)
        render(myLeads)
    })
   
})

deleteBtn.addEventListener ('dblclick',function(){
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

ulEl.addEventListener("click",function(event){

    let newArr = []
    

        for(let i = 0; i < myLeads.length;i++){
            if(Number(event.target.id) !== myLeads[i].id){
                console.log(event.target.id)
                newArr.push(myLeads[i])
            }
         
        }
     
    
    myLeads = newArr.map(el=>el)
    render(myLeads)


})

function saveToStorage(data){
    localStorage.setItem('urls',JSON.stringify(data))
}
function generateId(){
    return Math.random()
}