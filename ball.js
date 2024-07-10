function makeBall(xcoord, ycoord, color, velx = 0, vely = 0, fixed = 0) {
  const ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = "ball";
  ball.style.height = ball.style.width = size + 'px';
  ball.style.top = ycoord + 'px';
  ball.style.left = xcoord + 'px';
  document.body.appendChild(ball);
  if (!fixed) {
      // only free balls will be updated
      balls.push(ball);
      x.push(xcoord);
      y.push(ycoord);
      velocity_x.push(velx);
      velocity_y.push(vely);
  }
}
