"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type FlickeringGridProps = {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
};

export function FlickeringGrid({
  squareSize = 2,
  gridGap = 12,
  flickerChance = 0.08,
  color = "#2d63fc",
  maxOpacity = 0.08,
  className = "",
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const rgbaColor = useMemo(() => {
    if (typeof window === "undefined") {
      return "rgba(45, 99, 252,";
    }

    const parserCanvas = document.createElement("canvas");
    parserCanvas.width = 1;
    parserCanvas.height = 1;
    const parserContext = parserCanvas.getContext("2d");

    if (!parserContext) {
      return "rgba(45, 99, 252,";
    }

    parserContext.fillStyle = color;
    parserContext.fillRect(0, 0, 1, 1);
    const [red, green, blue] = Array.from(parserContext.getImageData(0, 0, 1, 1).data);

    return `rgba(${red}, ${green}, ${blue},`;
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);

      for (let index = 0; index < squares.length; index += 1) {
        squares[index] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [gridGap, maxOpacity, squareSize],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let index = 0; index < squares.length; index += 1) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[index] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      context: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      context.clearRect(0, 0, width, height);

      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          const opacity = squares[col * rows + row];
          context.fillStyle = `${rgbaColor}${opacity})`;
          context.fillRect(
            col * (squareSize + gridGap) * dpr,
            row * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [gridGap, rgbaColor, squareSize],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let lastTime = performance.now();
    let gridParams = setupCanvas(canvas, container.clientWidth, container.clientHeight);

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      setCanvasSize({ width: nextWidth, height: nextHeight });
      gridParams = setupCanvas(canvas, nextWidth, nextHeight);
      drawGrid(context, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
    });

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(context, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    setCanvasSize({ width: container.clientWidth, height: container.clientHeight });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    drawGrid(context, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);

    if (isInView) {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [drawGrid, isInView, setupCanvas, updateSquares]);

  return (
    <div ref={containerRef} className={`h-full w-full ${className}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
}
