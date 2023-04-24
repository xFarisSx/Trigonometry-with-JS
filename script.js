/** @type {HTMLCanvasElement} */

const myCanvas = document.getElementById("myCanvas");

let height = (myCanvas.height = window.innerHeight);
let width = (myCanvas.width = window.innerWidth);
const ctx = myCanvas.getContext("2d");

const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };
const offset = {
  x: myCanvas.width / 2,
  y: myCanvas.height / 2,
};

ctx.translate(offset.x, offset.y);
update();
document.addEventListener("mousemove", (e) => {
  B.x = e.x - offset.x;
  B.y = e.y - offset.y;

  C.x = B.x;

  update();
});

function update() {
  const c = distance(A, B);
  const a = distance(B, C);
  const b = distance(A, C);

  const sin = a / c;
  const cos = b / c;
  const tan = sin/cos
  const cot = cos/sin
  const theta = Math.asin(sin);

  ctx.clearRect(-offset.x, -offset.y, 2 * offset.x, 2 * offset.y);

  drawCoordinateSystem(ctx, offset);
  drawCircle(c);

  drawText("sin = a/c = " + sin.toFixed(3), {
    x: -offset.x / 2,
    y: offset.y * 0.7,
  }, "red");
  drawText("cos = b/c = " + cos.toFixed(3), {
    x: -offset.x / 2,
    y: offset.y * 0.75,
  }, "blue");
  drawText("tan = a/b = " + tan.toFixed(3), {
    x: -offset.x / 2,
    y: offset.y * 0.8,
  }, "magenta");
  drawText("cot = b/a = " + cot.toFixed(3), {
    x: -offset.x / 2,
    y: offset.y * 0.85,
  }, "magenta");
  drawText(
    "ϴ = " + Math.round(toDeg(theta)).toString().padStart(2, " ") + "°",
    { x: offset.x / 2, y: offset.y * 0.7 }
  );

  drawLine(A, B);
  drawText("c", average(A, B), "black");
  drawLine(A, C, "blue");
  drawText("b", average(A, C), "blue");
  drawLine(B, C, "red");
  drawText("a", average(B, C), "red");

  drawText("ϴ", A);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  const start = B.x > A.x ? 0 : Math.PI;
  const clockwise = (B.x > 0 && B.y > 0) || (B.x < 0 && B.y < 0) ? true : false;
  let end ;
  if (start === 0) {
    end = !clockwise ? 2* Math.PI - theta : theta;
} else {
   end = !clockwise ? Math.PI- theta : Math.PI + theta;
    
  }

  ctx.arc(0, 0, 20 > b ? b-1 : 20, start, end, !clockwise);
  ctx.stroke();
}

function average(p1, p2) {
  return { x: (p2.x + p1.x) / 2, y: (p2.y + p1.y) / 2 };
}
function distance(p1, p2) {
  let distanceX = p2.x - p1.x;
  let distanceY = p2.y - p1.y;
  let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
  return distance;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function drawText(text, loc, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 13px Courier";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 7;
  ctx.strokeText(text, loc.x, loc.y);
  ctx.fillText(text, loc.x, loc.y);
}

function drawPoint(loc, size = 20, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}
function drawLine(p1, p2, color = "black") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
function drawCircle(r, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
    // for (let y = -r; y <= r; y++) {
    //   for (let x = -r; x <= r; x++) {
    //     let d = Math.hypot(x, y);
    //     if (Math.round(d) === Math.round(r)) {
    //       drawPoint({ x, y }, 1)
    //     }
    //   }
    // }
}

function drawCoordinateSystem(ctx, offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, offset.y);
  ctx.setLineDash([4, 2]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.setLineDash([]);
}
