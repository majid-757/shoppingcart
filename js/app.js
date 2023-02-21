// variables
const courses = document.querySelector("#courses-list");

// eventListeners
eventListeners()
function eventListeners() {
    courses.addEventListener('click', buyCourse)
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
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
    }

    console.log(courseInfo)
}






