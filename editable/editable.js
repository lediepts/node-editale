var target = undefined;
window.onload = function () {
    document.querySelectorAll("body *").forEach(function (elm) {
        elm.addEventListener("mouseenter", function () {
            if (!target)
                elm.style.outline = "1px solid #d20";
        });
        elm.addEventListener("mouseleave", function () {
            if (!target)
                elm.style.outline = "none";
        });
        elm.ondblclick = function () {
            if (!target) {
                target = elm;
                render();
            }
        };
    });
    function render() {
        if (target) {
            target.style.outline = "1px dashed #00d";
            var firstDiv_1 = document.createElement("div");
            firstDiv_1.style.position = "relative";
            target.appendChild(firstDiv_1);
            var actions = document.createElement("div");
            actions.className = "editable-actions";
            firstDiv_1.appendChild(actions);
            var close_1 = document.createElement("span");
            close_1.innerHTML = "<ion-icon name=\"close-outline\"></ion-icon>";
            actions.appendChild(close_1);
            close_1.onclick = function () {
                if (target) {
                    target.style.outline = "none";
                    firstDiv_1.remove();
                    target = undefined;
                }
            };
        }
    }
};
