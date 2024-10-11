const URL =
  "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json";

const fetchData = async () => {
  const response = await fetch(URL);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("error");
  }
};

// Well, here's an unexpected use of recursion
const getRandom = async (arr) => {
  let randomColorArr = arr[Math.floor(Math.random() * arr.length)].colors;
  // I don't want to deal with multi length array, for simplicity I'm just using array with only 2 colors.
  if (randomColorArr.length === 2) {
    return randomColorArr;
  } else {
    const newData = await fetchData();
    return getRandom(newData);
  }
};

// const pastelColors = [
//   "#FFD1DC", // Pastel Pink
//   "#A7C6ED", // Pastel Blue
//   "#B7E4D9", // Pastel Green
//   "#F8E0A0", // Pastel Yellow
//   "#E1C6E7", // Pastel Lavender
//   "#FFB3B3", // Pastel Peach
//   "#C6FFED", // Pastel Mint
//   "#D8BFD8", // Pastel Purple
//   "#FFB88C", // Pastel Orange
//   "#D3D3D3", // Pastel Grey
// ];
//
// let currentIndex = 0;

const changeBgColor = async () => {
  let data = await fetchData();
  const colors = await getRandom(data);

  // Set the new gradient colors for cool transition effect
  // document.body.style.setProperty("--color1", colors[0]);
  // document.body.style.setProperty("--color2", colors[1]);

  // Loop colors
  // document.body.style.backgroundColor = pastelColors[currentIndex];
  // currentIndex = (currentIndex + 1) % pastelColors.length;
};

document.getElementById("bg-change").addEventListener("click", changeBgColor);
