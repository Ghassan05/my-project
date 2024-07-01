let currentGroupIndex = 0;
let groups = [
    'Pet Animals', 'Vehicles', 'Toys', 'Shoes', 'Forests', 'Sweets', 'Fruits', 
    'Aquatic Animals', 'Birds', 'Clothing', 'Electronics', 'Gardens', 
    'School Supplies', 'Sports', 'The Four Seasons', 'Insects',
    'Space', 'Cakes and Cookies', 'Musical Instruments', 'Castles and Princesses', 
    'Pirates and Treasures', 'Robots', 'Cartoons and Fantasy Characters', 
    'Tourist Attractions'
];

let phrases = {
    'Pet Animals': 'Choose Your Pet! Which furry friend would you love to take home?',
    'Vehicles': 'Pick Your Ride! Which vehicle would you like to go on an adventure with?',
    'Toys': 'Select Your Toy! Which toy would you play with all day?',
    'Shoes': 'Choose Your Shoes! Which pair would you wear for your next big day at school?',
    'Forests': 'Explore the Forest! Which part of this magical forest would you visit?',
    'Sweets': 'Sweet Treats! Which dessert would you pick for a special treat?',
    'Fruits': 'Fruit Basket! Which delicious fruit would you snack on today?',
    'Aquatic Animals': 'Ocean Friends! Which sea creature would you like to meet underwater?',
    'Birds': 'Bird Buddies! Which of these birds would you choose as a feathered friend?',
    'Clothing': 'Fashion Fun! Which outfit would you wear to a party?',
    'Electronics': 'Tech Time! Which device would you use to play your favorite game?',
    'Gardens': 'Garden Adventure! Which part of this garden would you explore first?',
    'School Supplies': 'School Ready! Which of these will you pack in your school bag?',
    'Sports': 'Game On! Which sport would you play today?',
    'The Four Seasons': 'Seasonal Wonders! Which season do you love the most?',
    'Insects': 'Insect World! Which of these insects fascinates you the most?',
    'Space': 'Space Voyage! Which planet or star would you visit?',
    'Cakes and Cookies': 'Bakery Bliss! Which sweet delight would you choose?',
    'Musical Instruments': 'Musical Magic! Which instrument would you love to play?',
    'Castles and Princesses': 'Royal Quest! Which castle would you rule as king or queen?',
    'Pirates and Treasures': 'Pirate Adventure! Which treasure would you hunt for?',
    'Robots': 'Robot Workshop! Which robot would you like to build or fix?',
    'Cartoons and Fantasy Characters': 'Character Carnival! Which cartoon or fantasy character would you like to meet?',
    'Tourist Attractions': 'Travel Dreams! Which famous landmark would you visit?'
};

function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    const numDots = 100; // عدد النقاط التي تريد إنشاءها
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 5 + 5}s`;
        dot.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        dotsContainer.appendChild(dot);
    }
}

function startCountdown(duration, callback) {
    const countdownBar = document.getElementById('countdown-bar');
    const timerSound = document.getElementById('timer-sound');
    let count = duration;
    const startWidth = countdownBar.parentElement.clientWidth;
    timerSound.currentTime = 0; // إعادة ضبط الصوت ليبدأ من البداية
    timerSound.play();

    const interval = setInterval(() => {
        if (count > 0) {
            count--;
            const newWidth = (count / duration) * startWidth;
            countdownBar.style.width = `${newWidth}px`;
        } else {
            clearInterval(interval);
            countdownBar.style.width = '0%';
            timerSound.pause(); // إيقاف صوت المؤقت
            callback(); // تنفيذ الوظيفة المعطاة عند انتهاء العد التنازلي
        }
    }, 1000);
}

function rotateBoxes(callback) {
    const containers = document.querySelectorAll('.glitter-container');
    containers.forEach((container, index) => {
        setTimeout(() => {
            container.classList.add('hidden'); // إضافة فئة لإخفاء الصندوق مع تأثيرات انتقالية
            const bubbleSound = document.getElementById('bubble-sound');
            bubbleSound.currentTime = 0; // إعادة ضبط الصوت ليبدأ من البداية
            bubbleSound.play();
            setTimeout(() => {
                callback(container, index);
            }, 500); // الانتظار حتى يكتمل التحول قبل عرض الصورة
        }, index * 1000); // تطبيق تأخير 1 ثانية بين كل صندوق والآخر
    });
}

function showImages(container, index, groupName, nextStep) {
    container.innerHTML = `<img src="images/${groupName}/image${index + 1}.png" alt="Image">`;
    container.classList.remove('hidden');
    container.classList.add('visible'); // إضافة فئة لإظهار الصندوق مع تأثيرات انتقالية
    
    setTimeout(() => {
        container.style.transform = 'rotateY(0deg)'; // إعادة الدوران لوضعه الطبيعي بعد عرض الصورة
    }, 250); // تأخير قصير قبل إعادة الدوران

    if (index === 2) {
        setTimeout(() => {
            resetBoxes();
            setTimeout(nextStep, 1000); // تأخير لمدة ثانية قبل الانتقال إلى الخطوة التالية
        }, 4000); // تأخير لمدة 4 ثوانٍ قبل إعادة تعيين الصناديق
    }
}

function resetBoxes() {
    const containers = document.querySelectorAll('.glitter-container');
    containers.forEach((container, index) => {
        container.classList.remove('visible');
        container.classList.add('hidden'); // إضافة فئة لإخفاء الصندوق مع تأثيرات انتقالية
        setTimeout(() => {
            container.innerHTML = `<img src="box${index + 1}.png" alt="Box ${index + 1}">`;
            container.classList.remove('hidden');
            container.classList.add('visible'); // إعادة تعيين الصندوق مع تأثيرات انتقالية
        }, 500); // تأخير قصير قبل عرض الصورة الأصلية
    });

    // إعادة تعيين النص
    const textContainer = document.getElementById('text-container');
    textContainer.classList.add('hidden');
    setTimeout(() => {
        textContainer.textContent = '';
    }, 500); // تأخير قصير قبل إزالة النص
}

function displayText(groupName) {
    const textContainer = document.getElementById('text-container');
    textContainer.textContent = phrases[groupName] || '';
    textContainer.classList.remove('hidden');
    textContainer.classList.add('visible');
    
    // قراءة النص بصوت عالٍ
    const speech = new SpeechSynthesisUtterance(textContainer.textContent);
    speechSynthesis.speak(speech);
}

function startInitialCountdown() {
    if (currentGroupIndex >= groups.length) {
        currentGroupIndex = 0; // إعادة الدورة
    }
    const currentGroup = groups[currentGroupIndex];
    console.log(`Starting group: ${currentGroup}`); // إضافة سجل للتحقق من اسم المجموعة الحالية
    currentGroupIndex++;

    displayText(currentGroup); // عرض النص عند بدء العد التنازلي

    startCountdown(6, () => {
        rotateBoxes((container, index) => {
            showImages(container, index, currentGroup, startSecondCountdown);
        });
    });
}

function startSecondCountdown() {
    if (currentGroupIndex >= groups.length) {
        currentGroupIndex = 0; // إعادة الدورة
    }
    const currentGroup = groups[currentGroupIndex];
    console.log(`Starting group: ${currentGroup}`); // إضافة سجل للتحقق من اسم المجموعة الحالية
    currentGroupIndex++;

    displayText(currentGroup); // عرض النص عند بدء العد التنازلي

    startCountdown(7, () => {
        rotateBoxes((container, index) => {
            showImages(container, index, currentGroup, startInitialCountdown);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    startInitialCountdown();
});
