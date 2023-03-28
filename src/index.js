let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
            const div = document.createElement("div.card");
            div.innerHTML = `
     
     <h2>${toys.name}</h2>
     <img src=${toys.image} class="toy-avatar" alt=${toys.id} />
     <p>${toys.likes} Likes</p>
     <button class="like-btn" id="[toy_id]">Like ❤️</button>
     `;
            toyCollection.append(div);
         });
      });
});
