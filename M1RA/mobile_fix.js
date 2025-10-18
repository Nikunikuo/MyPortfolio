// モバイル表示でのレイアウト問題を修正するスクリプト
document.addEventListener('DOMContentLoaded', function() {
    // モバイル環境かどうかを検出
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // モバイルでのスクロール問題を修正
    function fixMobileLayout() {
        if (isMobile()) {
            // セクション間の高さと位置を強制的に調整
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.position = 'static';
                section.style.transform = 'none';
                section.style.zIndex = 'auto';
            });
            
            // ABOUTセクションとメッセージセクションの間隔を調整
            const heroSection = document.querySelector('.hero');
            const aboutSection = document.querySelector('#about');
            const messageSection = document.querySelector('.mira-message-section');
            
            if (heroSection && messageSection) {
                // メッセージセクションにパディングを追加
                messageSection.style.paddingBottom = '40px';
                // セクション区切りの表示を確認
                const divider = document.querySelector('#about-divider');
                if (divider) {
                    divider.style.marginTop = '60px';
                    divider.style.marginBottom = '60px';
                }
            }
            
            if (aboutSection) {
                // ABOUTセクションの位置を固定
                aboutSection.style.position = 'relative';
                aboutSection.style.top = 'auto';
                aboutSection.style.left = 'auto';
                aboutSection.style.marginTop = '60px';
                aboutSection.style.paddingTop = '40px';
                aboutSection.style.background = '#111';
                aboutSection.style.zIndex = '10';
            }
        }
    }
    
    // 初期ロード時に実行
    fixMobileLayout();
    
    // リサイズ時にも実行
    window.addEventListener('resize', fixMobileLayout);
    
    // スクロール時にも位置を調整
    window.addEventListener('scroll', function() {
        if (isMobile()) {
            const aboutSection = document.querySelector('#about');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // スクロール位置に応じてABOUTセクションの位置を調整
            if (aboutSection && scrollTop > 300) {
                aboutSection.style.position = 'relative';
                aboutSection.style.top = 'auto';
            }
        }
    });
});
