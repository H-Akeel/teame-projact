// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
    initializeServiceCards();
    initializeMobileMenu();
    initializeBackToTop();
});

// Navigation functionality
function initializeNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Check if it's an external page link (contains .html)
            if (targetId.includes('.html')) {
                // Allow default behavior for external pages
                return;
            }
            
            // Only prevent default for internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.getElementById('nav');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .feature, .about-description, .service-category, .visual-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Staggered animations for detailed sections
    const detailedSections = document.querySelectorAll('.detailed-section');
    detailedSections.forEach(section => {
        const categories = section.querySelectorAll('.service-category');
        const visualCards = section.querySelectorAll('.visual-card');
        
        categories.forEach((category, index) => {
            category.style.animationDelay = `${index * 0.2}s`;
        });
        
        visualCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    });
}

// Service cards interaction
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const button = card.querySelector('.btn');
        const serviceType = card.getAttribute('data-service');
        
        if (button) {
            button.addEventListener('click', function() {
                // Scroll to contact form and pre-select service
                const contactSection = document.getElementById('contact');
                const serviceSelect = document.getElementById('service');
                
                if (contactSection && serviceSelect) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-select the service in the form
                    setTimeout(() => {
                        serviceSelect.value = serviceType;
                        serviceSelect.focus();
                    }, 500);
                }
            });
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== كود إرسال الرسائل عبر WhatsApp و Telegram =====

// إعدادات الاتصال
const CONTACT_CONFIG = {
    // رقم WhatsApp (يجب تغييره إلى رقمكم الحقيقي)
    whatsappNumber: "9647702616255", // بدون علامة + أو مسافات
    
    // معرف Telegram (يجب تغييره إلى معرفكم الحقيقي)
    telegramUsername: "teatime20", // بدون علامة @ في البداية
};

// CSS للنافذة المنبثقة
const modalCSS = `
.send-options-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 15px;
}

.modal-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
}

.close-modal {
    background: none;
    border: none;
    font-size: 2rem;
    color: #7f8c8d;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-modal:hover {
    color: #e74c3c;
}

.modal-body p {
    margin-bottom: 25px;
    color: #34495e;
    font-size: 1.1rem;
}

.send-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.send-btn {
    padding: 15px 25px;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 180px;
    justify-content: center;
}

.whatsapp-btn {
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: white;
}

.whatsapp-btn:hover {
    background: linear-gradient(135deg, #128C7E, #25D366);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
}

.telegram-btn {
    background: linear-gradient(135deg, #0088cc, #005580);
    color: white;
}

.telegram-btn:hover {
    background: linear-gradient(135deg, #005580, #0088cc);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 136, 204, 0.3);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(50px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .send-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .send-btn {
        width: 100%;
        max-width: 250px;
    }
}
`;

// دالة إرسال الرسالة عبر WhatsApp
function sendToWhatsApp(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // تنسيق الرسالة
    const whatsappMessage = `
🌟 *رسالة جديدة من موقع TeaTime*

👤 *الاسم:* ${name}
📧 *البريد الإلكتروني:* ${email}
📱 *رقم الهاتف:* ${phone || 'غير محدد'}
🔧 *نوع الخدمة:* ${service || 'غير محدد'}

💬 *الرسالة:*
${message}

---
تم الإرسال من موقع TeaTime
    `.trim();
    
    // إنشاء رابط WhatsApp
    const whatsappURL = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // فتح WhatsApp في نافذة جديدة
    window.open(whatsappURL, '_blank');
}

// دالة إرسال الرسالة عبر Telegram
function sendToTelegram(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // تنسيق الرسالة
    const telegramMessage = `
🌟 رسالة جديدة من موقع TeaTime

👤 الاسم: ${name}
📧 البريد الإلكتروني: ${email}
📱 رقم الهاتف: ${phone || 'غير محدد'}
🔧 نوع الخدمة: ${service || 'غير محدد'}

💬 الرسالة:
${message}

---
تم الإرسال من موقع TeaTime
    `.trim();
    
    // إنشاء رابط Telegram
    const telegramURL = `https://t.me/${CONTACT_CONFIG.telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;
    
    // فتح Telegram في نافذة جديدة
    window.open(telegramURL, '_blank');
}

// دالة معالجة إرسال النموذج المحدثة
function handleFormSubmission(e) {
    e.preventDefault();
    
    // الحصول على بيانات النموذج
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // التحقق من صحة البيانات
    if (!name || !email || !message) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // عرض خيارات الإرسال للمستخدم
    showSendOptions(formData);
}

// دالة عرض خيارات الإرسال
function showSendOptions(formData) {
    // إنشاء نافذة منبثقة لاختيار طريقة الإرسال
    const modal = document.createElement('div');
    modal.className = 'send-options-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>اختر طريقة الإرسال</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>كيف تريد إرسال رسالتك؟</p>
                <div class="send-buttons">
                    <button class="send-btn whatsapp-btn" data-action="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        إرسال عبر WhatsApp
                    </button>
                    <button class="send-btn telegram-btn" data-action="telegram">
                        <i class="fab fa-telegram"></i>
                        إرسال عبر Telegram
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة مستمعات الأحداث
    const closeBtn = modal.querySelector('.close-modal');
    const whatsappBtn = modal.querySelector('.whatsapp-btn');
    const telegramBtn = modal.querySelector('.telegram-btn');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    whatsappBtn.addEventListener('click', () => {
        sendToWhatsApp(formData);
        document.body.removeChild(modal);
        showNotification('تم فتح WhatsApp! يمكنك الآن مراجعة الرسالة وإرسالها', 'success');
    });
    
    telegramBtn.addEventListener('click', () => {
        sendToTelegram(formData);
        document.body.removeChild(modal);
        showNotification('تم فتح Telegram! يمكنك الآن مراجعة الرسالة وإرسالها', 'success');
    });
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// دالة التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// دالة التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// دالة عرض الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // تنسيق الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    }
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 4 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// تطبيق النموذج المحدث
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // إضافة مستمع الأحداث الجديد
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // إضافة CSS للنافذة المنبثقة
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = modalCSS;
            document.head.appendChild(style);
        }
        
        // التحقق من صحة الحقول في الوقت الفعلي
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// دالة التحقق من صحة الحقول
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '#e1e8ed';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== باقي الدوال الأصلية =====

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize animations
function initializeAnimations() {
    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedScroll = debounce(function() {
    // Scroll-based animations that don't need to run on every scroll event
}, 100);

const throttledScroll = throttle(function() {
    // Critical scroll-based functionality that needs frequent updates
}, 16);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('scroll', throttledScroll);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        validateField,
        debounce,
        throttle
    };
}

