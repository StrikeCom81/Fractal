window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Lines
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // Effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2;
    const maxLevel = 8;
    const branches = 3;

    // Initial properties
    let sides = 4;
    let spread = 0.6;
    let scale = 0.8;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    let lineWidth = Math.floor(Math.random() * 20 + 10);

    // UI Elements
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');
    const slider_sides = document.getElementById('sides');
    const label_sides = document.querySelector('[for="sides"]');

    // Initialize sliders and labels
    slider_spread.value = spread;
    label_spread.innerText = `Spread: ${spread.toFixed(2)}`;
    slider_sides.value = sides;
    label_sides.innerText = `Sides: ${sides}`;

    // Helper function to update sliders and labels
    function updateSliders() {
        slider_spread.value = spread.toFixed(2);
        label_spread.innerText = `Spread: ${spread.toFixed(2)}`;
        slider_sides.value = sides;
        label_sides.innerText = `Sides: ${sides}`;
    }

    // Spread slider listener
    slider_spread.addEventListener('input', function (e) {
        spread = parseFloat(e.target.value);
        label_spread.innerText = `Spread: ${spread.toFixed(2)}`;
        drawFractal();
    });

    // Sides slider listener
    slider_sides.addEventListener('input', function (e) {
        sides = parseInt(e.target.value, 10);
        label_sides.innerText = `Sides: ${sides}`;
        drawFractal();
    });

    // Drawing the fractal branches
    function drawBranch(level) {
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size - 50, 0);
        ctx.stroke();

        for (let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            /*ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();*/

            ctx.restore();
        }
    }

    // Fractal drawing
    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        }
        ctx.restore();
        randomizeButton.style.backgroundColor = color; // Highlight button with color
    }
    drawFractal();

    // Randomize fractal
    function randomizeFractal() {
        sides = Math.floor(Math.random() * 7 + 2);
        spread = Math.random() * 0.4 + 0.2;
        scale = Math.random() * 0.5 + 0.5;
        color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        lineWidth = Math.floor(Math.random() * 20 + 10);
        updateSliders(); // Sync sliders with random values

    }

    // Reset fractal
    function resetFractal() {
        sides = 4;
        spread = 0.6;
        scale = 0.7;
        color = `hsl(50, 100%, 50%)`; // Default gold color
        lineWidth = 15;
        updateSliders(); // Sync sliders with default values
    }

    // Button event listeners
    randomizeButton.addEventListener('click', function () {
        randomizeFractal();
        drawFractal();
    });

    resetButton.addEventListener('click', function () {
        resetFractal();
        drawFractal();
    });

    // Resize canvas on window resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2;
        drawFractal();
    });
});
