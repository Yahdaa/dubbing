// Uber-Style Threads App - Mobile Optimized
class UberThreadsApp {
    constructor() {
        this.currentUser = {
            id: 1,
            name: 'Tu nombre',
            username: 'tu_usuario',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
        };
        this.onlineUsers = 1247;
        this.notifications = [];
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupMobileOptimizations();
        this.startRealTimeUpdates();
        
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
    }

    showLoadingScreen() {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.style.display = 'flex';
    }

    hideLoadingScreen() {
        const loading = document.getElementById('loadingScreen');
        if (loading) loading.style.display = 'none';
    }

    setupMobileOptimizations() {
        // Prevent zoom on input focus
        document.addEventListener('touchstart', () => {});
        
        // Optimize scroll performance
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('.main-content')) {
                e.stopPropagation();
            }
        }, { passive: true });

        // Handle safe area
        this.handleSafeArea();
        
        // Setup touch feedback
        this.setupTouchFeedback();
    }

    handleSafeArea() {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    }

    setupTouchFeedback() {
        // Add haptic feedback for supported devices
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.nav-btn, .action-btn, .header-btn')) {
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            }
        });
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
        
        const activeBtn = document.querySelector(`[data-screen=\"${screenName}\"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Load screen content
        this.loadScreenContent(screenName);
        
        // Scroll to top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }

    loadScreenContent(screenName) {
        switch(screenName) {
            case 'search':
                this.loadSearchScreen();
                break;
            case 'post':
                this.loadPostScreen();
                break;
            case 'activity':
                this.loadActivityScreen();
                break;
            case 'profile':
                this.loadProfileScreen();
                break;
        }
    }

    loadSearchScreen() {
        const searchScreen = document.getElementById('search');
        if (!searchScreen.innerHTML.trim()) {
            searchScreen.innerHTML = `
                <div class=\"search-header\">
                    <div class=\"search-container\">
                        <i class=\"fas fa-search\"></i>
                        <input type=\"text\" placeholder=\"Buscar\" class=\"search-input\" oninput=\"app.performSearch(this.value)\">
                    </div>
                </div>
                
                <div class=\"trending-section\">
                    <h3>Tendencias</h3>
                    <div class=\"trending-topics\">
                        <div class=\"trending-item\" onclick=\"app.searchTopic('IA')\">
                            <div class=\"trending-info\">
                                <span class=\"trending-category\">Tecnología</span>
                                <span class=\"trending-topic\">#IA</span>
                                <span class=\"trending-posts\">45.2K threads</span>
                            </div>
                        </div>
                        <div class=\"trending-item\" onclick=\"app.searchTopic('JavaScript')\">
                            <div class=\"trending-info\">
                                <span class=\"trending-category\">Programación</span>
                                <span class=\"trending-topic\">#JavaScript</span>
                                <span class=\"trending-posts\">32.1K threads</span>
                            </div>
                        </div>
                        <div class=\"trending-item\" onclick=\"app.searchTopic('Startup')\">
                            <div class=\"trending-info\">
                                <span class=\"trending-category\">Negocios</span>
                                <span class=\"trending-topic\">#Startup</span>
                                <span class=\"trending-posts\">28.7K threads</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadPostScreen() {
        const postScreen = document.getElementById('post');
        if (!postScreen.innerHTML.trim()) {
            postScreen.innerHTML = `
                <div class=\"compose-header\">
                    <button class=\"compose-cancel\" onclick=\"app.showScreen('home')\">
                        <i class=\"fas fa-times\"></i>
                    </button>
                    <h2>Nuevo thread</h2>
                    <button class=\"compose-publish\" onclick=\"app.publishPost()\" disabled>
                        Publicar
                    </button>
                </div>

                <div class=\"compose-content\">
                    <div class=\"compose-user\">
                        <img src=\"${this.currentUser.avatar}\" alt=\"${this.currentUser.name}\" class=\"compose-avatar\">
                        <div class=\"compose-user-info\">
                            <div class=\"compose-name\">${this.currentUser.name}</div>
                            <div class=\"compose-username\">@${this.currentUser.username}</div>
                        </div>
                    </div>

                    <textarea 
                        class=\"compose-textarea\" 
                        placeholder=\"¿Qué está pasando?\"
                        oninput=\"app.updateComposeCounter(this)\"
                        maxlength=\"280\"
                    ></textarea>
                    
                    <div class=\"compose-footer\">
                        <div class=\"compose-actions\">
                            <button class=\"compose-action\" onclick=\"app.addMedia('image')\">
                                <i class=\"fas fa-image\"></i>
                            </button>
                            <button class=\"compose-action\" onclick=\"app.addMedia('camera')\">
                                <i class=\"fas fa-camera\"></i>
                            </button>
                            <button class=\"compose-action\" onclick=\"app.addLocation()\">
                                <i class=\"fas fa-map-marker-alt\"></i>
                            </button>
                        </div>
                        
                        <div class=\"compose-counter\">
                            <span class=\"counter-text\" id=\"counterText\">280</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    loadActivityScreen() {
        const activityScreen = document.getElementById('activity');
        if (!activityScreen.innerHTML.trim()) {
            activityScreen.innerHTML = `
                <div class=\"activity-header\">
                    <h2>Actividad</h2>
                </div>

                <div class=\"activity-tabs\">
                    <button class=\"activity-tab active\" onclick=\"app.showActivityTab('all')\">Todo</button>
                    <button class=\"activity-tab\" onclick=\"app.showActivityTab('mentions')\">Menciones</button>
                    <button class=\"activity-tab\" onclick=\"app.showActivityTab('likes')\">Me gusta</button>
                </div>

                <div class=\"activity-content\">
                    ${this.generateActivityItems()}
                </div>
            `;
        }
    }

    loadProfileScreen() {
        const profileScreen = document.getElementById('profile');
        if (!profileScreen.innerHTML.trim()) {
            profileScreen.innerHTML = `
                <div class=\"profile-header\">
                    <div class=\"profile-info\">
                        <div class=\"profile-avatar-container\">
                            <img src=\"${this.currentUser.avatar}\" alt=\"${this.currentUser.name}\" class=\"profile-avatar-large\">
                        </div>
                        
                        <div class=\"profile-details\">
                            <h1 class=\"profile-name\">${this.currentUser.name}</h1>
                            <p class=\"profile-username\">@${this.currentUser.username}</p>
                            <p class=\"profile-bio\">Desarrollador Full Stack apasionado por la tecnología. Creando el futuro una línea de código a la vez.</p>
                            
                            <div class=\"profile-stats\">
                                <div class=\"profile-stat\">
                                    <span class=\"stat-number\">1,247</span>
                                    <span class=\"stat-label\">Siguiendo</span>
                                </div>
                                <div class=\"profile-stat\">
                                    <span class=\"stat-number\">15.2K</span>
                                    <span class=\"stat-label\">Seguidores</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=\"profile-content\">
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
                time: '15 min'
            }
        ];

        return activities.map(activity => `
            <div class=\"activity-item\">
                <div class=\"activity-avatar\">
                    <img src=\"${activity.avatar}\" alt=\"${activity.user}\">
                    <div class=\"activity-type-icon ${activity.type}\">
                        <i class=\"fas fa-${activity.type === 'like' ? 'heart' : activity.type === 'follow' ? 'user-plus' : 'comment'}\"></i>
                    </div>
                </div>
                <div class=\"activity-content\">
                    <p class=\"activity-text\">
                        <strong>${activity.user}</strong> ${activity.action}
                    </p>
                    <span class=\"activity-time\">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    generateUserPosts() {
        return `
            <div class=\"post\">
                <div class=\"post-header\">
                    <div class=\"post-avatar\">
                        <img src=\"${this.currentUser.avatar}\" alt=\"${this.currentUser.name}\">
                    </div>
                    <div class=\"post-user-info\">
                        <div class=\"post-name\">${this.currentUser.name}</div>
                        <div class=\"post-meta\">
                            <span class=\"username\">@${this.currentUser.username}</span>
                            <span class=\"separator\">•</span>
                            <span class=\"timestamp\">1d</span>
                        </div>
                    </div>
                </div>
                <div class=\"post-content\">
                    <p>¡Emocionado de estar en Threads! Esta plataforma tiene un potencial increíble para conectar con desarrolladores de todo el mundo.</p>
                </div>
                <div class=\"post-stats\">
                    <span class=\"stat\">42 me gusta</span>
                    <span class=\"stat\">8 comentarios</span>
                </div>
                <div class=\"post-actions\">
                    <button class=\"action-btn like-btn\" onclick=\"app.toggleLike(this, 'user-1')\">
                        <i class=\"far fa-heart\"></i>
                        <span>42</span>
                    </button>
                    <button class=\"action-btn comment-btn\" onclick=\"app.toggleComments('user-1')\">
                        <i class=\"far fa-comment\"></i>
                        <span>8</span>
                    </button>
                    <button class=\"action-btn repost-btn\" onclick=\"app.repost('user-1')\">
                        <i class=\"fas fa-retweet\"></i>
                        <span>3</span>
                    </button>
                    <button class=\"action-btn share-btn\" onclick=\"app.sharePost('user-1')\">
                        <i class=\"fas fa-share\"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Real-time functionality
    startRealTimeUpdates() {
        // Update online count
        setInterval(() => {
            this.onlineUsers += Math.floor(Math.random() * 10) - 5;
            const onlineCountEl = document.getElementById('onlineCount');
            if (onlineCountEl) {
                onlineCountEl.textContent = this.onlineUsers.toLocaleString();
            }
        }, 5000);

        // Show notifications
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.showRealTimeNotification();
            }
        }, 15000);

        // Update post stats
        setInterval(() => {
            this.updatePostStats();
        }, 8000);
    }

    showRealTimeNotification() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            const current = parseInt(badge.textContent) || 0;
            badge.textContent = current + 1;
        }

        // Show toast notification
        this.showToast('Nueva notificación recibida');
    }

    updatePostStats() {
        document.querySelectorAll('.post').forEach(post => {
            if (Math.random() > 0.9) {
                const likeBtn = post.querySelector('.like-btn span');
                if (likeBtn) {
                    const current = parseInt(likeBtn.textContent) || 0;
                    likeBtn.textContent = current + 1;
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
            
            // Animate
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('liked');
            count.textContent = Math.max(0, currentCount - 1);
        }
    }

    toggleComments(postId) {
        this.showToast('Función de comentarios próximamente');
    }

    repost(postId) {
        this.showToast('Thread reposteado');
    }

    sharePost(postId) {
        if (navigator.share) {
            navigator.share({
                title: 'Threads',
                text: 'Mira este thread',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Enlace copiado');
        }
    }

    updateComposeCounter(textarea) {
        const length = textarea.value.length;
        const remaining = 280 - length;
        
        const counterText = document.getElementById('counterText');
        const publishBtn = document.querySelector('.compose-publish');
        
        if (counterText) {
            counterText.textContent = remaining;
            
            if (remaining < 20) {
                counterText.style.color = 'var(--uber-red)';
            } else if (remaining < 50) {
                counterText.style.color = 'var(--uber-yellow)';
            } else {
                counterText.style.color = 'var(--uber-gray-500)';
            }
        }
        
        if (publishBtn) {
            publishBtn.disabled = length === 0 || length > 280;
        }
    }

    publishPost() {
        const textarea = document.querySelector('.compose-textarea');
        const content = textarea.value.trim();
        
        if (content) {
            // Add to feed
            const feed = document.getElementById('postsFeed');
            if (feed) {
                const newPost = this.createPostElement({
                    id: Date.now(),
                    user: this.currentUser,
                    content: content,
                    timestamp: 'ahora',
                    likes: 0,
                    comments: 0
                });
                
                feed.insertBefore(newPost, feed.firstChild);
            }
            
            // Clear and go home
            textarea.value = '';
            this.updateComposeCounter(textarea);
            this.showToast('Thread publicado');
            this.showScreen('home');
        }
    }

    createPostElement(postData) {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        
        postEl.innerHTML = `
            <div class=\"post-header\">
                <div class=\"post-avatar\">
                    <img src=\"${postData.user.avatar}\" alt=\"${postData.user.name}\">
                </div>
                <div class=\"post-user-info\">
                    <div class=\"post-name\">${postData.user.name}</div>
                    <div class=\"post-meta\">
                        <span class=\"username\">@${postData.user.username}</span>
                        <span class=\"separator\">•</span>
                        <span class=\"timestamp\">${postData.timestamp}</span>
                    </div>
                </div>
            </div>
            <div class=\"post-content\">
                <p>${postData.content}</p>
            </div>
            <div class=\"post-stats\">
                <span class=\"stat\">${postData.likes} me gusta</span>
                <span class=\"stat\">${postData.comments} comentarios</span>
            </div>
            <div class=\"post-actions\">
                <button class=\"action-btn like-btn\" onclick=\"app.toggleLike(this, ${postData.id})\">
                    <i class=\"far fa-heart\"></i>
                    <span>${postData.likes}</span>
                </button>
                <button class=\"action-btn comment-btn\" onclick=\"app.toggleComments(${postData.id})\">
                    <i class=\"far fa-comment\"></i>
                    <span>${postData.comments}</span>
                </button>
                <button class=\"action-btn repost-btn\" onclick=\"app.repost(${postData.id})\">
                    <i class=\"fas fa-retweet\"></i>
                    <span>0</span>
                </button>
                <button class=\"action-btn share-btn\" onclick=\"app.sharePost(${postData.id})\">
                    <i class=\"fas fa-share\"></i>
                </button>
            </div>
        `;
        
        return postEl;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--uber-black);
            color: var(--uber-white);
            padding: 12px 20px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2500);
    }

    // Utility functions
    addStory() { this.showToast('Función de historias próximamente'); }
    viewStory(user) { this.showToast(`Viendo historia de ${user}`); }
    toggleNotifications() { this.showToast('Panel de notificaciones'); }
    toggleMenu() { this.showToast('Menú de opciones'); }
    showPostOptions(id) { this.showToast('Opciones del post'); }
    performSearch(query) { console.log('Buscando:', query); }
    searchTopic(topic) { this.showToast(`Buscando ${topic}`); }
    addMedia(type) { this.showToast(`Agregar ${type}`); }
    addLocation() { this.showToast('Agregar ubicación'); }
    showActivityTab(tab) { 
        document.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
    }
}

// Initialize app
const app = new UberThreadsApp();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    .app {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
    }
`;
document.head.appendChild(style);