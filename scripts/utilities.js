function forEach(arr, callback) {
    for(var i = 0; i < arr.length; i++){
        // call the callback function on each item in the array
        callback(arr[i]);
    }
}
/* 
function logMe(item) {
    console.log("running logMe");
    console.log(item);
}

forEach(["Cat", "Dog", "Elephant"], logMe);
*/