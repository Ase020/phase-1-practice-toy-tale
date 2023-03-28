let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
   const addNewToy = document.querySelector("form");
   addNewToy.addEventListener("submit", (e) => {
      e.preventDefault();
      const toyObj = {
         name: e.target.children[1].value,
         image: e.target.children[2].value,
         likes: 0,
      };
      fetch("http://localhost:3000/toys", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify(toyObj),
      })
         .then((res) => res.json())
         .then((data) => console.table(data));
   });

   const addBtn = document.querySelector("#new-toy-btn");
   const toyFormContainer = document.querySelector(".container");
   addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
         toyFormContainer.style.display = "block";
      } else {
         toyFormContainer.style.display = "none";
      }
   });

   //  Fetch data
   const toyCollection = document.querySelector("#toy-collection");
   fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => {
         data.forEach((toys) => {
            const div = document.createElement("div");
            div.className = "card";
            div.id = `${toys.id}`;
            div.innerHTML = `
     
     <h2>${toys.name}</h2>
     <img src=${toys.image} class="toy-avatar" alt=${toys.id} />
     <p>${toys.likes} Likes</p>
     <button class="like-btn" id="[toy_id]">Like ❤️</button>
     `;
            toyCollection.append(div);
         });
      });

   toyCollection.addEventListener("click", () => {
      let pressLikeBtn = event.target.className === "like-btn";

      if (pressLikeBtn) {
         let id = event.target.parentElement.dataset.id;
         let like = event.target.previousElementSibling;
         let likeCount = parseInt(event.target.previousElementSibling.innerText);
         like.innerText = `${++likeCount} likes`;

         fetch(`http://localhost:3000/toys/${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               likes: likeCount,
            }),
         })
            .then((response) => response.json())
            .then(console.log);
      }
   });
});
