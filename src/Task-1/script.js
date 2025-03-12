document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('time');
    const amPmDisplay = document.getElementById('am-pm');
    const dateDisplay = document.getElementById('date');
    const secondsRing = document.getElementById('seconds-ring');
    const minutesRing = document.getElementById('minutes-ring');
    const hoursRing = document.getElementById('hours-ring');
    const dotsContainer = document.getElementById('dots');
    
    // Add hour markers
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const angle = (i * 30) * (Math.PI / 180);
        const radius = 145;
        const x = 150 + radius * Math.cos(angle);
        const y = 150 + radius * Math.sin(angle);
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        if (i % 3 === 0) {
            dot.style.width = '12px';
            dot.style.height = '12px';
        }
        dotsContainer.appendChild(dot);
    }
    
    function updateClock() {
        const now = new Date();
        
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        // Format time (12-hour clock)
        const displayHours = hours % 12 || 12;
        const formattedHours = displayHours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        // Update time display
        timeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        amPmDisplay.textContent = hours >= 12 ? 'PM' : 'AM';
        
        // Update date
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        
        // Calculate smooth rotation including milliseconds
        const secondsDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
        const minutesDegrees = ((minutes + seconds / 60) / 60) * 360;
        const hoursDegrees = ((hours % 12 + minutes / 60) / 12) * 360;
        
        secondsRing.style.transform = `rotate(${secondsDegrees}deg)`;
        minutesRing.style.transform = `rotate(${minutesDegrees}deg)`;
        hoursRing.style.transform = `rotate(${hoursDegrees}deg)`;
        
        // Call update on next frame for smooth animation
        requestAnimationFrame(updateClock);
    }
    
    // Start the clock
    updateClock();
});