// let seconds = 5
// counter = 4

// timerout = () => {

//     timer = setTimeout(() => {
//         secondsCount();
//         timerout();
//     }, 1000)
//     if (counter <= 0) {
//         clearTimeout(timer)
//     }
// }

// timerout();
// function secondsCount() {
//     seconds--;
//     console.log(seconds);
//     if (seconds <= 0) {
//         clearTimeout(timer);
//         seconds = 5;
//         counter--;
//     }
// }
count =0 
const myFunction = () => {
    count++
    console.log(count)
  
    setTimeout(myFunction, 1000)
  }
  
  setTimeout(
    myFunction(), 1000)