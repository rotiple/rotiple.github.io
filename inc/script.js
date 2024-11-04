document.addEventListener('copy', (event) => {
    event.preventDefault();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('animationContainer').style.display = 'none';
        document.body.style.backgroundColor = '#ffffff'; // 청첩장 페이지 배경을 흰색으로 변경
        document.getElementById('invitationContent').style.display = 'block';
    }, 4000);
});

