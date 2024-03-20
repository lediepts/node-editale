var target: HTMLElement | undefined = undefined;
window.onload = () => {
  document.querySelectorAll<HTMLElement>("body *").forEach((elm) => {
    elm.addEventListener("mouseenter", () => {
      if (!target) elm.style.outline = "1px solid #d20";
    });
    elm.addEventListener("mouseleave", () => {
      if (!target) elm.style.outline = "none";
    });
    elm.ondblclick = () => {
      if (!target) {
        target = elm;
        render();
      }
    };
  });
  function render() {
    if (target) {
      target.style.outline = "1px dashed #00d";
      const firstDiv = document.createElement("div");
      firstDiv.style.position = "relative";
      target.appendChild(firstDiv);
      const actions = document.createElement("div");
      actions.className = "editable-actions";
      firstDiv.appendChild(actions);
      const close = document.createElement("span");
      close.innerHTML = `<ion-icon name="close-outline"></ion-icon>`;
      actions.appendChild(close);
      close.onclick = () => {
        if (target) {
          target.style.outline = "none";
          firstDiv.remove();
          target = undefined;
        }
      };
    }
  }
};
