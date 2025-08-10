function setTheme(theme) {
  let bgColor, textColor;

  if (theme === "beige") {
    bgColor = "#f5f5dc";
    textColor = "#8b7355";
  } else if (theme === "pink") {
    bgColor = "#f9d5d3";
    textColor = "#b56576";
  } else if (theme === "sage") {
    bgColor = "#cce0d0";
    textColor = "#6b8f71";
  } else if (theme === "blue") {
    bgColor = "#cfe7f3";
    textColor = "#4a6fa5";
  }

  document.getElementById("widget").style.backgroundColor = bgColor;
  document.getElementById("widget").style.color = textColor;
}
