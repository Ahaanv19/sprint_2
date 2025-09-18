---
layout: post 
title: Gayify
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

  <script>
    import { PlayerController } from './playerController.js';
    import { Camera } from './camera.js';

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();


    const player = new PlayerController(0, 0);
    const camera = new Camera(0, 0);



    let lastTime = 0;
    var frame = 0;

    function gameLoop(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        

        frame += 1;
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  </script>
</body>
</html>