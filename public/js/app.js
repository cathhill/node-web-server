console.log("Client side javascript file loaded");

/* fetch(
  // fetch data from this url and then run this function.
  "http://puzzle.mead.io/puzzle"
).then((response) => {
  //this function will run when the json data has arrived.
  response.json().then((data) => {
    console.log(data);
  });
}); */

fetch("http://localhost:3000/weather?address=boston").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});
