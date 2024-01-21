const postBtn = document.getElementById("postbtn");
const mainContainer = document.getElementById("main-container");
const inviteBtn = document.getElementById("inviteBtn");


const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];


function createPostCard(imageData, text, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.src = imageData;
  card.appendChild(cardImage);

  const cardText = document.createElement("p");
  cardText.textContent = text;
  card.appendChild(cardText);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => deletePost(index));

  card.appendChild(deleteBtn);

  mainContainer.appendChild(card);
}

function deletePost(index) {
  
  savedPosts.splice(index, 1);
  
  localStorage.setItem("posts", JSON.stringify(savedPosts));
  
  mainContainer.innerHTML = "";
  savedPosts.forEach((post, index) => createPostCard(post.image, post.text, index));
}


savedPosts.forEach(post => createPostCard(post.image, post.text));

postBtn.addEventListener("click", () => {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  imageInput.classList.add("image-input");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter your text here";
  textInput.classList.add("text-input");

  const postInfoBtn = document.createElement("button");
  postInfoBtn.textContent = "Post Information";
  postInfoBtn.classList.add("post-info-btn");

  inputContainer.appendChild(imageInput);
  inputContainer.appendChild(textInput);
  inputContainer.appendChild(postInfoBtn);

  mainContainer.appendChild(inputContainer);

  postInfoBtn.addEventListener("click", () => {
    const imageFile = imageInput.files[0];
    const text = textInput.value;

    
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const imageData = reader.result;
        const post = { image: imageData, text: text };
        savedPosts.push(post);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
        createPostCard(imageData, text);
        inputContainer.remove();
      };
    } else {
      const post = { image: "", text: text };
      savedPosts.push(post);
      localStorage.setItem("posts", JSON.stringify(savedPosts));
      createPostCard("", text);
      inputContainer.remove();
    }
  });
});


inviteBtn.addEventListener("click", () => {
    
    const registrationLink = "https://sreejakanaparthi.github.io/frost_hacks/"; // Replace with your actual base link
  
    
    const tempInput = document.createElement("input");
    tempInput.value = registrationLink;
  
  document.body.appendChild(tempInput);

  
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  
  document.execCommand("copy");

  
  document.body.removeChild(tempInput);

  
  alert("Registration link copied!");
});
