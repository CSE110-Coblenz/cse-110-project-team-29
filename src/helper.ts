import Konva from "konva";

export function randIntBetween(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1)) + min) //gives a number between min and max inclusive.
}

export function plusOrMinusInt(num: number) {
    return randIntBetween(-num, num); //gives a number between -num and num inclusive
}

export function tripletsEqual(a1: number, a2: number, a3: number, b1: number, b2: number, b3: number): boolean {
    let tripA = [a1, a2, a3].sort((x, y) => x - y);
    let tripB = [b1, b2, b3].sort((x, y) => x - y);
  
    return tripA[0] === tripB[0] && tripA[1] === tripB[1] && tripA[2] === tripB[2];
}


export function createButton(text: string, x: number, y: number, onClick: () => void, layer: Konva.Layer) {
    const rect = new Konva.Rect({
        x, y,
        width: 225,
        height: 60,
        fill: "#222",
        cornerRadius: 12,
        stroke: "#00ff00",
        strokeWidth: 3,
    });

    const label = new Konva.Text({
        x,
        y: y + 20,
        width: 225,
        text,
        align: "center",
        fill: "#00ff00",
        fontSize: 22,
        fontFamily: "Poppins, sans-serif",
    });

    const group = new Konva.Group();
    group.add(rect);
    group.add(label);

    group.on("click", onClick);

    layer.add(group);

    return group;
}

export function createInputWithLabel(
    stage: Konva.Stage,
    labelText: string,
    x: number,
    y: number,
): HTMLInputElement {
    const container = stage.container(); // HTML container for the stage

    // Create label
    const label = document.createElement("span");
    label.innerText = labelText;
    label.style.position = "absolute";
    label.style.fontFamily = "Poppins, Arial";
    label.style.fontSize = "16px";
    label.style.color = "#ffffff";
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    container.appendChild(label);

    // Create input
    const input = document.createElement("input");
    input.type = "number";
    input.style.position = "absolute";
    input.style.width = `40px`;
    input.style.left = `${x + 10 + label.offsetWidth}px`; 
    input.style.top = `${y}px`;
    container.appendChild(input);

    return input;
}

