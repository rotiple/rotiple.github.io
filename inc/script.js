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
const weddingDate = new Date('2025-2-16');

// 오늘 날짜 가져오기
const today = new Date();

// 날짜 차이 계산
const timeDifference = weddingDate - today;
const ddaysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

// 남은 일수를 DOM에 추가
document.querySelector('.dday-container .days').textContent = ddaysLeft;

// // == Settings ==
// const typeCountdown = 'date'; // 'time' to set the countdown to a specific time or 'date' to set the countdown to the designated date

// let EndDate = '2025/02/16, 11:00'; // Expiration Date yyyy/mm/dd, hh:mm. Working only if typeCountdown = 'date'

// const ColorDigitEnd = '#bfbfbf';
// // == Settings END ==

// let hours, minutes, target_date, ExpirationDate;
// let formatCountdown = null;
// let day_lang = hour_lang = minute_lang = second_lang = '';

// // Format countdown based on the remaining time
// function daysLeft(target) {
//     if (target > (24 * 60 * 60 * 1000)) {
//         formatCountdown = 'day|hour|minute|second';
//     } else if (target > (60 * 60 * 1000)) {
//         formatCountdown = 'hour|minute|second';
//     } else {
//         formatCountdown = 'minute|second';
//     }
// }

// // Set the target date and determine formatCountdown
// if (typeCountdown === 'date') {
//     ExpirationDate = new Date(EndDate);
//     target_date = (ExpirationDate - new Date());
//     daysLeft(target_date);
//     target_date += new Date().getTime();
// } else {
//     target_date = 0;
//     formatCountdown = 'day|hour|minute|second';
// }

// // Language settings
// day_lang = 'Days';
// hour_lang = 'Hours';
// minute_lang = 'Minutes';
// second_lang = 'Seconds';

// // Countdown class and related methods...
// class Countdown {
// 	get TIMESTAMP_SECOND() { return 1000; }
// 	get TIMESTAMP_MINUTE() { return 60 * this.TIMESTAMP_SECOND; }
// 	get TIMESTAMP_HOUR() { return 60 * this.TIMESTAMP_MINUTE; }
// 	get TIMESTAMP_DAY() { return 24 * this.TIMESTAMP_HOUR; }

// 	constructor(userOptions) {
// 		this.options = {
// 			cont: null,
// 			countdown: true,
// 			endDate: {
// 				day: 0,
// 				hour: 0,
// 				minute: 0,
// 				second: 0 },
// 			endCallback: null,
// 			outputFormat: formatCountdown,
// 			outputTranslation: {
// 				day: day_lang,
// 				hour: hour_lang,
// 				minute: minute_lang,
// 				second: second_lang }
// 		};

//     this.lastTick = null;
//     this.intervalsBySize = ['day', 'hour', 'minute', 'second'];
//     this.interval = null;
//     this.digitConts = {};
//     this._assignOptions(this.options, userOptions);
// 	}

//   start() {
// 		let endDate, endDateData;
//     this._fixCompatibility();

//     endDate = this._getDate(this.options.endDate);
//     endDateData = this._prepareTimeByOutputFormat(endDate);

//     this._writeData(endDateData);
//     this.lastTick = endDateData;

//     if (this.options.countdown && endDate.getTime() <= Date.now()) {
// 			if (typeof this.options.endCallback === 'function') {
// 				this.stop();
// 				this.options.endCallback();
// 			}
// 		} else {
// 			this.interval = setInterval(() =>
// 				{ this._updateView(this._prepareTimeByOutputFormat(endDate)); },
// 				this.TIMESTAMP_SECOND);
// 		}
// 	}
	
// 	stop() { if (this.interval !== null) { clearInterval(this.interval); }}

// 	_getDate(date) {
// 		if (typeof date === 'object') {
// 			if (date instanceof Date) { return date; }
// 			else {
// 				let expectedValues = {
// 					day: 0,
// 					hour: 0,
// 					minute: 0,
// 					second: 0
// 				};
				
// 				for (let i in expectedValues) {
// 					if (expectedValues.hasOwnProperty(i) && date.hasOwnProperty(i)) { expectedValues[i] = date[i]; }
// 				}
// 				return new Date(expectedValues.day, expectedValues.hour, expectedValues.minute, expectedValues.second);
// 			}
// 		} else if (typeof date === 'number' || typeof date === 'string') { return new Date(date); }
// 		else { return new Date(); }
// 	}

// 	_prepareTimeByOutputFormat(dateObj) {
// 		let usedIntervals, output = {}, timeDiff;
		
// 		usedIntervals = this.intervalsBySize.filter(item => { return this.options.outputFormat.split('|').indexOf(item) !== -1; });
		
// 		timeDiff = this.options.countdown ? dateObj.getTime() - Date.now() : Date.now() - dateObj.getTime();
		
// 		usedIntervals.forEach(item => {
// 			let value;
// 			if (timeDiff > 0) {
// 				switch (item) {
// 					case 'day':
// 						value = Math.trunc(timeDiff / this.TIMESTAMP_DAY);
// 						timeDiff -= value * this.TIMESTAMP_DAY;
// 						break;
// 					case 'hour':
// 						value = Math.trunc(timeDiff / this.TIMESTAMP_HOUR);
// 						timeDiff -= value * this.TIMESTAMP_HOUR;
// 						break;
// 					case 'minute':
// 						value = Math.trunc(timeDiff / this.TIMESTAMP_MINUTE);
// 						timeDiff -= value * this.TIMESTAMP_MINUTE;
// 						break;
// 					case 'second':
// 						value = Math.trunc(timeDiff / this.TIMESTAMP_SECOND);
// 						timeDiff -= value * this.TIMESTAMP_SECOND;
// 						break;
// 				}
// 			} else {
// 				value = '00';
// 				const elements = document.querySelectorAll('.digit_cont');
// 				for (let i = 0; i < elements.length; i++) { elements[i].style.color = ColorDigitEnd; }
// 			}
// 			output[item] = (('' + value).length < 2 ? '0' + value : '' + value).split('');
// 		});
//     return output;
//   }
	
// 	_fixCompatibility() {
// 		Math.trunc = Math.trunc || function (x) {
// 			if (isNaN(x)) { return NaN; }
// 			if (x > 0) { return Math.floor(x); }
// 			return Math.ceil(x);
// 		};
// 	}

// 	_writeData(data) {
// 		let code = ``, intervalName;
		
// 		for (intervalName in data) {
// 			if (data.hasOwnProperty(intervalName)) {
// 				let element = `<div><div class="interval_cont interval_cont_${intervalName}">`,
//         intervalDescription = `<div class="description"> ${this.options.outputTranslation[intervalName]}</div>`;
        
// 				data[intervalName].forEach((digit, index) => { element += `<div class="digit_cont digit_cont_${index}" id="test">${this._getDigitElementString(digit, 0)}</div>`; });
				
// 				code += element + '</div>' + intervalDescription + '</div>';
// 			}
// 		}
// 		this.options.cont.innerHTML = code;
// 		this.lastTick = data;
// 	}

// 	_getDigitElementString(newDigit, lastDigit) {
// 		return `<div class="last_placeholder"><span>${lastDigit}</span></div>
// 						<div class="new_placeholder">${newDigit}</div>
// 						<div class="last_rotate">${lastDigit}</div>
// 						<div class="new_rotate">
// 							<div class="rotated"><span>${newDigit}</span></div>
// 						</div>`;
	// }

// 	_updateView(data) {
// 		for (let intervalName in data) {
// 			if (data.hasOwnProperty(intervalName)) {
// 				data[intervalName].forEach((digit, index) => {
// 						if (this.lastTick !== null
// 								&& this.lastTick[intervalName][index]
// 								!== data[intervalName][index])
// 						{
// 							this._getDigitCont(intervalName, index).innerHTML = this._getDigitElementString(data[intervalName][index], this.lastTick[intervalName][index]);
// 						}
// 				});
// 			}
// 		}
// 		this.lastTick = data;
// 	}

// 	_getDigitCont(intervalName, index) {
// 		if (!this.digitConts[`${intervalName}_${index}`]) {
// 			this.digitConts[`${intervalName}_${index}`] = this.options.cont.querySelector(`.interval_cont_${intervalName} .digit_cont_${index}`);
// 		}
// 		return this.digitConts[`${intervalName}_${index}`];
// 	}

// 	_assignOptions(options, userOptions) {
// 		for (let i in options) {
// 			if (options.hasOwnProperty(i) && userOptions.hasOwnProperty(i)) {
// 				if (options[i] !== null && typeof options[i] === 'object' && typeof userOptions[i] === 'object') {
// 					this._assignOptions(options[i], userOptions[i]);
// 				}
// 				else { options[i] = userOptions[i]; }
// 			}
// 		}
// 	}
// }

// let cd = new Countdown({
//   cont: document.querySelector('.flip-countdown'),
//   endDate: target_date,
//   outputTranslation: {
// 		day: day_lang,
// 		hour: hour_lang,
// 		minute: minute_lang,
// 		second: second_lang },
//   endCallback: null,
//   outputFormat: formatCountdown
// });
// cd.start();

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
