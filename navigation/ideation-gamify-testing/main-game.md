---
layout: post
title: Gamify
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gamify</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #111;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    #game-container {
      position: relative;
      width: 900px;
      height: 400px;
    }
    iframe {
      width: 95%;
      height: 100%;
      border: none;
      display: block;
    }
    #ui-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <iframe src="./idk-game-title.html" allow="fullscreen; pointer-lock"></iframe>
    <canvas id="ui-canvas"></canvas>
  </div>

  <script>
    const uiCanvas = document.getElementById("ui-canvas");
    const uiCtx = uiCanvas.getContext("2d");

    // Match canvas size to container
    function resizeCanvas() {
      uiCanvas.width = uiCanvas.offsetWidth;
      uiCanvas.height = uiCanvas.offsetHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function drawUI() {
      uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
      uiCtx.fillStyle = "rgba(0,0,0,0.5)";
      uiCtx.fillRect(20, 20, 150, 50);
      uiCtx.fillStyle = "white";
      uiCtx.font = "20px monospace";
      uiCtx.fillText("Inventory", 40, 50);
    }

    function loop() {
      // drawUI();
      requestAnimationFrame(loop);
    }

    loop();
  </script>
</body>
</html>