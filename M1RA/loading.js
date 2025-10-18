document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    const bodyElement = document.querySelector('body');
    
    // 初期状態ではスクロールを無効化
    bodyElement.style.overflow = 'hidden';
    
    // 進行状況を追跡する変数
    let progress = 0;
    const totalResources = document.querySelectorAll('img').length + 5; // 画像 + CSS + フォントなど
    let loadedResources = 0;
    
    // リソースが読み込まれるたびに進行状況を更新
    function updateProgress() {
        loadedResources++;
        progress = Math.min((loadedResources / totalResources) * 100, 100);
        progressBar.style.width = `${progress}%`;
        
        // すべてのリソースが読み込まれたか、または10秒経過したらローディング画面を非表示
        if (progress >= 100) {
            hideLoadingScreen();
        }
    }
    
    // 画像の読み込みを追跡
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            updateProgress();
        } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress); // エラー時も進める
        }
    });
    
    // 一定間隔で進行状況を更新（バックアップとして）
    const progressInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            hideLoadingScreen();
        }
    }, 300);
    
    // 最大10秒後には強制的に非表示
    setTimeout(() => {
        hideLoadingScreen();
    }, 10000);
    
    // ローディング画面を非表示にする関数
    function hideLoadingScreen() {
        loadingScreen.classList.add('loading-hidden');
        bodyElement.style.overflow = 'auto'; // スクロールを有効化
    }
    
    // 桜の花びらを追加アニメーション（画面背景用）
    function createSakuraPetals() {
        const sakuraPetalsContainer = document.querySelector('.sakura-petals-bg');
        if (!sakuraPetalsContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal-bg');
            
            // ランダムなスタイルを設定
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDelay = `${Math.random() * 10}s`;
            petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
            petal.style.opacity = Math.random() * 0.6 + 0.2;
            petal.style.transform = `scale(${Math.random() * 0.6 + 0.5})`;
            
            sakuraPetalsContainer.appendChild(petal);
        }
    }
    
    // 桜の花びらを作成
    createSakuraPetals();
});
