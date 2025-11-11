// Modern Threads App - Real-time Social Network
class ThreadsApp {
    constructor() {
        this.currentUser = {
            id: 1,
            name: 'Tu nombre',
            username: 'tu_usuario',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face'
        };
        this.posts = [];
        this.notifications = [];
        this.onlineUsers = 1247;
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.startRealTimeUpdates();
        this.loadInitialData();
        
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').style.display = 'flex';
    }

    hideLoadingScreen() {
        document.getElementById('loadingScreen').style.display = 'none';
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const screen = e.currentTarget.dataset.screen;
                if (screen) this.showScreen(screen);
            });
        });

        // Real-time typing simulation
        this.simulateTyping();
        
        // Auto-refresh content
        setInterval(() => this.refreshContent(), 30000);
        
        // Update timestamps
        setInterval(() => this.updateTimestamps(), 60000);
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-screen="${screenName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Load screen-specific content
        this.loadScreenContent(screenName);
    }

    loadScreenContent(screenName) {
        switch(screenName) {
            case 'search':
                this.loadSearchContent();
                break;
            case 'post':
                this.loadPostContent();
                break;
            case 'activity':
                this.loadActivityContent();
                break;
            case 'profile':
                this.loadProfileContent();
                break;
        }
    }

    loadSearchContent() {
        const searchScreen = document.getElementById('search');
        if (!searchScreen.innerHTML.trim()) {
            searchScreen.innerHTML = `
                <div class="search-header">
                    <div class="search-container">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Buscar usuarios, hashtags, temas..." class="search-input" oninput="app.performSearch(this.value)">
                        <button class="search-filter-btn" onclick="app.showSearchFilters()">
                            <i class="fas fa-sliders-h"></i>
                        </button>
                    </div>
                </div>
                
                <div class="trending-section">
                    <h3>Tendencias para ti</h3>
                    <div class="trending-topics">
                        <div class="trending-item" onclick="app.searchTopic('IA')">
                            <div class="trending-info">
                                <span class="trending-category">Tecnología</span>
                                <span class="trending-topic">#IA</span>
                                <span class="trending-posts">45.2K threads</span>
                            </div>
                            <div class="trending-chart">📈</div>
                        </div>
                        <div class="trending-item" onclick="app.searchTopic('JavaScript')">
                            <div class="trending-info">
                                <span class="trending-category">Programación</span>
                                <span class="trending-topic">#JavaScript</span>
                                <span class="trending-posts">32.1K threads</span>
                            </div>
                            <div class="trending-chart">📈</div>
                        </div>
                        <div class="trending-item" onclick="app.searchTopic('Startup')">
                            <div class="trending-info">
                                <span class="trending-category">Negocios</span>
                                <span class="trending-topic">#Startup</span>
                                <span class="trending-posts">28.7K threads</span>
                            </div>
                            <div class="trending-chart">📈</div>
                        </div>
                    </div>
                </div>

                <div class="suggested-users">
                    <h3>Usuarios sugeridos</h3>
                    <div class="user-suggestions">
                        <div class="user-suggestion">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" alt="María Silva">
                            <div class="user-suggestion-info">
                                <div class="user-suggestion-name">María Silva <i class="fas fa-check-circle verified"></i></div>
                                <div class="user-suggestion-meta">@maria_design • 15.2K seguidores</div>
                                <div class="user-suggestion-bio">Diseñadora UX/UI apasionada por crear experiencias increíbles</div>
                            </div>
                            <button class="follow-btn" onclick="app.followUser('maria')">Seguir</button>
                        </div>
                    </div>
                </div>

                <div class="search-results" id="searchResults" style="display: none;"></div>
            `;
        }
    }

    loadPostContent() {
        const postScreen = document.getElementById('post');
        if (!postScreen.innerHTML.trim()) {
            postScreen.innerHTML = `
                <div class="compose-header">
                    <button class="compose-cancel" onclick="app.showScreen('home')">
                        <i class="fas fa-times"></i>
                    </button>
                    <h2>Nuevo thread</h2>
                    <button class="compose-publish" onclick="app.publishPost()" disabled>
                        Publicar
                    </button>
                </div>

                <div class="compose-content">
                    <div class="compose-user">
                        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" class="compose-avatar">
                        <div class="compose-user-info">
                            <div class="compose-name">${this.currentUser.name}</div>
                            <div class="compose-username">@${this.currentUser.username}</div>
                        </div>
                    </div>

                    <div class="compose-input-container">
                        <textarea 
                            class="compose-textarea" 
                            placeholder="¿Qué está pasando?"
                            oninput="app.updateComposeCounter(this)"
                            maxlength="280"
                        ></textarea>
                        
                        <div class="compose-media" id="composeMedia"></div>
                        
                        <div class="compose-footer">
                            <div class="compose-actions">
                                <button class="compose-action" onclick="app.addMedia('image')" title="Agregar imagen">
                                    <i class="fas fa-image"></i>
                                </button>
                                <button class="compose-action" onclick="app.addMedia('video')" title="Agregar video">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button class="compose-action" onclick="app.addLocation()" title="Agregar ubicación">
                                    <i class="fas fa-map-marker-alt"></i>
                                </button>
                                <button class="compose-action" onclick="app.addPoll()" title="Crear encuesta">
                                    <i class="fas fa-poll"></i>
                                </button>
                                <button class="compose-action" onclick="app.schedulePost()" title="Programar">
                                    <i class="fas fa-clock"></i>
                                </button>
                            </div>
                            
                            <div class="compose-counter">
                                <div class="counter-circle">
                                    <svg width="20" height="20">
                                        <circle cx="10" cy="10" r="8" fill="none" stroke="#e1e8ed" stroke-width="2"/>
                                        <circle cx="10" cy="10" r="8" fill="none" stroke="#1da1f2" stroke-width="2" 
                                                stroke-dasharray="50.27" stroke-dashoffset="50.27" id="counterProgress"/>
                                    </svg>
                                </div>
                                <span class="counter-text" id="counterText">280</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadActivityContent() {
        const activityScreen = document.getElementById('activity');
        if (!activityScreen.innerHTML.trim()) {
            activityScreen.innerHTML = `
                <div class="activity-header">
                    <h2>Actividad</h2>
                    <button class="activity-settings" onclick="app.showActivitySettings()">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>

                <div class="activity-tabs">
                    <button class="activity-tab active" onclick="app.showActivityTab('all')">Todo</button>
                    <button class="activity-tab" onclick="app.showActivityTab('mentions')">Menciones</button>
                    <button class="activity-tab" onclick="app.showActivityTab('likes')">Me gusta</button>
                    <button class="activity-tab" onclick="app.showActivityTab('follows')">Seguidores</button>
                </div>

                <div class="activity-content" id="activityContent">
                    ${this.generateActivityItems()}
                </div>
            `;
        }
    }

    loadProfileContent() {
        const profileScreen = document.getElementById('profile');
        if (!profileScreen.innerHTML.trim()) {
            profileScreen.innerHTML = `
                <div class="profile-header">
                    <div class="profile-cover">
                        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop" alt="Cover">
                        <button class="edit-cover-btn">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    
                    <div class="profile-info">
                        <div class="profile-avatar-container">
                            <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" class="profile-avatar-large">
                            <button class="edit-avatar-btn">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        
                        <div class="profile-details">
                            <h1 class="profile-name">${this.currentUser.name} <i class="fas fa-check-circle verified"></i></h1>
                            <p class="profile-username">@${this.currentUser.username}</p>
                            <p class="profile-bio">Desarrollador Full Stack apasionado por la tecnología y la innovación. Creando el futuro una línea de código a la vez. 🚀</p>
                            
                            <div class="profile-metadata">
                                <div class="profile-meta-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>Madrid, España</span>
                                </div>
                                <div class="profile-meta-item">
                                    <i class="fas fa-link"></i>
                                    <a href="#">portfolio.dev</a>
                                </div>
                                <div class="profile-meta-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>Se unió en enero 2024</span>
                                </div>
                            </div>
                            
                            <div class="profile-stats">
                                <div class="profile-stat">
                                    <span class="stat-number">1,247</span>
                                    <span class="stat-label">Siguiendo</span>
                                </div>
                                <div class="profile-stat">
                                    <span class="stat-number">15.2K</span>
                                    <span class="stat-label">Seguidores</span>
                                </div>
                                <div class="profile-stat">
                                    <span class="stat-number">892</span>
                                    <span class="stat-label">Threads</span>
                                </div>
                            </div>
                            
                            <button class="edit-profile-btn" onclick="app.editProfile()">
                                <i class="fas fa-edit"></i>
                                Editar perfil
                            </button>
                        </div>
                    </div>
                </div>

                <div class="profile-tabs">
                    <button class="profile-tab active" onclick="app.showProfileTab('threads')">Threads</button>
                    <button class="profile-tab" onclick="app.showProfileTab('replies')">Respuestas</button>
                    <button class="profile-tab" onclick="app.showProfileTab('media')">Multimedia</button>
                    <button class="profile-tab" onclick="app.showProfileTab('likes')">Me gusta</button>
                </div>

                <div class="profile-content" id="profileContent">
                    ${this.generateUserPosts()}
                </div>
            `;
        }
    }

    generateActivityItems() {
        const activities = [
            {
                type: 'like',
                user: 'María Silva',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                action: 'le gustó tu thread',
                content: 'Trabajando en un nuevo proyecto increíble...',
                time: '2 min'
            },
            {
                type: 'follow',
                user: 'Carlos López',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                action: 'comenzó a seguirte',
                time: '5 min'
            },
            {
                type: 'comment',
                user: 'Ana García',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                action: 'comentó tu thread',
                content: '¡Increíble trabajo! ¿Cuándo podremos ver una demo?',
                time: '15 min'
            }
        ];

        return activities.map(activity => `
            <div class="activity-item">
                <div class="activity-avatar">
                    <img src="${activity.avatar}" alt="${activity.user}">
                    <div class="activity-type-icon ${activity.type}">
                        <i class="fas fa-${activity.type === 'like' ? 'heart' : activity.type === 'follow' ? 'user-plus' : 'comment'}"></i>
                    </div>
                </div>
                <div class="activity-content">
                    <p class="activity-text">
                        <strong>${activity.user}</strong> ${activity.action}
                    </p>
                    ${activity.content ? `<p class="activity-preview">"${activity.content}"</p>` : ''}
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    generateUserPosts() {
        return `
            <div class="post" data-post-id="user-1">
                <div class="post-header">
                    <div class="post-avatar">
                        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}">
                    </div>
                    <div class="post-user-info">
                        <div class="post-name">${this.currentUser.name} <i class="fas fa-check-circle verified"></i></div>
                        <div class="post-meta">
                            <span class="username">@${this.currentUser.username}</span>
                            <span class="separator">•</span>
                            <span class="timestamp">1d</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <p>¡Emocionado de estar en Threads! Esta plataforma tiene un potencial increíble para conectar con desarrolladores de todo el mundo. 🌍</p>
                </div>
                <div class="post-actions">
                    <button class="action-btn like-btn" onclick="app.toggleLike(this, 'user-1')">
                        <i class="far fa-heart"></i>
                        <span>42</span>
                    </button>
                    <button class="action-btn comment-btn" onclick="app.toggleComments('user-1')">
                        <i class="far fa-comment"></i>
                        <span>8</span>
                    </button>
                    <button class="action-btn repost-btn" onclick="app.repost('user-1')">
                        <i class="fas fa-retweet"></i>
                        <span>3</span>
                    </button>
                    <button class="action-btn share-btn" onclick="app.sharePost('user-1')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Real-time functionality
    startRealTimeUpdates() {
        // Simulate real-time online count updates
        setInterval(() => {
            this.onlineUsers += Math.floor(Math.random() * 10) - 5;
            const onlineCountEl = document.getElementById('onlineCount');
            if (onlineCountEl) {
                onlineCountEl.textContent = this.onlineUsers.toLocaleString();
            }
        }, 5000);

        // Simulate real-time notifications
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showRealTimeNotification();
            }
        }, 15000);

        // Simulate real-time post updates
        setInterval(() => {
            this.updatePostStats();
        }, 8000);
    }

    showRealTimeNotification() {
        const notifications = [
            'María Silva le gustó tu thread',
            'Carlos López comenzó a seguirte',
            'Ana García comentó tu publicación',
            'Tienes 3 nuevos seguidores'
        ];

        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        
        // Update notification badge
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            const current = parseInt(badge.textContent) || 0;
            badge.textContent = current + 1;
        }

        // Show popup notification
        this.showNotificationPopup(notification);
    }

    showNotificationPopup(message) {
        const popup = document.getElementById('notificationPopup');
        popup.querySelector('.notification-content p').innerHTML = `<strong>Nueva notificación:</strong> ${message}`;
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 4000);
    }

    updatePostStats() {
        document.querySelectorAll('.post').forEach(post => {
            if (Math.random() > 0.8) {
                const likeBtn = post.querySelector('.like-btn span');
                if (likeBtn) {
                    const current = parseInt(likeBtn.textContent) || 0;
                    likeBtn.textContent = current + Math.floor(Math.random() * 3) + 1;
                }
            }
        });
    }

    // Interactive functions
    toggleLike(button, postId) {
        const icon = button.querySelector('i');
        const count = button.querySelector('span');
        const currentCount = parseInt(count.textContent) || 0;
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('liked');
            count.textContent = currentCount + 1;
            
            // Animate like
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('liked');
            count.textContent = Math.max(0, currentCount - 1);
        }
    }

    toggleComments(postId) {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        }
    }

    repost(postId) {
        // Animate repost
        const notification = document.createElement('div');
        notification.className = 'repost-notification';
        notification.innerHTML = '<i class="fas fa-retweet"></i> Thread reposteado';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    sharePost(postId) {
        if (navigator.share) {
            navigator.share({
                title: 'Threads',
                text: 'Mira este thread increíble',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Enlace copiado al portapapeles');
        }
    }

    updateComposeCounter(textarea) {
        const length = textarea.value.length;
        const maxLength = 280;
        const remaining = maxLength - length;
        
        const counterText = document.getElementById('counterText');
        const counterProgress = document.getElementById('counterProgress');
        const publishBtn = document.querySelector('.compose-publish');
        
        if (counterText) counterText.textContent = remaining;
        
        if (counterProgress) {
            const circumference = 50.27;
            const progress = (length / maxLength) * circumference;
            counterProgress.style.strokeDashoffset = circumference - progress;
            
            if (length > maxLength * 0.8) {
                counterProgress.style.stroke = '#ff9500';
            } else if (length > maxLength * 0.9) {
                counterProgress.style.stroke = '#ff3b30';
            } else {
                counterProgress.style.stroke = '#1da1f2';
            }
        }
        
        if (publishBtn) {
            publishBtn.disabled = length === 0 || length > maxLength;
        }
    }

    publishPost() {
        const textarea = document.querySelector('.compose-textarea');
        const content = textarea.value.trim();
        
        if (content) {
            // Create new post
            const newPost = this.createPostElement({
                id: Date.now(),
                user: this.currentUser,
                content: content,
                timestamp: 'ahora',
                likes: 0,
                comments: 0,
                reposts: 0
            });
            
            // Add to feed
            const feed = document.getElementById('postsFeed');
            if (feed) {
                feed.insertBefore(newPost, feed.firstChild);
            }
            
            // Clear form
            textarea.value = '';
            this.updateComposeCounter(textarea);
            
            // Show success and go to home
            this.showToast('¡Thread publicado exitosamente!');
            this.showScreen('home');
        }
    }

    createPostElement(postData) {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.dataset.postId = postData.id;
        
        postEl.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">
                    <img src="${postData.user.avatar}" alt="${postData.user.name}">
                    <div class="online-indicator"></div>
                </div>
                <div class="post-user-info">
                    <div class="post-name">${postData.user.name}</div>
                    <div class="post-meta">
                        <span class="username">@${postData.user.username}</span>
                        <span class="separator">•</span>
                        <span class="timestamp">${postData.timestamp}</span>
                    </div>
                </div>
                <div class="post-options">
                    <button class="options-btn" onclick="app.showPostOptions(${postData.id})">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
            <div class="post-content">
                <p>${postData.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn" onclick="app.toggleLike(this, ${postData.id})">
                    <i class="far fa-heart"></i>
                    <span>${postData.likes}</span>
                </button>
                <button class="action-btn comment-btn" onclick="app.toggleComments(${postData.id})">
                    <i class="far fa-comment"></i>
                    <span>${postData.comments}</span>
                </button>
                <button class="action-btn repost-btn" onclick="app.repost(${postData.id})">
                    <i class="fas fa-retweet"></i>
                    <span>${postData.reposts}</span>
                </button>
                <button class="action-btn share-btn" onclick="app.sharePost(${postData.id})">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        `;
        
        return postEl;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            font-size: 14px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    simulateTyping() {
        // Simulate someone typing in real-time
        setInterval(() => {
            if (Math.random() > 0.9) {
                this.showTypingIndicator();
            }
        }, 10000);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face" alt="Carlos">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>Carlos está escribiendo...</span>
        `;
        
        const feed = document.getElementById('postsFeed');
        if (feed) {
            feed.appendChild(indicator);
            
            setTimeout(() => {
                indicator.remove();
            }, 3000);
        }
    }

    updateTimestamps() {
        document.querySelectorAll('.timestamp').forEach(timestamp => {
            const time = timestamp.dataset.time;
            if (time) {
                timestamp.textContent = this.getRelativeTime(new Date(time));
            }
        });
    }

    getRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (minutes < 1) return 'ahora';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        return `${days}d`;
    }

    loadInitialData() {
        // Simulate loading initial data
        setTimeout(() => {
            this.refreshContent();
        }, 1000);
    }

    refreshContent() {
        // Simulate new content loading
        console.log('Refreshing content...');
    }
}

// Initialize app
const app = new ThreadsApp();

// Global functions for HTML onclick events
function showScreen(screen) { app.showScreen(screen); }
function toggleLike(btn, id) { app.toggleLike(btn, id); }
function toggleComments(id) { app.toggleComments(id); }
function repost(id) { app.repost(id); }
function sharePost(id) { app.sharePost(id); }
function publishPost() { app.publishPost(); }
function updateComposeCounter(textarea) { app.updateComposeCounter(textarea); }

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    .typing-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: var(--surface-color);
        margin: 8px 0;
        border-radius: 12px;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .typing-dots {
        display: flex;
        gap: 2px;
    }
    
    .typing-dots span {
        width: 4px;
        height: 4px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
    }
    
    .repost-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--success-color);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideUp 0.3s ease;
    }
`;
document.head.appendChild(style);