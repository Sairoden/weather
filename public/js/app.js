// // const getPuzzle = async () => {
// //   try {
// //     const res = await fetch("http://puzzle.mead.io/puzzle");
// //     const data = await res.json();
// //     console.log(data);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // getPuzzle();

const getWeatherForecast = async () => {
  try {
    const res = await fetch("http://localhost:3000/weather?address=boston");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

getWeatherForecast();
