const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let int = undefined;

export default (textElement, numberOfIterations, timePerIteration) => {
  clearInterval(int);
  let iteration = 0;
  int = setInterval(() => {
    const oldText = textElement.innerText;
    textElement.innerText = oldText
      .split("")
      .map((l, index) => {
        if (index < iteration || l === " ")
          return textElement.dataset.value[index];
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= textElement.dataset.value.length) clearInterval(int);
    iteration += 1 / 20;
  }, 10);
};
