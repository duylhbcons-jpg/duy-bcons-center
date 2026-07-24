"use client";
import React, { useEffect, useRef } from "react";

type ParticlesProps = {
    id?: string;
    className?: string;
    background?: string;
    particleSize?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
    const {
        id,
        className = "",
        minSize = 0.4,
        maxSize = 1.2,
        speed = 0.3,
        particleColor = "#FFFFFF",
        particleDensity = 50,
    } = props;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; alpha: number; speedX: number; speedY: number }[] = [];

        const init = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

            const count = Math.floor((canvas.width * canvas.height) / (1000000 / particleDensity));
            particles = Array.from({ length: Math.max(count, 30) }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: minSize + Math.random() * (maxSize - minSize),
                alpha: Math.random(),
                speedX: (Math.random() - 0.5) * speed * 0.5,
                speedY: (Math.random() - 0.5) * speed * 0.5,
            }));
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.fillStyle = particleColor;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(render);
        };

        init();
        render();

        const handleResize = () => {
            init();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [minSize, maxSize, speed, particleColor, particleDensity]);

    return (
        <div id={id} className={`w-full h-full ${className}`}>
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};
