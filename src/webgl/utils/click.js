let drag = false;
let time = 0

document.body.addEventListener('pointerdown', () => {
  time = new Date().getTime();
  drag = false;
}, true);

document.body.addEventListener('pointerup', () => {
  if (new Date().getTime() - time > 150) {
    drag = true;
  }
}, true);

export default function click(fn) {
  return function(e) {
    if (drag) {
      return;
    }
    fn(e);
  };
}
