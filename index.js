// Adding eventlistener & fetching colors

document.getElementById("get-color").addEventListener("click", function () {
  const inputColorValue = document
    .getElementById("color-input")
    .value.substring(1);
  const selectedModeValue = document.getElementById("colors").value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputColorValue}&format=json&mode=${selectedModeValue}&count=5`
  )
    .then((response) => response.json())
    .then((colors) => {
      const colorsArray = [];
      colors.colors.forEach((color) => {
        colorsArray.push(color.hex.value);
        renderColors(colorsArray);
      });
    });
});

// Copy color to clipboard

document.addEventListener(
  "click",

  async function (e) {
    let checkedColor = e.target.dataset.color;
    if (e.target.dataset.color) {
      try {
        await navigator.clipboard.writeText(checkedColor);
        alert("Copied to clipboard");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  }
);

// Rendering colors from the array

function renderColors(colorsArray) {
  let colorsHtml = ``;
  for (let color of colorsArray) {
    colorsHtml += `
	<div class="color" style="background-color: ${color}">
            <p data-color='${color}'>${color}</p>
          </div>
	`;
  }
  document.getElementById("color-scheme").innerHTML = colorsHtml;
}
