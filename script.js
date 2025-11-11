// Twitter-Style Threads App
class ThreadsApp {
    constructor() {
        this.currentUser = {
            id: 1,
            name: 'Tu nombre',
            username: 'tu_usuario',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
        };
        this.posts = [];
        this.notifications = [];
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupAnimations();
        this.startRealTimeUpdates();
        
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1200);
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').style.display = 'flex';
    }

    hideLoadingScreen() {
        const loading = document.getElementById('loadingScreen');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 300);
    }

    setupEventListeners() {
        // Handle responsive navigation
        this.handleResponsiveNav();
        
        // Setup smooth scrolling
        document.querySelectorAll('.main-content').forEach(el => {
            el.style.scrollBehavior = 'smooth';
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                this.showScreen('compose');
            }
        });

        // Handle search input
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        // Handle filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Handle activity tabs
        document.querySelectorAll('.activity-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Handle profile tabs
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.4s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        // Observe post items
        document.querySelectorAll('.post-item').forEach(post => {
            observer.observe(post);
        });

        // Add hover animations to buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.05)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
    }

    handleResponsiveNav() {
        const updateNavVisibility = () => {
            const isMobile = window.innerWidth <= 500;
            const fab = document.querySelector('.fab');
            const bottomNav = document.querySelector('.bottom-nav');
            
            if (fab) fab.style.display = isMobile ? 'flex' : 'none';
            if (bottomNav) bottomNav.style.display = isMobile ? 'flex' : 'flex';
        };

        updateNavVisibility();
        window.addEventListener('resize', updateNavVisibility);
    }

    showScreen(screenName) {
        // Hide all screens with fade out
        document.querySelectorAll('.screen').forEach(screen => {
            if (screen.classList.contains('active')) {
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.classList.remove('active');
                }, 150);
            }
        });

        // Show target screen with fade in
        setTimeout(() => {
            const targetScreen = document.getElementById(screenName);
            if (targetScreen) {
                targetScreen.classList.add('active');
                targetScreen.style.opacity = '0';
                setTimeout(() => {
                    targetScreen.style.opacity = '1';
                }, 50);
            }
        }, 150);

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`[data-screen="${screenName}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Scroll to top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }

        // Load dynamic content
        this.loadScreenContent(screenName);
    }

    loadScreenContent(screenName) {
        switch(screenName) {
            case 'search':
                this.loadSearchResults();
                break;
            case 'activity':
                this.loadActivityFeed();
                break;
            case 'profile':
                this.loadUserProfile();
                break;
        }
    }

    loadSearchResults() {
        // Simulate loading search results
        console.log('Loading search results...');
    }

    loadActivityFeed() {
        // Simulate loading activity feed
        console.log('Loading activity feed...');
    }

    loadUserProfile() {
        // Simulate loading user profile
        console.log('Loading user profile...');
    }

    startRealTimeUpdates() {
        // Update post stats in real-time
        setInterval(() => {
            this.updatePostStats();
        }, 5000);

        // Show new notifications
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.showNewNotification();
            }
        }, 10000);

        // Update timestamps
        setInterval(() => {
            this.updateTimestamps();
        }, 60000);
    }

    updatePostStats() {
        document.querySelectorAll('.post-item').forEach(post => {
            if (Math.random() > 0.9) {
                const likeBtn = post.querySelector('.like-btn span');
                if (likeBtn) {
                    const current = parseInt(likeBtn.textContent) || 0;
                    likeBtn.textContent = current + Math.floor(Math.random() * 3) + 1;
                    
                    // Add animation
                    likeBtn.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        likeBtn.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    }

    showNewNotification() {
        const notificationDot = document.querySelector('.notification-dot');
        if (notificationDot) {
            notificationDot.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                notificationDot.style.animation = '';
            }, 1000);
        }

        const activityBadge = document.querySelector('.activity-badge');
        if (activityBadge) {
            const current = parseInt(activityBadge.textContent) || 0;
            activityBadge.textContent = current + 1;
            activityBadge.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                activityBadge.style.animation = '';
            }, 500);
        }

        this.showToast('Nueva notificación recibida');
    }

    updateTimestamps() {
        document.querySelectorAll('.post-time').forEach(timeEl => {
            // Simulate time progression
            const currentTime = timeEl.textContent;
            if (currentTime.includes('m')) {
                const minutes = parseInt(currentTime);
                if (minutes < 60) {
                    timeEl.textContent = `${minutes + 1}m`;
                }
            } else if (currentTime.includes('h')) {
                const hours = parseInt(currentTime);
                timeEl.textContent = `${hours}h`;
            }
        });
    }

    // Interactive Functions
    likePost(postId, button) {
        const icon = button.querySelector('i');
        const count = button.querySelector('span');
        const currentCount = parseInt(count.textContent) || 0;
        
        if (button.classList.contains('liked')) {
            // Unlike
            button.classList.remove('liked');
            icon.classList.remove('fas');
            icon.classList.add('far');
            count.textContent = Math.max(0, currentCount - 1);
            
            // Animation
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        } else {
            // Like
            button.classList.add('liked');
            icon.classList.remove('far');
            icon.classList.add('fas');
            count.textContent = currentCount + 1;
            
            // Heart animation
            this.createHeartAnimation(button);
            
            // Button animation
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    }

    createHeartAnimation(button) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: absolute;
            color: #E0245E;
            font-size: 20px;
            pointer-events: none;
            animation: heartFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    replyPost(postId) {
        this.showToast('Función de respuesta próximamente');
        // Future: Open reply modal
    }

    retweetPost(postId) {
        this.showToast('Thread reposteado');
        // Add retweet animation
        const retweetBtns = document.querySelectorAll(`[data-post="${postId}"] .retweet-btn`);
        retweetBtns.forEach(btn => {
            btn.style.color = '#17BF63';
            btn.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                btn.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    sharePost(postId) {
        if (navigator.share) {
            navigator.share({
                title: 'Threads',
                text: 'Mira este thread increíble',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Enlace copiado al portapapeles');
        }
    }

    showPostMenu(postId) {
        this.showToast('Menú de opciones del post');
        // Future: Show context menu
    }

    // Compose Functions
    updateCounter(textarea) {
        const length = textarea.value.length;
        const remaining = 280 - length;
        const counter = document.getElementById('charCount');
        const publishBtn = document.querySelector('.compose-post');
        
        if (counter) {
            counter.textContent = remaining;
            
            if (remaining < 20) {
                counter.style.color = '#E0245E';
            } else if (remaining < 50) {
                counter.style.color = '#FFAD1F';
            } else {
                counter.style.color = '#657786';
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
            // Create new post
            const newPost = this.createPostElement({
                id: Date.now(),
                user: this.currentUser,
                content: content,
                timestamp: 'ahora',
                likes: 0,
                replies: 0,
                retweets: 0
            });
            
            // Add to feed
            const feed = document.querySelector('.feed-container');
            if (feed) {
                feed.insertBefore(newPost, feed.firstChild);
            }
            
            // Clear form
            textarea.value = '';
            this.updateCounter(textarea);
            
            // Show success and navigate
            this.showToast('Thread publicado exitosamente');
            setTimeout(() => {
                this.showScreen('home');
            }, 500);
        }
    }

    createPostElement(postData) {
        const postEl = document.createElement('div');
        postEl.className = 'post-item';
        postEl.dataset.post = postData.id;
        
        postEl.innerHTML = `
            <div class="post-avatar">
                <img src="${postData.user.avatar}" alt="${postData.user.name}">
            </div>
            <div class="post-content">
                <div class="post-header">
                    <span class="post-name">${postData.user.name}</span>
                    <span class="post-username">@${postData.user.username}</span>
                    <span class="post-time">${postData.timestamp}</span>
                    <button class="post-menu" onclick="app.showPostMenu(${postData.id})">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="post-text">${postData.content}</div>
                <div class="post-actions">
                    <button class="action-btn reply-btn" onclick="app.replyPost(${postData.id})">
                        <i class="far fa-comment"></i>
                        <span>${postData.replies}</span>
                    </button>
                    <button class="action-btn retweet-btn" onclick="app.retweetPost(${postData.id})">
                        <i class="fas fa-retweet"></i>
                        <span>${postData.retweets}</span>
                    </button>
                    <button class="action-btn like-btn" onclick="app.likePost(${postData.id}, this)">
                        <i class="far fa-heart"></i>
                        <span>${postData.likes}</span>
                    </button>
                    <button class="action-btn share-btn" onclick="app.sharePost(${postData.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add entrance animation
        postEl.style.opacity = '0';
        postEl.style.transform = 'translateY(20px)';
        setTimeout(() => {
            postEl.style.transition = 'all 0.3s ease';
            postEl.style.opacity = '1';
            postEl.style.transform = 'translateY(0)';
        }, 100);
        
        return postEl;
    }

    // Utility Functions
    addImage() {
        this.showToast('Función de imágenes próximamente');
    }

    addGif() {
        this.showToast('Función de GIFs próximamente');
    }

    addLocation() {
        this.showToast('Función de ubicación próximamente');
    }

    toggleSearch() {
        this.showScreen('search');
    }

    toggleNotifications() {
        this.showScreen('activity');
    }

    performSearch(query) {
        if (query.length > 0) {
            console.log('Searching for:', query);
            // Future: Implement real search
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(20, 23, 26, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideUp 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    }
}

// Initialize app
const app = new ThreadsApp();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0;
        }
    }
    
    .post-item {
        transition: all 0.2s ease;
    }
    
    .action-btn {
        transition: all 0.2s ease;
    }
    
    .screen {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);