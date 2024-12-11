rurl = "https://장형석남채린결혼합니다.메인.한국"

document.addEventListener('DOMContentLoaded', () => {
    const cases = {
        1: '\n저희 잘 살겠습니다!\n키워주셔서 감사합니다!',
        2: '\n나 장가간다!',
        3: '\n나 시집간다!',
        4: '\n저 장가가요!',
        5: '\n저 시집가요!',
        6: '\n저희 결혼합니다!',
        7: '\n우리 아들 장가간다!',
        8: '\n우리 딸 시집간다!',
        9: ''
    };

    const messagePreview = document.getElementById('messagePreview');
    const customMessage = document.getElementById('customMessage');
    const copyButton = document.getElementById('copyButton');
    const kakaoShareButton = document.getElementById('kakaoShareButton');

    // Radio 버튼 변경 시 미리보기 업데이트
    document.querySelectorAll('input[name="case"]').forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    customMessage.addEventListener('input', updatePreview);

    function updatePreview() {
        const selectedCase = document.querySelector('input[name="case"]:checked').value;
        const baseMessage = cases[selectedCase];
        const customText = customMessage.value.trim();
        messagePreview.textContent = `${customText} ${baseMessage}`;
    }

    // 복사 기능 (Base64 인코딩된 URL 복사)
    copyButton.addEventListener('click', () => {
        const selectedCase = document.querySelector('input[name="case"]:checked').value;
        const encodedMessage = encodeBase64(customMessage.value.trim());
        const url = `${rurl}?n=${encodedMessage}&t=${selectedCase}`;

        navigator.clipboard.writeText(url).then(() => {
            showToast('URL이 복사되었습니다!');
        }).catch(() => {
            fallbackCopyTextToClipboard(url);
            showToast('URL 복사 실패! 수동으로 복사해주세요.');
        });
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    Kakao.init('b693b30df0a49a177c175e119c6efd59');
    document.getElementById('kakaoShareButton').addEventListener('click', () => {
        const customMessage = document.getElementById('customMessage').value.trim();
        const selectedCase = document.querySelector('input[name="case"]:checked').value;
        const encodedMessage = encodeBase64(customMessage);

        Kakao.Share.sendCustom({
            templateId: 114037,
            templateArgs: {
                name: encodedMessage,
                type: selectedCase
            }
        });
    });
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message; // 메시지 설정
    toast.className = 'show'; // Toast 표시
    setTimeout(() => {
        toast.className = toast.className.replace('show', ''); // 일정 시간 후 숨김
    }, 1500); // 3초 후 제거
}

// Base64 인코딩된 메시지
function encodeBase64(str) {
    return encodeURIComponent(btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode('0x' + p1))));
}