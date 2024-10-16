// index.js
document.addEventListener("DOMContentLoaded", () => {
  main();
})

// Callbacks
const handleClick = (ramen, object2) => {
  const nameDisplay1 = document.querySelector("h2.name");
  const restaurantDisplay1 = document.querySelector("h3.restaurant");
  const imgDisplay1 = document.querySelector("img.detail-image");
  const ratingDisplay1 = document.querySelector("span#rating-display");
  const commentDisplay1 = document.querySelector("p#comment-display");

  object2.forEach(element => {
    if (element["name"] === ramen.id) {
      nameDisplay1.innerText = element["name"];
      restaurantDisplay1.innerText = element["restaurant"];
      imgDisplay1.src = element["image"];
      ratingDisplay1.innerText = element["rating"];
      commentDisplay1.innerText = element["comment"];
      return; // exits forEach at first match
    }
  })
};

const addSubmitListener = (object3) => {
  const form0 = document.getElementById("new-ramen");
  const form1 = document.getElementById("edit-ramen");
  const button = document.getElementById("Delete");

  //eventlistener for delete button
  button.addEventListener("click", () => {

    const deleteFromObject = (object, currentDisplayedRamen) => {
      for (let element of object) {
        if (element["name"] === currentDisplayedRamen.innerText) {
          object.splice(object.indexOf(element), 1);
          return 1;
        }
      }
    }
    const deleteFromDOM = (HTMLCollection, currentDisplayedRamen) => {
      for (let element of HTMLCollection) {
        if (element.id === currentDisplayedRamen.innerText) {
          element.remove();
          return 1;
        }
      }
    }
    const deleteFromServer = () => {
      fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(object4 => {
          const currentlyDisplayedRamen = document.querySelector("h2.name");
          const ramenCollection = document.querySelectorAll("img.imgOfFood");
          for (let element of object4) {
            if (element["name"] === currentlyDisplayedRamen.innerText) {
              fetch(`http://localhost:3000/ramens/${element["id"]}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(resp => resp.json())
                .then((object5) => {

                  deleteFromObject(object4, currentlyDisplayedRamen);
                  deleteFromDOM(ramenCollection, currentlyDisplayedRamen);

                  const imgDisplay3 = document.querySelector("img.detail-image");
                  const nameDisplay3 = document.querySelector("h2.name");
                  const restaurantDisplay3 = document.querySelector("h3.restaurant");
                  const ratingDisplay3 = document.querySelector("span#rating-display");
                  const commentDisplay3 = document.querySelector("p#comment-display");

                  imgDisplay3.src = object4[0]["image"];
                  nameDisplay3.innerText = object4[0]["name"];
                  restaurantDisplay3.innerText = object4[0]["restaurant"];
                  ratingDisplay3.innerText = object4[0]["rating"];
                  commentDisplay3.innerText = object4[0]["comment"];
                })
                .catch(error => {
                  alert(error.message)
                  console.log(error.message)
                })
            }
          }
        })
    }

    deleteFromServer();
  })

  //handles submission of new ramen
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

    const nameDisplay2 = document.querySelector("h2.name");
    const restaurantDisplay2 = document.querySelector("h3.restaurant");
    const imgDisplay2 = document.querySelector("img.detail-image");
    const ratingDisplay2 = document.querySelector("span#rating-display");
    const commentDisplay2 = document.querySelector("p#comment-display");

    //adds class of imgOfFood to img element
    picToAppend.addEventListener("click", () => {
      nameDisplay2.innerText = myObj.name;
      restaurantDisplay2.innerText = myObj.restaurant;
      imgDisplay2.src = myObj.image;
      ratingDisplay2.innerText = myObj.rating;
      commentDisplay2.innerText = myObj.comment;
    })

    //sets attributes of new img element
    picToAppend.classList.add("imgOfFood");
    picToAppend.setAttribute("id", newName);
    picToAppend.src = newImage;

    //append img element to menuDiv/pictureCollage
    pictureCollage.appendChild(picToAppend);

    object3.push(myObj);

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(myObj),
    }

    //POST to server
    fetch("http://localhost:3000/ramens", configObj)
      .then((response) => response.json())
      .then((object) => {
      })
      .catch((error) => {
        console.log(error);
        alert("POST Error : Failed to POST");
      })
  })

  //handles submission of updates to ramen
  form1.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentDisplayedRamen0 = document.querySelector("h2.name");

    const updatedRating = form1.querySelector("input#new-rating").value;
    const updatedComment = form1.querySelector("textarea#new-comment").value;

    const ratingDisplay3 = document.querySelector("span#rating-display");
    const commentDisplay3 = document.querySelector("p#comment-display");

    ratingDisplay3.innerText = updatedRating;
    commentDisplay3.innerText = updatedComment;

    object3.forEach(element => {
      if (element["name"] === currentDisplayedRamen0.innerText) {
        element["rating"] = updatedRating;
        element["comment"] = updatedComment;
      }
    });
    event.target.reset();
  })
}

const displayRamens = (object1) => {
  const imgDisplay0 = document.querySelector("img.detail-image");
  const nameDisplay0 = document.querySelector("h2.name");
  const restaurantDisplay0 = document.querySelector("h3.restaurant");
  const ratingDisplay0 = document.querySelector("span#rating-display");
  const commentDisplay0 = document.querySelector("p#comment-display");

  //display first elemet in object without user interaction
  imgDisplay0.src = object1[0]["image"];
  nameDisplay0.innerText = object1[0]["name"];
  restaurantDisplay0.innerText = object1[0]["restaurant"];
  ratingDisplay0.innerText = object1[0]["rating"];
  commentDisplay0.innerText = object1[0]["comment"];

  object1.forEach(element => {
    const menuDiv = document.querySelector("div#ramen-menu");

    //value to display
    const imgToDisplay = element["image"];

    //creates img element
    const picture1 = document.createElement("img");

    //adds class to created img element
    picture1.classList.add("imgOfFood");
    picture1.setAttribute("id", element["name"]);

    //sets src of picture1
    picture1.src = imgToDisplay;

    //appends picture1 to the menuDiv
    menuDiv.appendChild(picture1);
  });

  //gets all images with class of imgOfFood
  const ramenList = document.getElementsByClassName("imgOfFood");

  //iterates through pictureList giving every element an eventListener
  for (let element of ramenList) {
    element.addEventListener("click", () => {

      //calls handleClick with element clicked as argument
      handleClick(element, object1);
    })
  }
}

const main = () => {
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((object0) => {
      // Invoke displayRamens here
      displayRamens(object0);
      // Invoke addSubmitListener here
      addSubmitListener(object0);
    })
}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
