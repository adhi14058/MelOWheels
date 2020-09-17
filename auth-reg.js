//Listen for Auth staus changes

auth.onAuthStateChanged((user) => {
  if (user != null) {
    window.location.href = "index.php";
  }
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//SignUp

const signUpForm = document.querySelector("#regForm");
var userType = "customer";
signUpForm.addEventListener("submit", (e) => {
  //get form values
  e.preventDefault();
  const username = signUpForm["nusername"].value;
  const email = signUpForm["nemail"].value;
  const password = signUpForm["npassword"].value;
  db.collection("Users").add({
    username: username,
    type: userType,
    user_id: uuidv4(),
  });
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      addToUsers(user);
      localStorage.setItem("email", email);
      window.location.href = "index.php";
    })
    .catch(function (err) {
      setTimeout(function () {
        var errorMsg = err.message;
        document.querySelector(".alert").style.display = "block";
        document.querySelector(".alert").innerHTML = errorMsg;
      }, 3000).then(() => {
        document.querySelector(".alert").style.display = "none";

        signUpForm.reset();
      });
    });
});
