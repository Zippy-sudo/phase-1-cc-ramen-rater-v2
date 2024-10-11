// index.js
document.addEventListener("DOMContentLoaded", () => {
  main();
})

// Callbacks
const handleClick = (ramen) => {
  const comment = document.getElementById("comment-display");
  const rating = document.getElementById("rating-display");
  fetch("http://localhost:3000/ramens/")
    .then((resp) => resp.json())
    .then((object) => {
      let answer0, answer1;
      object.forEach(element => {
        const elemImg1 = (element["image"]).slice(1); //whittles down the differing urls for easier comparison
        const ramenSrc1 = (ramen.src).slice(21); //whittles down the differing urls for easier comparison
        if (elemImg1 === ramenSrc1) {
          answer0 = element["comment"];
          answer1 = element["rating"];
          return; // exits forEach at first match
        }
      })
      comment.innerText = answer0;
      rating.innerText = answer1;
    })
};

const addSubmitListener = () => {
  const form0 = document.getElementById("new-ramen");

  //handles "submit" event
  form0.addEventListener("submit", (event) => {

    //prevents default refreshing of DOM on event "submit"
    event.preventDefault();

    //accesses form input values
    const newName = form0.querySelector("input#new-name").value;
    const newRestaurant = form0.querySelector("input#new-restaurant").value;
    const newImage = form0.querySelector("input#new-image").value;
    const newRating = form0.querySelector("input#new-rating").value;
    const newComment = form0.querySelector("textarea#new-comment").value;

    //clears form fields
    event.target.reset();

    //handles creation of new record
    const createNewRamen = (attribute0, attribute1, attribute2, attribute3, attribute4) => {
      const newObj0 = {
        name: attribute0,
        restaurant: attribute1,
        image: attribute2,
        rating: parseInt(attribute3, 10),
        comment: attribute4,
      }
      return newObj0;
    }

    const myObj = createNewRamen(newName, newRestaurant, newImage, newRating, newComment);

    const pictureCollage = document.getElementById("ramen-menu");

    //creates img element in DOM
    const picToAppend = document.createElement("img");

    const ratingElem = document.getElementById("rating-display");
    const commentElem = document.getElementById("comment-display");

    //adds class of imgOfFood to img element
    picToAppend.addEventListener("click", () => {
      ratingElem.innerText = newRating;
      commentElem.innerText = newComment;
    })

    //sets src attribute of img element
    picToAppend.src = newImage;

    //append img element to menuDiv/pictureCollage
    pictureCollage.appendChild(picToAppend);

  })
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((object) => {
      object.forEach(element => {
        const menuDiv = document.querySelector("div#ramen-menu");

        //value to display
        const imgToDisplay = element["image"];

        //creates img element
        const picture1 = document.createElement("img");

        //adds class to created img element
        picture1.classList.add("imgOfFood");

        //sets src of picture1
        picture1.src = imgToDisplay;

        //appends picture1 to the menuDiv
        menuDiv.appendChild(picture1);
      });

      //gets all images with class of imgOfFood
      const picturelist = document.getElementsByClassName("imgOfFood");

      //iterates through pictureList giving every element an eventListener
      for (let element of picturelist) {
        element.addEventListener("click", () => {

          //calls handleClick with element clicked as argument
          handleClick(element);
        })
      }
    })
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
