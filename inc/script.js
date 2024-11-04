document.addEventListener('copy', (event) => {
    event.preventDefault();
});

window.addEventListener('load', () => {
    const video = document.getElementById('introVideo');
    const animationContainer = document.getElementById('animationContainer');
    const dateElement = document.querySelector('.date');
    const invitationContent = document.getElementById('invitationContent');

    video.addEventListener('ended', () => {
        // 비디오에 fade-out 클래스 추가하여 서서히 사라지게 함
        video.classList.add('fade-out');

        // 비디오가 완전히 사라진 후 display를 none으로 설정
        setTimeout(() => {
            video.style.display = 'none';
            
            // 애니메이션 컨테이너를 보이도록 설정하고 애니메이션 시작
            animationContainer.style.display = 'flex';
        }, 3000); // fade-out 애니메이션의 지속 시간과 동일하게 설정
    });

    // 애니메이션 컨테이너가 끝난 후 초대장 페이지로 전환
    setTimeout(() => {
        animationContainer.style.display = 'none';
        dateElement.style.display = 'none'; // date 요소도 숨김
        document.body.style.backgroundColor = '#ffffff'; // 초대장 배경을 흰색으로 변경
        invitationContent.style.display = 'block';
    }, 7000); // 전체 애니메이션 시간 (비디오 fade-out 후 + 애니메이션 지속 시간)
});


