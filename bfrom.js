//Listen for Auth staus changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in: ", user);
    //addToUsers(user);
  } else {
    console.log("User logged out ");
    window.location.href = "auth_login.php";
  }
});

// add users to database 'users'
// function addToUsers(user) {
//     var email = user.email;
//     var uid = user.uid;

//     var users = db.collection("users").doc(uid);
//     users.set({
//         email: email,
//         id: uid,
//     });
//   }

//Logout
const logoutbtn = document.querySelector("#logout");

logoutbtn.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

const form = document.querySelector("#distance_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(getDetails());
  let [km, time, price] = getDetails();
  db.collection("bookings")
    .add({
      StartLocation: form.origin.value,
      DropLocation: form.destination.value,
      Weight: form.kgs.value,
      DeliveryTime: form.time.value,
      bookingType: "0",
      DeliveryNotes: form.notes.value,
      OrderId: form.Oid.value,
      km: km,
      time: time,
      price: price,
      user: localStorage.getItem("email"),
    })
    .then(() => {
      console.log("Booked");
      let dateNow = new Date();
      var doc = new jsPDF();
      let invoice = `\n
         user mail - ${localStorage.getItem("email")}\n
         date and time - ${
           dateNow.getDate() +
           "/" +
           (dateNow.getMonth() + 1) +
           "/" +
           dateNow.getFullYear()
         }\n
         order ID - ${form.Oid.value}\n
         pickup Location - ${form.origin.value}\n
         drop Location - ${form.destination.value}\n
         delivery time - ${time}\n
         Weight - ${form.kgs.value}\n
         Total cost - ${price.toFixed(2)}\n
         DeliveryNotes- ${form.notes.value}\n`;
      doc.text(invoice, 10, 10);
      doc.save("a4.pdf");
    });
});
