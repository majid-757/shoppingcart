// variables
const courses = document.querySelector("#courses-list"),
    shoppingCartContent = document.querySelector('#cart-content tbody');

// eventListeners
eventListeners()
function eventListeners() {
    courses.addEventListener('click', buyCourse)

    // remove course from cart
    shoppingCartContent.addEventListener('click', removeCourse)

}

// functions

// add the courses to the cart
function buyCourse(e) {
    e.preventDefault()
    // use delegation for access to the course that selected
    if (e.target.classList.contains('add-to-cart')) {
        // access to the card div with parentElement
        const course = e.target.parentElement.parentElement

        // read value
        getCoursInfo(course)

    }
    
}

// getting the course info that selected by user
function getCoursInfo(course) {

    // course info
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('span').textContent,
        id: course.querySelectorAll('a')[1].getAttribute('data-id'),
    }

    // adding the course to the cart
    addToCart(courseInfo)
}



// adding the course to the cart
function addToCart(courseInfo) {
    // create <tr> tag
    let row = document.createElement('tr') 

    // build HTML Template 
    row.innerHTML = `
        <tr>
            <td>
                <img src="${courseInfo.image}" width = '100px'>
            </td>
            <td>${courseInfo.title}</td>
            <td>${courseInfo.price}</td>
            <td>
                <a class="remove" href="#" data-id="${courseInfo.id}">X</a>
            </td>
        </tr>

    
    `
    shoppingCartContent.appendChild(row)

    
}



// remove course
function removeCourse(e) {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
    }
}


