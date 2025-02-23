// Define window globally if it doesn't exist (Node environment)
if (typeof window === 'undefined') {
    global.window = {};
}

// Mock requestAnimationFrame to simulate ~60fps
let requestId = 0;
let timeoutIds = new Set();

window.requestAnimationFrame = jest.fn(callback => {
    requestId++;
    const timeoutId = setTimeout(() => {
        callback(performance.now());
    }, 1000 / 60); // Simulate 60fps
    timeoutIds.add(timeoutId);
    return requestId;
});

window.cancelAnimationFrame = jest.fn(id => {
    timeoutIds.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
    timeoutIds.clear();
});

// Define performance globally if it doesn't exist
if (typeof performance === 'undefined') {
    global.performance = {};
}

// Mock performance.now globally
let now = 0;
performance.now = jest.fn(() => {
    now += 1000 / 60; // Increment by ~16.67ms each frame
    return now;
});

// Clean up after each test
afterEach(() => {
    jest.clearAllMocks();
    window.requestAnimationFrame.mockClear();
    window.cancelAnimationFrame.mockClear();
    performance.now.mockClear();
    timeoutIds.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
    timeoutIds.clear();
    requestId = 0;
    now = 0;
}); 