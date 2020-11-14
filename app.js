let posX = 50,
    posY = 50,
    width = 100,
    height = 200;



let scale = 1,
    rotation = 1,
    gestureStartRotation = 1,
    gestureStartScale = 1,
    startX = 50,
    startY = 50;
window.addEventListener("gesturestart", e => {
    e.preventDefault();
    startX = e.pageX - posX;
    startY = e.pageY - posY;
    gestureStartScale = scale;
    gestureStartRotation = rotation;
})
window.addEventListener("gesturechange", e => {
    e.preventDefault();
    posX = e.pageX - startX;
    posY = e.pageY - startY;
    scale = gestureStartScale * e.scale;
    rotation = gestureStartRotation + e.rotation;
    render(posX, posY, scale, rotation)
})

window.addEventListener("gestureend", e => {
    e.preventDefault();
})

let ticking = false;
function render(posX, posY, scale, rotation) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            renderEngine();
            ticking = false
        });
        ticking = true;
    }

    function renderEngine() {
        let dom = document.getElementById("container");
        dom.style.top = `${posY}%`
        dom.style.left = `${posX}%`
        dom.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
    }
}
console.group("Wheel Events")
window.addEventListener("wheel", e => {
    e.preventDefault();
    posX -= e.deltaX * 0.25;
    posY -= e.deltaY * 0.25;
    render(posX, posY, scale, rotation)
})