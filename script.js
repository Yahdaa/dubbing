// Modern Uber-Style Threads App
class UberThreadsApp {
    constructor() {
        this.currentUser = {
            id: 1,
            name: 'Tu nombre',
            username: 'tu_usuario',
            bio: 'Desarrollador Full Stack. Apasionado por la tecnología y la innovación. Creando el futuro una línea de código a la vez.',
            location: 'Madrid, España',
            website: 'https://portfolio.dev',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face'
        };
        this.posts = [];
        this.searchResults = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupAnimations();
        this.startRealTimeUpdates();
        this.loadSampleData();
        
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
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
        // Handle responsive design
        this.handleResponsiveDesign();
        
        // Smooth scrolling
        document.querySelectorAll('.main-content').forEach(el => {
            el.style.scrollBehavior = 'smooth';
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                this.showScreen('compose');
            }
            if (e.key === 'Escape') {
                this.closeEditProfile();
            }
        });

        // Handle clicks outside modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeEditProfile();
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.post-item, .trending-item, .activity-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.4s ease';
            observer.observe(el);
        });
    }

    handleResponsiveDesign() {
        const updateLayout = () => {
            const isMobile = window.innerWidth <= 500;
            const fab = document.querySelector('.fab');
            
            if (fab) {
                fab.style.display = isMobile ? 'flex' : 'none';
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
    }

    loadSampleData() {
        this.posts = [
            {
                id: 1,
                user: {
                    name: 'Ana García',
                    username: 'ana_garcia',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                },
                content: 'Trabajando en un nuevo proyecto de IA. La tecnología está evolucionando tan rápido que es emocionante ser parte de esta revolución.',
                timestamp: '2h',
                likes: 89,
                replies: 12,
                retweets: 5,
                image: null
            },
            {
                id: 2,
                user: {
                    name: 'Carlos López',
                    username: 'carlos_dev',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                },
                content: 'JavaScript sigue siendo el lenguaje más versátil. Desde frontend hasta backend, mobile y desktop. ¿Cuál es tu stack favorito?',
                timestamp: '4h',
                likes: 156,
                replies: 24,
                retweets: 8,
                image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop'
            }
        ];

        this.searchResults = [
            {
                type: 'user',
                name: 'María Silva',
                username: 'maria_design',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                followers: '15.2K'
            },
            {
                type: 'user',
                name: 'Diego Ruiz',
                username: 'diego_startup',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                followers: '8.9K'
            },
            {
                type: 'hashtag',
                tag: '#JavaScript',
                posts: '45.2K'
            },
            {
                type: 'hashtag',
                tag: '#IA',
                posts: '32.1K'
            }
        ];
    }

    showScreen(screenName) {
        // Smooth transition between screens
        const currentScreen = document.querySelector('.screen.active');
        const targetScreen = document.getElementById(screenName);

        if (currentScreen) {
            currentScreen.style.opacity = '0';
            currentScreen.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                currentScreen.classList.remove('active');
                
                if (targetScreen) {
                    targetScreen.classList.add('active');
                    setTimeout(() => {
                        targetScreen.style.opacity = '1';
                        targetScreen.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 150);
        } else if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.style.opacity = '1';
            targetScreen.style.transform = 'translateY(0)';
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`[data-screen=\"${screenName}\"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Scroll to top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }

    startRealTimeUpdates() {
        // Update post stats
        setInterval(() => {
            this.updatePostStats();
        }, 8000);

        // Show notifications
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showNewNotification();
            }
        }, 15000);

        // Update timestamps
        setInterval(() => {
            this.updateTimestamps();
        }, 60000);
    }

    updatePostStats() {
        document.querySelectorAll('.post-item').forEach(post => {
            if (Math.random() > 0.85) {
                const likeBtn = post.querySelector('.like-btn span');
                if (likeBtn) {
                    const current = parseInt(likeBtn.textContent) || 0;
                    const newCount = current + Math.floor(Math.random() * 3) + 1;
                    likeBtn.textContent = newCount;
                    
                    // Animate update
                    likeBtn.style.transform = 'scale(1.2)';
                    likeBtn.style.color = 'var(--uber-green)';
                    setTimeout(() => {
                        likeBtn.style.transform = 'scale(1)';
                        likeBtn.style.color = '';
                    }, 300);
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
            activityBadge.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                activityBadge.style.animation = '';
            }, 600);
        }

        this.showToast('Nueva notificación recibida');
    }

    updateTimestamps() {
        document.querySelectorAll('.post-time').forEach(timeEl => {
            const currentTime = timeEl.textContent;
            if (currentTime.includes('m')) {
                const minutes = parseInt(currentTime);
                if (minutes < 60) {
                    timeEl.textContent = `${minutes + 1}m`;
                }
            } else if (currentTime.includes('h')) {
                const hours = parseInt(currentTime);
                if (hours < 24) {
                    timeEl.textContent = `${hours}h`;
                }
            }
        });
    }

    // Search Functionality
    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        const trendingSection = document.getElementById('trendingSection');
        
        if (query.length > 0) {
            // Show search results, hide trending
            searchResults.style.display = 'block';
            trendingSection.style.display = 'none';
            
            // Filter results based on query and current filter
            const filteredResults = this.searchResults.filter(result => {
                const matchesQuery = result.name?.toLowerCase().includes(query.toLowerCase()) ||
                                  result.username?.toLowerCase().includes(query.toLowerCase()) ||
                                  result.tag?.toLowerCase().includes(query.toLowerCase());
                
                const matchesFilter = this.currentFilter === 'all' ||
                                    (this.currentFilter === 'users' && result.type === 'user') ||
                                    (this.currentFilter === 'hashtags' && result.type === 'hashtag');
                
                return matchesQuery && matchesFilter;
            });
            
            this.displaySearchResults(filteredResults);
        } else {
            // Show trending, hide search results
            searchResults.style.display = 'none';
            trendingSection.style.display = 'block';
        }
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--uber-gray-600);">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No se encontraron resultados</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(result => {
            if (result.type === 'user') {
                return `
                    <div class="search-result-item" onclick="app.viewProfile('${result.username}')">
                        <img src="${result.avatar}" alt="${result.name}" class="search-result-avatar">
                        <div class="search-result-info">
                            <div class="search-result-name">${result.name}</div>
                            <div class="search-result-username">@${result.username} • ${result.followers} seguidores</div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="search-result-item" onclick="app.searchTopic('${result.tag}')">
                        <div class="search-result-avatar" style="background: var(--uber-black); color: var(--uber-white); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 18px;">
                            #
                        </div>
                        <div class="search-result-info">
                            <div class="search-result-name">${result.tag}</div>
                            <div class="search-result-username">${result.posts} threads</div>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // Animate results
        document.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    filterSearch(filter) {
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Re-run search with current query
        const searchInput = document.querySelector('.search-input');
        this.performSearch(searchInput.value);
    }

    searchTopic(topic) {
        const searchInput = document.querySelector('.search-input');
        searchInput.value = topic;
        this.performSearch(topic);
        this.showToast(`Buscando ${topic}`);
    }

    viewProfile(username) {
        this.showToast(`Viendo perfil de @${username}`);
        // Future: Navigate to user profile
    }

    // Post Interactions
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
            color: var(--uber-red);
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
    }

    retweetPost(postId) {
        const retweetBtns = document.querySelectorAll(`[data-post="${postId}"] .retweet-btn`);
        retweetBtns.forEach(btn => {
            btn.style.color = 'var(--uber-green)';
            btn.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                btn.style.transform = 'rotate(0deg)';
                btn.style.color = '';
            }, 300);
        });
        this.showToast('Thread reposteado');
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
                counter.style.color = 'var(--uber-red)';
            } else if (remaining < 50) {
                counter.style.color = 'var(--uber-orange)';
            } else {
                counter.style.color = 'var(--uber-gray-600)';
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
            
            // Success animation and navigation
            this.showToast('Thread publicado exitosamente');
            setTimeout(() => {
                this.showScreen('home');
            }, 800);
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
        
        // Entrance animation
        postEl.style.opacity = '0';
        postEl.style.transform = 'translateY(20px)';
        setTimeout(() => {
            postEl.style.transition = 'all 0.4s ease';
            postEl.style.opacity = '1';
            postEl.style.transform = 'translateY(0)';
        }, 100);
        
        return postEl;
    }

    // Profile Edit Functions
    openEditProfile() {
        const modal = document.getElementById('editProfileModal');
        modal.classList.add('active');
        
        // Populate form with current data
        document.getElementById('editName').value = this.currentUser.name;
        document.getElementById('editUsername').value = this.currentUser.username;
        document.getElementById('editBio').value = this.currentUser.bio;
        document.getElementById('editLocation').value = this.currentUser.location;
        document.getElementById('editWebsite').value = this.currentUser.website;
        document.getElementById('avatarPreview').src = this.currentUser.avatar;
    }

    closeEditProfile() {
        const modal = document.getElementById('editProfileModal');
        modal.classList.remove('active');
    }

    uploadAvatar() {
        document.getElementById('avatarInput').click();
    }

    previewAvatar(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('avatarPreview').src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    saveProfile() {
        // Get form data
        const newData = {
            name: document.getElementById('editName').value,
            username: document.getElementById('editUsername').value,
            bio: document.getElementById('editBio').value,
            location: document.getElementById('editLocation').value,
            website: document.getElementById('editWebsite').value,
            avatar: document.getElementById('avatarPreview').src
        };
        
        // Validate data
        if (!newData.name.trim()) {
            this.showToast('El nombre es requerido');
            return;
        }
        
        if (!newData.username.trim()) {
            this.showToast('El nombre de usuario es requerido');
            return;
        }
        
        // Update user data
        Object.assign(this.currentUser, newData);
        
        // Update UI
        this.updateProfileUI();
        
        // Close modal
        this.closeEditProfile();
        
        // Show success
        this.showToast('Perfil actualizado exitosamente');
    }

    updateProfileUI() {
        // Update profile screen
        document.querySelector('.profile-name').textContent = this.currentUser.name;
        document.querySelector('.profile-username').textContent = `@${this.currentUser.username}`;
        document.querySelector('.profile-bio').textContent = this.currentUser.bio;
        document.querySelector('.profile-avatar img').src = this.currentUser.avatar;
        
        // Update compose screen
        document.querySelector('.user-name').textContent = this.currentUser.name;
        document.querySelector('.user-handle').textContent = `@${this.currentUser.username}`;
        document.querySelector('.user-avatar').src = this.currentUser.avatar;
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

    showToast(message) {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize app
const app = new UberThreadsApp();

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .search-result-item {
        transition: all 0.3s ease;
    }
    
    .search-result-item:hover {
        transform: translateX(4px);
    }
    
    .modal {
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
        }
        to {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    .form-input:focus {
        transform: translateY(-1px);
    }
    
    .btn-primary:hover {
        transform: translateY(-1px);
    }
    
    .btn-secondary:hover {
        transform: translateY(-1px);
    }
`;
document.head.appendChild(additionalStyles);