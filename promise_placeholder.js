var promise = new Promise(function(resolve, rejecte) {
  resolve("Stuff worked");
});

var showOff = function(message) {
  console.log(message);
  return Promise.result("That's second promise");
};

promise.then(showOff)
.then(function(result) {
  console.log(result);
});
