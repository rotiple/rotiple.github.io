document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('n') ? decodeURIComponent(params.get('n')) : null;
    const type = params.get('t');

    let message = "WEDDING";
    let letterSpacing = "0.3em";
    let fontFamily = "American Captain Condensed Light, sans-serif";
    let fontSize = "12vw"; // 기본 폰트 크기
    let delay = 0.4;
    const animationContainer = document.getElementById('text1');

    if (name && type) {
        fontFamily = "'Hakgyoansim Badasseugi B', sans-serif";
        letterSpacing = "0.1em";
        delay = 0.2;
        switch (type) {
            case '1':
                message = `${name} 저희 잘 살겠습니다!\n키워주셔서 감사합니다!`;
                fontSize = "8vw";
                break;
            case '2':
                message = `${name}\n나 장가간다!`;
                fontSize = "10vw";
                break;
            case '3':
                message = `${name}\n나 시집간다!`;
                fontSize = "10vw";
                break;
			case '4':
				message = `${name}\n저 장가가요!`;
				fontSize = "10vw";
				break;
			case '5':
				message = `${name}\n저 시집가요!`;
				fontSize = "10vw";
				break;
            case '6':
                message = `${name}\n저희 결혼합니다!`;
                fontSize = "9vw";
                break;
            default:
                message = "WEDDING";
                fontFamily = "'American Captain Condensed Light', sans-serif";
                letterSpacing = "0.2em";
        }
    }

    animationContainer.innerHTML = "";
    animationContainer.style.letterSpacing = letterSpacing;
    animationContainer.style.fontFamily = fontFamily;
    animationContainer.style.fontSize = fontSize;

    // 인덱스를 전체 문자의 위치 기준으로 관리
    let charIndex = 0;

    message.split('\n').forEach((line, lineIndex) => {
        [...line].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${charIndex * delay}s`;
            animationContainer.appendChild(span);
            charIndex++; // 전체 문자 기준 인덱스 증가
        });

        // 줄바꿈 추가
        if (lineIndex < message.split('\n').length - 1) {
            const br = document.createElement('br');
            animationContainer.appendChild(br);
            charIndex++; // 줄바꿈도 딜레이에 포함
        }
    });

    document.querySelector('.text span:last-child').addEventListener('animationend', () => {
        setTimeout(() => {
            document.getElementById('animationContainer').style.display = 'none';
            document.body.style.backgroundColor = '#ffffff';
            document.getElementById('invitationContent').style.display = 'block';
        }, 1000);
    });
});
	
// 결혼식 날짜 설정 (2025년 2월 16일)
const weddingDate = new Date('2025-02-16'); // 또는 new Date(2025, 1, 16);

// 오늘 날짜 가져오기
const today = new Date();

// 날짜 차이 계산
const timeDifference = weddingDate - today;
const ddaysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

// 남은 일수를 DOM에 추가
document.querySelector('.dday-container .days').textContent = ddaysLeft;

// gallery

// 더보기 버튼 클릭 시 숨겨진 이미지 보이기
moreButton.addEventListener("click", () => {
    document.querySelectorAll(".gallery-item.hidden").forEach(item => {
        item.classList.remove("hidden");
    });
    moreButton.style.display = "none"; // 더보기 버튼 숨김
});

// modal
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const swiperModal = document.getElementById('swiperModal');
    const closeSwiperModal = document.querySelector('.close-swiper-modal');

    let swiper;

    function openSwiperModal(index) {
        swiperModal.style.display = 'flex';

        if (!swiper) {
            initializeSwiper(index);
        } else {
            swiper.slideTo(index, 0);
        }
    }

    function closeModal() {
        swiperModal.style.display = 'none';
    }

    function initializeSwiper(startIndex) {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = ''; // 기존 슬라이드 제거

        galleryItems.forEach((item) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        swiper = new Swiper('.swiper', {
            initialSlide: startIndex,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
            // centeredSlides: true,
            // zoom: true,
            // spaceBetween: 30,
            effect: 'slide', // 여기서 효과를 선택 (slide, fade, cube, coverflow, flip)
            fadeEffect: {
                crossFade: true, // 페이드 효과에서 부드럽게 전환
            },
        });
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openSwiperModal(index));
    });

    closeSwiperModal.addEventListener('click', closeModal);

    // Swiper 컨테이너 내부 클릭 처리
    swiperModal.addEventListener('click', (event) => {
        // 클릭된 대상이 Swiper(사진 영역)가 아니라면 모달 닫기
        if (!event.target.closest('.swiper-slide img') && !event.target.closest('.swiper-button-next') && !event.target.closest('.swiper-button-prev')) {
            closeModal();
        }
    });
});


document.addEventListener('copy', (event) => {
    event.preventDefault();
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('selectstart', (event) => {
    event.preventDefault();
});

document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;

document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// 공유
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message; // 메시지 설정
    toast.className = 'show'; // Toast 표시
    setTimeout(() => {
        toast.className = toast.className.replace('show', ''); // 일정 시간 후 숨김
    }, 3000); // 3초 후 제거
}

document.addEventListener('DOMContentLoaded', () => {
    // 'copy-link'와 'copy-address-button' 모두 선택
    const copyButtons = document.querySelectorAll('.copy-account-button, #copy-link, .copy-address-button');

    copyButtons.forEach(copyButton => {
        copyButton.addEventListener('click', () => {
            const textToCopy = copyButton.getAttribute('data-clipboard-text');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('복사되었습니다!!');
                }).catch(err => {
                    fallbackCopyTextToClipboard(textToCopy);
                    showToast('복사되었습니다!!');
                });
            }
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
});

Kakao.init('b693b30df0a49a177c175e119c6efd59');
document.getElementById('kakao-share').addEventListener('click', () => {
    Kakao.Share.sendCustom({
        templateId: 114037
    });
});

function startStaticCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown(); // 첫 호출
    setInterval(updateCountdown, 1000); // 매초 업데이트
}

// 타겟 날짜 설정 (예: 2025년 2월 16일 11:00)
const targetDate = new Date('2025-02-16T11:00:00').getTime();
startStaticCountdown(targetDate);

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

document.getElementById('toggle-map-button').addEventListener('click', function() {
    const naverMapContainer = document.getElementById('naver-map-container');
    const mapImageContainer = document.getElementById('map-image-container');
    const toggleButton = document.getElementById('toggle-map-button');
    
    if (naverMapContainer.style.display === 'none') {
        naverMapContainer.style.display = 'block';
        mapImageContainer.style.display = 'none';
        toggleButton.textContent = '약도보기';
    } else {
        naverMapContainer.style.display = 'none';
        mapImageContainer.style.display = 'block';
        toggleButton.textContent = '지도보기';
    }
});

// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 15,
    minSize: 10,
    newOn: 400
};

// 벚꽃 영역 크기를 저장할 변수
var $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 벚꽃 잎 생성
const $petal = $('<span class="petal"></span>');

// 랜덤 회전 값을 생성하는 함수
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 60 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// 무작위 흔들림 애니메이션 배열 생성
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

// 특정 요소에 흔들림 애니메이션 적용
const applySwayAnim = (element) => {
    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);
    setTimeout(() => {
        applySwayAnim(element);
    }, 1000);
};

// 벚꽃 잎 생성 함수
const petalGen = () => {
    setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startPosLeft = Math.random() * wrapW;
    const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
    const horizontalOffset = Math.random() * 2 - 1;

    // 애니메이션 끝나면 제거
    petal.on('animationend', () => {
        petal.remove();
    }).css({
        width: size,
        height: size,
        left: startPosLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear`
    }).appendTo($wrap);

    // 위치 업데이트 함수
    const updatePos = () => {
        petal.css('left', `+=${horizontalOffset}`);
        requestAnimationFrame(updatePos);
    };

    updatePos();
    applySwayAnim(petal);
};

// 창 크기가 변경될 때 영역 크기 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 로딩 완료 후 벚꽃 잎 생성 시작
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});
