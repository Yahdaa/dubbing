// Navigation
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    document.getElementById(screenName).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Post interactions
function toggleLike(postElement) {
    const likeAction = postElement.querySelector('.action');
    const currentLikes = parseInt(likeAction.textContent.match(/\d+/)[0]);
    
    if (likeAction.textContent.includes('❤️')) {
        likeAction.textContent = `💙 ${currentLikes + 1}`;
    } else {
        likeAction.textContent = `❤️ ${currentLikes - 1}`;
    }
}

// Character counter
function updateCounter() {
    const textarea = document.getElementById('composeText');
    const counter = document.getElementById('counter');
    const length = textarea.value.length;
    
    counter.textContent = `${length}/280`;
    
    if (length > 224) {
        counter.style.color = '#ff9500';
    }
    if (length > 260) {
        counter.style.color = '#ff3b30';
    }
    if (length <= 224) {
        counter.style.color = '#666';
    }
}

// Create new post
function createPost() {
    const textarea = document.getElementById('composeText');
    const text = textarea.value.trim();
    
    if (text) {
        // Create new post element
        const newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.onclick = function() { toggleLike(this); };
        
        newPost.innerHTML = `
            <div class="post-header">
                <div class="avatar">👤</div>
                <div class="user-info">
                    <span class="name">Tu nombre</span>
                    <span class="username">@tu_usuario • ahora</span>
                </div>
            </div>
            <div class="post-content">${text}</div>
            <div class="post-actions">
                <span class="action">❤️ 0</span>
                <span class="action">💬 0</span>
                <span class="action">🔄 0</span>
            </div>
        `;
        
        // Add to home feed
        const homeScreen = document.getElementById('home');
        homeScreen.insertBefore(newPost, homeScreen.firstChild);
        
        // Clear textarea and show success
        textarea.value = '';
        updateCounter();
        alert('¡Thread publicado!');
        
        // Go back to home
        showScreen('home');
        document.querySelector('.nav-btn').classList.add('active');
    }
}

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    // Add tab switching functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from siblings
            this.parentNode.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            // Add active to clicked tab
            this.classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Simple search simulation
            console.log('Searching for:', this.value);
        });
    }
});

// Simulate real-time updates
setInterval(() => {
    const posts = document.querySelectorAll('.post');
    if (posts.length > 0) {
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const likeAction = randomPost.querySelector('.action');
        if (likeAction && Math.random() > 0.95) {
            const currentLikes = parseInt(likeAction.textContent.match(/\d+/)[0]);
            likeAction.textContent = `❤️ ${currentLikes + 1}`;
        }
    }
}, 5000);