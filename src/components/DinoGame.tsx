import React, { useEffect, useRef, useState } from 'react';

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dino_highscore');
    if (stored) setHighScore(parseInt(stored));
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const dino = {
      x: 50,
      y: 150,
      width: 20,
      height: 20,
      dy: 0,
      jumpForce: -10,
      grounded: false,
      gravity: 0.6
    };

    let obstacles: {x: number, y: number, width: number, height: number}[] = [];
    let currentScore = 0;
    let speed = 5;

    const jump = () => {
      if (dino.grounded) {
        dino.dy = dino.jumpForce;
        dino.grounded = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouch);

    const update = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics
      dino.dy += dino.gravity;
      dino.y += dino.dy;
      
      if (dino.y + dino.height > canvas.height - 20) {
        dino.y = canvas.height - 20 - dino.height;
        dino.dy = 0;
        dino.grounded = true;
      }

      // Draw ground
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 2);

      // Draw Dino
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

      // Obstacles
      if (frameCount % Math.max(30, Math.floor(100 - speed * 5)) === 0) {
        obstacles.push({
          x: canvas.width,
          y: canvas.height - 40,
          width: 15,
          height: 20
        });
      }

      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= speed;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Collision
        if (
          dino.x < obs.x + obs.width &&
          dino.x + dino.width > obs.x &&
          dino.y < obs.y + obs.height &&
          dino.y + dino.height > obs.y
        ) {
          setGameOver(true);
          setIsPlaying(false);
          if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem('dino_highscore', currentScore.toString());
          }
          return; // Stop updating
        }
      }

      obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

      currentScore++;
      if (currentScore % 500 === 0) speed += 0.5;
      
      setScore(Math.floor(currentScore / 10));

      frameCount++;
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, gameOver, highScore]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="border-4 border-ink p-4 bg-white relative flex flex-col items-center w-full">
      <div className="w-full flex justify-between font-mono text-sm font-bold mb-4 uppercase tracking-widest text-ink">
        <span>Score: {score}</span>
        <span>HI: {highScore}</span>
      </div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={200} 
        className="w-full max-w-[600px] h-[200px] border-2 border-ink bg-[#fdfbf7] cursor-pointer"
        onClick={!isPlaying ? startGame : undefined}
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
          <h3 className="font-serif font-black text-2xl uppercase tracking-widest mb-4 text-ink">
            {gameOver ? "Game Over" : "Data-Dino"}
          </h3>
          <button 
            onClick={startGame}
            className="ink-press border-2 border-ink px-6 py-2 font-serif font-bold uppercase tracking-widest text-sm"
          >
            {gameOver ? "Restart" : "Play"}
          </button>
          <p className="font-mono text-xs mt-4 opacity-70 text-ink">Press Space or Tap to Jump</p>
        </div>
      )}
    </div>
  );
}
