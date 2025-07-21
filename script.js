

let texts = ["banana", "apple", "pear", "grape", "orange", "lemon"];
let selected = new Array(texts.length).fill(true);

window.onload = e => {
    let hoverHolder = document.querySelector("#hover-holder");

    texts.forEach((text, index) => {
        let button = document.createElement("button");
        let span = document.createElement("span");
        let shadowEl = document.createElement("div");

        span.innerText = text;

        button.classList.add(`button-${index + 1}`, "button-on");
        shadowEl.classList.add(`shadow`);

        button.onclick = e => {
            selected[index] = !selected[index];
            button.classList.toggle("button-on", selected[index]);
        }

        let fn = e => {
            let { x, y, width: w, height: h } = shadowEl.getBoundingClientRect();

            x += w / 2;
            y += h / 2;

            // TODO: screen vs client
            let ex = e.clientX;
            let ey = e.clientY;

            let dx = x - ex;
            let dy = y - ey;

            let range = 200;
            let d = Math.min(Math.sqrt(dx * dx + dy * dy), range);

            d -= Math.min(h / 2);
            if (d < 0) d = 0;

            let change = 1 - d / range;

            shadowEl.style.opacity = change;
            button.style.transform = `scale(${1 + change * 0.2})`;
        }

        window.addEventListener("mousemove", fn);

        button.appendChild(shadowEl);
        button.appendChild(span);
        hoverHolder.appendChild(button);
    });

    let styles = document.createElement("style");
    styles.innerText = "";

    let styleColors = ["#d155aa", "#5750ad", "#62d7b6", "#4c7fd1", "#e02f88", "#cbc078", "#87b7ca"];
    styleColors.forEach((color, index) => {
        // making styles in javascript to avoid repetitive classes
        styles.innerText += `
        .button-${index + 1} {
            color: ${color};
            border-color: ${color};
        }

        .button-${index + 1}:hover {
            // opacity: 0.8;
        }

        .button-${index + 1} .shadow {
            box-shadow: 0px 10px 40px 4px ${color};
        }

        .button-${index + 1}.button-on {
            color: white;
            background-color: ${color};
        }
    `;
    });
    document.head.appendChild(styles);


}