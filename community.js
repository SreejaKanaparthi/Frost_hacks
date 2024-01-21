$(document).ready(function () {
    const inviteBtn = $("#invitebtn");

const postBtn = document.getElementById("postbtn");
const mainContainer = document.getElementById("main-container");

// Retrieve saved posts from local storage
const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

// Function to create a post card from saved data
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
    // Remove the post from the savedPosts array
    savedPosts.splice(index, 1);
    // Update the local storage
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    // Remove the post card from the main container
    mainContainer.innerHTML = "";
    savedPosts.forEach((post, index) => createPostCard(post.image, post.text, index));
  }
  
// Load saved posts into the main container
savedPosts.forEach(post => createPostCard(post.image, post.text));

inviteBtn.on("click", () => {
    // Construct the registration page link based on your file structure
    const registrationLink = `${window.location.origin}/Register.html`;

    // Create a temporary input element to copy the link
    const tempInput = $("<input>").attr("value", registrationLink).appendTo("body").select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary input element
    tempInput.remove();

    // Provide feedback to the user (you can use a tooltip, alert, or any other method)
    alert("Registration link copied!");
  });

// Event listener for "Post" button
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

    // Handle cases with or without an image
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
});