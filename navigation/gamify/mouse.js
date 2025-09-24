
let mouse = { x: 0, y: 0 };

const box = {
  x: window.innerWidth / 2 - 100,
  y: window.innerHeight / 2 - 75,
  width: 200,
  height: 150
};

export function fetchMousePos() {
    return mouse;
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX - box.x;
    mouse.y = event.clientY - box.y;
    console.log("Mouse position:", mouse.x, mouse.y);
});