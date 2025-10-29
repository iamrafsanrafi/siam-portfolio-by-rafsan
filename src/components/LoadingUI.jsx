import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// Configuration Values
const CANVAS_WIDTH = 100; 
const CANVAS_HEIGHT = 100;
const HEXAGON_STROKE_COLOR = '#64ffda';
const S_FILL_COLOR = HEXAGON_STROKE_COLOR;
const BACKGROUND_COLOR = '#020c1b';

// Geometry constants 
const STROKE_WIDTH = 5
const HEXAGON_POINTS = [
    { x: 50, y: 4 },
    { x: 10.5, y: 27 },
    { x: 10.5, y: 73 },
    { x: 50, y: 96 },
    { x: 89.5, y: 73 },
    { x: 89.5, y: 27 },
    { x: 50, y: 4 }
];

const LoadingUI = ({ onAnimationComplete }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const sRef = useRef(null);

    const animProps = useRef({
        drawProgress: 0,
    });

    // Function to draw the hexagon stroke
    const drawHexagon = (ctx, progress) => {
        let totalLength = 0;
        const segmentLengths = [];
        for (let i = 0; i < HEXAGON_POINTS.length - 1; i++) {
            const p1 = HEXAGON_POINTS[i];
            const p2 = HEXAGON_POINTS[i + 1];
            const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            segmentLengths.push(length);
            totalLength += length;
        }

        const targetLength = progress * totalLength;
        let currentLength = 0;

        ctx.strokeStyle = HEXAGON_STROKE_COLOR;
        ctx.lineWidth = STROKE_WIDTH;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();

        let started = false;

        for (let i = 0; i < HEXAGON_POINTS.length - 1; i++) {
            const p1 = HEXAGON_POINTS[i];
            const p2 = HEXAGON_POINTS[i + 1];
            const segmentLength = segmentLengths[i];

            if (!started) {
                ctx.moveTo(p1.x, p1.y);
                started = true;
            }

            if (currentLength + segmentLength <= targetLength) {
                ctx.lineTo(p2.x, p2.y);
                currentLength += segmentLength;
            } else if (currentLength < targetLength) {
                const remainingLength = targetLength - currentLength;
                const ratio = remainingLength / segmentLength;

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;

                const endX = p1.x + dx * ratio;
                const endY = p1.y + dy * ratio;

                ctx.lineTo(endX, endY);
                break;
            }
        }
        ctx.stroke();
    };

    // The main drawing loop
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.save();
        drawHexagon(ctx, animProps.current.drawProgress);
        ctx.restore();

    }, []);

    // GSAP Timeline setup
    useEffect(() => {
        // Set initial state 
        gsap.set(containerRef.current, { opacity: 1 });
        gsap.set(logoRef.current, { scale: 1, opacity: 1 });
        gsap.set(sRef.current, { opacity: 0 });

        // Add the custom 'draw' function to the GSAP ticker
        gsap.ticker.add(draw);

        // Animation timing constants
        const HEXAGON_DRAW_DURATION = 2;
        const S_FADE_DURATION = 0.8;
        const POST_DRAW_HOLD = 0.4;
        const COLLAPSE_DURATION = 0.1;
        const BACKGROUND_HOLD_DELAY = 0.4;
        const BG_FADE_DURATION = 0.1;

        // The loading timeline
        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
                gsap.ticker.remove(draw);
                onAnimationComplete();
            }
        });

        // Draw the Hexagon stroke
        tl.to(animProps.current, {
            duration: HEXAGON_DRAW_DURATION,
            drawProgress: 1,
        }, 0);

        // Fade the 'S' letter in
        tl.to(sRef.current, {
            duration: S_FADE_DURATION,
            opacity: 1,
            ease: 'power1.inOut'
        }, HEXAGON_DRAW_DURATION);

        // Collapse and fade out the logo only
        const collapseStartTime = HEXAGON_DRAW_DURATION + S_FADE_DURATION + POST_DRAW_HOLD;

        tl.to(logoRef.current, {
            duration: COLLAPSE_DURATION,
            opacity: 0,
            scale: 0.1,
            ease: 'power1.in'
        }, collapseStartTime);

        // Fade out the background 400ms after the logo collapse ends
        const backgroundFadeStartTime = collapseStartTime + COLLAPSE_DURATION + BACKGROUND_HOLD_DELAY;

        tl.to(containerRef.current, {
            duration: BG_FADE_DURATION,
            opacity: 0,
            ease: 'none'
        }, backgroundFadeStartTime);

        // Cleanup function
        return () => {
            if (gsap && gsap.ticker) {
                gsap.ticker.remove(draw);
            }
        };

    }, [draw, onAnimationComplete]);


    return (
        <div
            ref={containerRef}
            className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500"
            style={{ backgroundColor: BACKGROUND_COLOR }}
        >
            <div
                ref={logoRef}
                style={{
                    position: 'relative',
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="block absolute top-0 left-0"
                />

                <div
                    ref={sRef}
                    className={`absolute top-1/2 left-1/2 -translate-1/2 font-['Montserrat'] text-[60px] font-semibold pointer-events-none opacity-0`}
                    style={{
                        color: S_FILL_COLOR
                    }}
                >
                    S
                </div>
            </div>
        </div>
    );
};


export default LoadingUI;