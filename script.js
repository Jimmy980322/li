// 联系按钮功能
document.getElementById('contactBtn').addEventListener('click', function() {
    alert('请通过以下方式联系我：\n邮箱: liqingsong.dabendan@123.com\n微信号: liqingsong_dabendan');
});

// 照片轮播功能
const carousel = document.querySelector('.carousel-container');
const images = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
let currentIndex = 0;

// 克隆第一张和最后一张图片
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

// 将克隆的图片添加到轮播中
carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, images[0]);

// 更新轮播容器的样式
carousel.style.transform = `translateX(-100%)`;

function showImage(index) {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${(index + 1) * 100}%)`;
}

function moveToImage(index) {
    showImage(index);
    currentIndex = index;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        moveToImage(currentIndex - 1);
    } else {
        moveToImage(images.length - 1);
        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${images.length * 100}%)`;
        }, 500);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        moveToImage(currentIndex + 1);
    } else {
        moveToImage(0);
        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-100%)`;
        }, 500);
    }
});

// 自动轮播
setInterval(() => {
    if (currentIndex < images.length - 1) {
        moveToImage(currentIndex + 1);
    } else {
        moveToImage(0);
        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-100%)`;
        }, 500);
    }
}, 1000);  // 将间隔时间从5000毫秒改为1000毫秒，即1秒

// 处理过渡结束事件
carousel.addEventListener('transitionend', () => {
    if (currentIndex === -1) {
        carousel.style.transition = 'none';
        currentIndex = images.length - 1;
        carousel.style.transform = `translateX(-${(images.length) * 100}%)`;
    } else if (currentIndex === images.length) {
        carousel.style.transition = 'none';
        currentIndex = 0;
        carousel.style.transform = `translateX(-100%)`;
    }
});

// AI对话功能
const aiChatBtn = document.getElementById('aiChatBtn');
const aiChatModal = document.getElementById('aiChatModal');
const chatCloseBtn = aiChatModal.querySelector('.close');
const chatWindow = document.getElementById('chatWindow');

// 在文件顶部添加这些函数
function showModal(modal) {
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function hideModal(modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
}

aiChatBtn.addEventListener('click', () => {
    // 清除之前的对话内容
    chatWindow.innerHTML = '';
    showModal(aiChatModal);
});

chatCloseBtn.addEventListener('click', () => {
    hideModal(aiChatModal);
});

// 替换原有的微信图标点击功能代码
const socialIcons = document.querySelectorAll('.social-icon');
const customModal = document.getElementById('customModal');
const modalImage = document.getElementById('modalImage');
const modalText = document.getElementById('modalText');
const closeBtns = document.getElementsByClassName('close');

let scale = 1;
const ZOOM_SPEED = 0.1;

socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        let imageSrc, text;
        switch(this.querySelector('i').className) {
            case 'fab fa-weixin':
                imageSrc = 'images/eKpNdDi.jpg';
                text = '微信号：liqingsong_dabendan';
                break;
            case 'fab fa-qq':
                imageSrc = 'images/OIP.jpg';
                text = 'QQ号：12354576878';
                break;
            case 'fab fa-linkedin':
                imageSrc = 'images/R (1).jpg';
                text = 'LinkedIn: jksdlif';
                break;
            case 'fab fa-whatsapp':
                imageSrc = 'images/R.jpg';
                text = 'WhatsApp: sladjfojsdo';
                break;
        }
        modalImage.src = imageSrc;
        modalText.textContent = text;
        showModal(customModal);
        scale = 1; // 重置缩放比例
        modalImage.style.transform = `scale(${scale})`;
    });
});

// 添加鼠标滚轮缩放功能
customModal.addEventListener('wheel', function(e) {
    e.preventDefault(); // 阻止默认的滚动行为

    const delta = Math.sign(e.deltaY);
    scale -= delta * ZOOM_SPEED;
    scale = Math.min(Math.max(0.5, scale), 3); // 限制缩放范围在 0.5 到 3 之间

    modalImage.style.transform = `scale(${scale})`;
});

// 头像点击放大功能
const avatarImage = document.getElementById('avatarImage');

avatarImage.addEventListener('click', function() {
    modalImage.src = this.src;
    modalText.textContent = '李青松的头像';
    showModal(customModal);
    scale = 1; // 重置缩放比例
    modalImage.style.transform = `scale(${scale})`;
});

// 保留原有的关闭按钮功能代码
for (let closeBtn of closeBtns) {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            hideModal(modal);
        }
    });
}

// 保留原有的点击模态框外部关闭功能代码
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target);
    }
});

document.getElementById('sendBtn').addEventListener('click', sendMessage);

// 添加键盘事件监听器
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // 防止表单提交
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput');
    
    if (userInput.value.trim() !== '') {
        // 显示用户消息
        chatWindow.innerHTML += `<p><strong>You:</strong> ${userInput.value}</p>`;
        
        // 固定的AI回复
        setTimeout(() => {
            chatWindow.innerHTML += `<p><strong>AI:</strong> 好的，我知道你是猪了，别再问我了！！！</p>`;
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);

        userInput.value = '';
    }
}

// 收集访客信息
document.getElementById('visitorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('visitorName').value;
    const phone = document.getElementById('visitorPhone').value;
    const email = document.getElementById('visitorEmail').value;

    // 这里应该将信息发送到服务器
    console.log('Visitor info:', { name, phone, email });
    alert('感谢您提供信息！');
    this.reset();
});

// 确保在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 更新AI对话按钮文本
    const aiChatBtn = document.getElementById('aiChatBtn');
    if (aiChatBtn) {
        aiChatBtn.textContent = '来撩我';
    }

    // 确保所有模态框初始状态为隐藏
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });

    console.log('DOM fully loaded and parsed');
});