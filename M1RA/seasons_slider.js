document.addEventListener('DOMContentLoaded', function() {
    // スライダー要素
    const slider = document.querySelector('.seasons-slider');
    const slides = document.querySelectorAll('.season-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    // グリッチエフェクトの設定
    slides.forEach(slide => {
        slide.classList.add('glitch-effect');
    });
    
    // 現在のスライド
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    let glitchInterval;
    
    // スライダーを初期化
    function initSlider() {
        updateSlider();
        addEventListeners();
        startAutoplay();
        startRandomGlitches();
    }
    
    // ランダムにグリッチエフェクトを発生させる
    function startRandomGlitches() {
        // 8秒〜15秒のランダムな間隔でグリッチエフェクトを発生させる
        function triggerGlitch() {
            // 現在アクティブなスライドにグリッチエフェクトを適用
            slides[currentSlide].classList.add('active-glitch');
            
            // 0.6秒後にグリッチエフェクトを削除
            setTimeout(() => {
                slides[currentSlide].classList.remove('active-glitch');
                
                // 次のグリッチを設定
                const nextGlitchDelay = Math.floor(Math.random() * 7000) + 8000; // 8秒〜15秒
                setTimeout(triggerGlitch, nextGlitchDelay);
            }, 600);
        }
        
        // 最初のグリッチを設定する
        const initialDelay = Math.floor(Math.random() * 3000) + 2000; // 2秒〜5秒後に最初のグリッチ
        setTimeout(triggerGlitch, initialDelay);
    }
    
    // スライドを更新
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // アニメーションエフェクトを追加
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active-slide');
                // アクティブなスライドのheaderとdescriptionのアニメーションをリセット
                const header = slide.querySelector('.season-header');
                const description = slide.querySelector('.season-description');
                
                if (header) {
                    header.style.animation = 'none';
                    setTimeout(() => {
                        header.style.animation = 'fadeInUp 1s forwards';
                    }, 10);
                }
                
                if (description) {
                    description.style.animation = 'none';
                    setTimeout(() => {
                        description.style.animation = 'fadeInUp 1s forwards';
                        description.style.animationDelay = '0.3s';
                    }, 10);
                }
            } else {
                slide.classList.remove('active-slide');
            }
        });
        
        // アクティブなドットを更新
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 前のスライドに移動
    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoplay();
    }
    
    // 次のスライドに移動
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetAutoplay();
    }
    
    // 特定のスライドに移動
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoplay();
    }
    
    // 自動再生を開始
    function startAutoplay() {
        autoplayInterval = setInterval(goToNextSlide, 6000);
    }
    
    // 自動再生をリセット
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // イベントリスナーを追加
    function addEventListeners() {
        // ドットクリック
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // キーボードイベント
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        });
        
        // タッチスワイプ（モバイル対応）
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // スワイプしきい値
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // 左スワイプ -> 次へ
                goToNextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // 右スワイプ -> 前へ
                goToPrevSlide();
            }
        }
    }
    
    // スライダーを初期化
    initSlider();
});
