
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 60; // كلما قل الرقم زادت سرعة العداد

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        // حساب مقدار الزيادة في كل خطوة
        const inc = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = count + inc > target ? target : count + inc;
            setTimeout(() => startCounter(counter), 20);
        } else {
            counter.innerText = target;
        }
    };

    // استخدام IntersectionObserver لتشغيل العداد فقط عندما يراه المستخدم على الشاشة
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentCounter = entry.target;
                startCounter(currentCounter);
                observer.unobserve(currentCounter); // إيقاف المراقبة بعد التفعيل لمرة واحدة
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

// ملف main.js
const scrollBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";
        scrollBtn.style.transform = "translateY(0)";
    } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";
        scrollBtn.style.transform = "translateY(20px)";
    }
};

scrollBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});