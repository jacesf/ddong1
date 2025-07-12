document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const poopButton = document.getElementById('poopButton');
    const timeDisplay = document.getElementById('time');
    const clickCountDisplay = document.getElementById('clickCount');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    const poopImageDisplay = document.getElementById('poopImageDisplay'); // 똥 이미지 표시 영역 가져오기

    let timeLeft = 30; // 게임 시간 (초)
    let clickCount = 0;
    let gameInterval; // 타이머를 위한 변수
    let isGameRunning = false; // 게임 진행 여부

    // 게임 시작 및 재시작 함수
    function startGame() {
        timeLeft = 30;
        clickCount = 0;
        isGameRunning = true;

        timeDisplay.textContent = timeLeft;
        clickCountDisplay.textContent = clickCount;
        messageDisplay.textContent = '클릭하여 쾌변하세요!';
        startButton.style.display = 'none'; // 시작 버튼 숨기기
        poopButton.style.display = 'block'; // 버튼 보이게
        restartButton.style.display = 'none'; // 재시작 버튼 숨기기
        poopButton.disabled = false; // 버튼 활성화
        poopImageDisplay.style.display = 'none'; // 게임 시작 시 똥 이미지 숨기기
        poopImageDisplay.classList.remove('visible'); // visible 클래스 제거

        // 1초마다 타이머 감소
        gameInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000); // 1초 (1000ms)
    }

    // 게임 종료 함수
    function endGame() {
        clearInterval(gameInterval); // 타이머 중지
        isGameRunning = false;
        poopButton.disabled = true; // 버튼 비활성화

        let resultMessage = '';
        if (clickCount === 0) {
            resultMessage = `어어 또또똥이..... 으악..... 😱`;
        } else if (clickCount <= 50) {
            resultMessage = `아이고! ${clickCount}회 클릭하셨네요. 똥이 들어갔어요... 😥`;
        } else if (clickCount >= 51 && clickCount <= 100) {
            resultMessage = `조금만 더! ${clickCount}회 클릭! 나올 뻔 했어요! 😬`;
        } else if (clickCount >= 101 && clickCount <= 125) {
            resultMessage = `축하합니다! ${clickCount}회 클릭! 똥이 나왔어요! ✨`;
        } else if (clickCount >= 126 && clickCount <= 160) {
            resultMessage = `대단해요! ${clickCount}회 클릭! 쾌변의 신 등극! 👑`;
        } else { // 161회 초과 시, 최고 칭호 추가
            resultMessage = `역대급 쾌변! ${clickCount}회 클릭! 쾌변계의 전설! 🏆`;
        }

        messageDisplay.textContent = resultMessage;
        poopButton.style.display = 'none'; // 버튼 숨기기
        restartButton.style.display = 'block'; // 재시작 버튼 보이게
        poopImageDisplay.style.display = 'none'; // 게임 종료 시 똥 이미지 숨기기
        poopImageDisplay.classList.remove('visible');
    }

    // 클릭 이벤트 리스너
    poopButton.addEventListener('click', () => {
        if (isGameRunning) {
            clickCount++;
            clickCountDisplay.textContent = clickCount;

            // 똥 이미지 표시
            poopImageDisplay.style.display = 'flex'; // flex로 설정하여 내부 이미지 중앙 정렬
            poopImageDisplay.classList.add('visible'); // visible 클래스 추가로 이미지 보이게 함

            // 일정 시간 후 똥 이미지 숨기기
            setTimeout(() => {
                poopImageDisplay.classList.remove('visible'); // 투명도 애니메이션으로 숨기기 시작
                // transition이 끝난 후 display: none 처리 (선택 사항, 깔끔한 제거)
                setTimeout(() => {
                    poopImageDisplay.style.display = 'none';
                }, 300); // CSS transition 시간과 동일하게 설정
            }, 100); // 0.1초 후에 이미지가 나타났다가 사라지기 시작
        }
    });

    // 재시작 버튼 클릭 이벤트 리스너
    restartButton.addEventListener('click', () => {
        startGame(); // 게임 다시 시작
    });

    // 새로운 시작 버튼 클릭 이벤트 리스너
    startButton.addEventListener('click', () => {
        startGame(); // 게임 시작
    });
});