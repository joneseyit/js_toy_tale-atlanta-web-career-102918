const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const URL = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", initPage)

function initPage(){
  addCreateHandler()
  fetchToys()



}

function fetchToys(){
  fetch(URL)
  .then(res => res.json())
  .then(json => json.forEach(displayToys))

}

function displayToys(toy){
    let toyContainer = document.querySelector("#toy-collection")
    let toyHTML = `
    <div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn">Like</button>
    </div>
    `
    toyContainer.innerHTML += toyHTML
    addLikesHandler()
}

function addCreateHandler(){
  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", processNewToy)
}

function processNewToy(e){
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  e.target.reset()
  createToy(name, image).then(displayToys)
}

function createToy(name, image) {
  let request = new Request(URL)
  let options = {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify
  ({
    name: name,
    image: image,
    likes: 0
  })
  }
  return fetch(request, options)
  .then(resp => resp.json())
}

function addLikesHandler(){
  let buttons = document.querySelectorAll(".like-btn")
  buttons.forEach(function(button){
    button.addEventListener('click', increaseLikes)
  })
}

function increaseLikes(e){
  let x = parseInt(event.target.parentNode.querySelector("p").innerText)
  x += 1
  event.target.parentNode.querySelector("p").innerText = x

  let id = event.target.parentNode.dataset.id
  patchLikes(id, x)
}

function patchLikes(id, likeNum){
  debugger
  let request = new Request(`http://localhost:3000/toys/${id}`)
  let options = {
    method: 'PATCH',
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify
  ({

    likes: likeNum
  })
  }
  fetch(request, options)
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
