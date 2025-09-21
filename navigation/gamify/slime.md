---
layout: post
title: Game
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gamify</title>
  <style>
    body {
      margin: 0;
      background: #222;
      overflow: hidden;
    }
    canvas {
      display: block;
      background: #333;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>

  <script type="module">
    import { PlayerController } from './playerController.js';
    import { Camera } from './camera.js';
    import { Selector } from './tileSelect.js';
    import { fetchMousePos } from './mouse.js';

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        canvas.width = 480;
        canvas.height = 360;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();


    const player = new PlayerController(0, 0);
    const camera = new Camera(player.transform.position.x, player.transform.position.y);
    const select = new Selector(0, 0)


    function render() {
        const group = { ctx, frame, camera, canvas };

        player.draw(group);
        select.draw(group, player.transform.position);
    }

    let lastTime = 0;
    var frame = 0;

    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        render();
        const mouse = fetchMousePos();

        frame += 1;
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  </script>
</body>
</html>