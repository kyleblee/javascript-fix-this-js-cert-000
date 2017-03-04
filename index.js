var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(() => { // I changed this to an arrow function instead of function() but that was the only change
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer])) //I added the correct "array" syntax for the arguments of apply, but that was the only change
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(cake);
  mix(updateCakeStatus);
}

function makePie() {
  var updatePieStatus = updateStatus.bind(pie);
  mix(updatePieStatus);
  pie.decorate = cake.decorate.bind(pie);
  pie.decorate(); //not sure why this isn't working for #2. Coming back to it later.
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText;
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(() => {
    cool(updateFunction)
  }, 2000)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ") //this line is where the things are getting caught up for now.
  setTimeout(() => {
    bake(updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  cakeLink = document.getElementsByClassName('js-make')[0];
  pieLink = document.getElementsByClassName('js-make')[1];
  if (this === cakeLink) {
    makeCake.call(cake);
  } else if (this === pieLink) {
    makePie.call(pie);
  } else {
    console.log('neither links were clicked...')
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
