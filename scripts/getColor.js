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

const changeBgColor = async () => {
  let data = await fetchData();
  const colors = await getRandom(data);

  console.log(colors);
  document.body.style.background = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
};

document.getElementById("bg-change").addEventListener("click", changeBgColor);
