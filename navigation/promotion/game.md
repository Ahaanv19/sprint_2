---
layout: post 
title: Get Promoted
permalink: /get-promoted/
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Java Backend Game Renderer</title>
  <style>
    body {
      margin: 0;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    canvas {
      background: #111;
      border: 2px solid white;
    }
  </style>
</head>
<body>
  <canvas id="game" width="800" height="600"></canvas>

  <script>
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    import { javaURI } from '{{ site.baseurl }}/assets/js/api/config.js';
    const URL = `${javaURI}/promotion/state`

    async function fetchGameState() {
      try {
        const res = await fetch(URL);
        return await res.json();
      } catch (err) {
        console.error("Error fetching game state:", err);
        return { objects: [] };
      }
    }

    async function gameLoop() {
      const state = await fetchGameState();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let obj of state.objects) {
        const img = new Image();
        img.src = `${javaURI}/` + ${obj.sprite};
        img.onload = () => {
          ctx.drawImage(img, obj.transform.x, obj.transform.y);
        };
      }

      requestAnimationFrame(gameLoop);
    }

    // Send keyboard input to backend
    window.addEventListener("keydown", (e) => {
      fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: e.key })
      }).catch(err => console.error("Input error:", err));
    });

    gameLoop();
  </script>
</body>
</html>