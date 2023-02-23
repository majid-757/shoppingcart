// variables
const courses = document.querySelector("#courses-list"),
  shoppingCartContent = document.querySelector("#cart-content tbody"),
  clearCartBtn = document.querySelector("#clear-cart");

// eventListeners
eventListeners();
function eventListeners() {
  courses.addEventListener("click", buyCourse);

  // remove course from cart
  shoppingCartContent.addEventListener("click", removeCourse);

  // remove all courses from cart
  clearCartBtn.addEventListener("click", clearCart);

  // show courses from storage when loaded
  document.addEventListener("DOMContentLoaded", showCoursesOnLoad);
}

// functions

// add the courses to the cart
function buyCourse(e) {
  e.preventDefault();
  // use delegation for access to the course that selected
  if (e.target.classList.contains("add-to-cart")) {
    // access to the card div with parentElement
    const course = e.target.parentElement.parentElement;

    // read value
    getCoursInfo(course);
  }
}

// getting the course info that selected by user
function getCoursInfo(course) {
  // course info
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector("span").textContent,
    id: course.querySelectorAll("a")[1].getAttribute("data-id"),
  };

  // adding the course to the cart
  addToCart(courseInfo);
}

// adding the course to the cart
function addToCart(courseInfo) {
  // create <tr> tag
  let row = document.createElement("tr");

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

    
    `;
  shoppingCartContent.appendChild(row);

  saveToStorage(courseInfo);
}

// add to local storage
function saveToStorage(courseInfo) {
  // get array of courses from local storage
  let courses = getFromStorage();

  // add a new course to the array of courses
  courses.push(courseInfo);

  localStorage.setItem("courses", JSON.stringify(courses));
}

// get content from local storage
function getFromStorage() {
  let courses;
  // if courses exist in local storage
  if (localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
  } else {
    courses = [];
  }

  return courses;
}

// remove course
function removeCourse(e) {
    let course, courseId

    if (e.target.classList.contains("remove")) {
        e.target.parentElement.parentElement.remove();

    course = e.target.parentElement.parentElement
    courseId = course.querySelector('a').getAttribute('data-id')
  }

  // remove course from local storage
  removeCourseLS(courseId)

}

// remove course from local storage
function removeCourseLS(id) {
    let coursesLS = getFromStorage()

    coursesLS.forEach(function(course, index) {
        if (course.id === id) {
            coursesLS.splice(index, 1)
        }
    });

    localStorage.setItem("courses", JSON.stringify(coursesLS))

}





// remove all courses from DOM
function clearCart() {
  while (shoppingCartContent.firstChild) {
    shoppingCartContent.firstChild.remove();
  }

  clearCartLS()

}

// clear add courses from local storage
function clearCartLS() {
    localStorage.clear()
}


// show courses when document loaded and add courses into the cart
function showCoursesOnLoad() {
  let coursesLS = getFromStorage();

  // add courses into the cart
  coursesLS.forEach(function (courseInfo) {
    let row = document.createElement("tr");

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

    
    `;
    shoppingCartContent.appendChild(row);
  });
}
