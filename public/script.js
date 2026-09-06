// Audio context for background music
let audioContext = null;
let oscillator = null;
let gainNode = null;
let isPlaying = false;

// Verification state
let verificationInProgress = false;

// API Configuration
const API_KEY = 'default_key_here'; // Change this in production
const ADMIN_KEY = 'admin123'; // Change this in production

document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio
    initAudio();
    
    // Setup event listeners
    document.getElementById('verifyBtn').addEventListener('click', startVerification);
    document.getElementById('playPauseBtn').addEventListener('click', toggleMusic);
    document.getElementById('retryBtn').addEventListener('click', resetVerification);
});

function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.gain.value = 0.3;
        gainNode.connect(audioContext.destination);
    } catch (error) {
        console.log('Audio not supported');
    }
}

function playBackgroundMusic() {
    if (!audioContext || isPlaying) return;
    
    try {
        // Create a simple melody using oscillators
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77, 1046.50];
        let currentNote = 0;
        
        function playNote() {
            if (!isPlaying) return;
            
            oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = notes[currentNote % notes.length];
            
            const noteGain = audioContext.createGain();
            noteGain.gain.value = 0.2;
            
            oscillator.connect(noteGain);
            noteGain.connect(gainNode);
            
            oscillator.start();
            
            setTimeout(() => {
                oscillator.stop();
                currentNote++;
                if (isPlaying) {
                    setTimeout(playNote, 200);
                }
            }, 300);
        }
        
        isPlaying = true;
        playNote();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
        document.getElementById('musicIcon').style.animation = 'pulse 1s infinite';
    } catch (error) {
        console.log('Error playing music:', error);
    }
}

function stopBackgroundMusic() {
    isPlaying = false;
    if (oscillator) {
        try {
            oscillator.stop();
        } catch (e) {}
    }
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
    document.getElementById('musicIcon').style.animation = 'none';
}

function toggleMusic() {
    if (isPlaying) {
        stopBackgroundMusic();
    } else {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        playBackgroundMusic();
    }
}

async function startVerification() {
    if (verificationInProgress) return;
    
    verificationInProgress = true;
    document.getElementById('verifyBtn').disabled = true;
    document.getElementById('verifyBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    
    // Show progress
    document.getElementById('verificationStatus').style.display = 'none';
    document.getElementById('verificationProgress').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';
    
    // Simulate verification progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = Math.round(progress) + '%';
        
        // Update messages
        const messages = [
            'Checking device...',
            'Verifying IP address...',
            'Checking VPN/proxy...',
            'Analyzing security...',
            'Finalizing verification...'
        ];
        const index = Math.floor(progress / 20);
        if (index < messages.length) {
            document.getElementById('progressMessage').textContent = messages[index];
        }
    }, 200);
    
    try {
        // Get client IP and perform verification
        const response = await fetch('/api/check?apikey=' + API_KEY + '&bot_token=test&verify=user123');
        const data = await response.json();
        
        // Wait for progress to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show result
        showResult(data);
    } catch (error) {
        console.error('Verification error:', error);
        showResult({ status: 'error', message: 'Verification failed' });
    } finally {
        clearInterval(progressInterval);
        verificationInProgress = false;
        document.getElementById('verifyBtn').disabled = false;
        document.getElementById('verifyBtn').innerHTML = '<i class="fas fa-check-circle"></i> Start Verification';
        document.getElementById('verificationProgress').style.display = 'none';
    }
}

function showResult(data) {
    document.getElementById('resultContainer').style.display = 'block';
    
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const retryBtn = document.getElementById('retryBtn');
    
    // Determine status
    let status = 'success';
    let title = 'Verification Successful';
    let message = 'Your device has been verified successfully';
    let icon = 'fa-check-circle';
    
    if (data.data) {
        const verification = data.data;
        if (verification.isSecure) {
            status = 'success';
            title = 'Verification Successful ✅';
            message = 'Your device is secure and verified';
        } else if (verification.isVPN) {
            status = 'failed';
            title = 'VPN Detected! ❌';
            message = 'Please disable VPN/Proxy and try again';
        } else if (verification.isAirplaneMode) {
            status = 'unable';
            title = 'Unable to Verify ⚠️';
            message = 'Please check your internet connection';
        } else {
            status = 'failed';
            title = 'Verification Failed ❌';
            message = 'Device verification failed. Please try again';
        }
        
        // Update details
        document.getElementById('ipAddress').textContent = verification.ip || 'N/A';
        document.getElementById('country').textContent = verification.country || 'N/A';
        document.getElementById('isp').textContent = verification.isp || 'N/A';
        document.getElementById('securityStatus').textContent = status.toUpperCase();
        document.getElementById('securityStatus').style.color = 
            status === 'success' ? '#34d399' : 
            status === 'failed' ? '#fb7185' : '#fbbf24';
    } else {
        status = 'unable';
        title = 'Verification Error ⚠️';
        message = 'Could not verify device. Please try again';
        retryBtn.style.display = 'inline-flex';
    }
    
    resultIcon.className = 'result-icon ' + status;
    resultIcon.innerHTML = '<i class="fas ' + icon + '"></i>';
    resultTitle.textContent = title;
    resultMessage.textContent = message;
    
    // Show retry button for non-success
    retryBtn.style.display = status === 'success' ? 'none' : 'inline-flex';
}

function resetVerification() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('verificationStatus').style.display = 'block';
    document.getElementById('verificationProgress').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
}

// Add pulse animation for music
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
`;
document.head.appendChild(style);
