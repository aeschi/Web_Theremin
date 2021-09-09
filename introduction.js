let isVisible = true;
let introductionText;

function hideIntro() {
    introductionText = document.getElementById('introduction');
    if (isVisible) {
        introductionText.style.display = 'none';
        isVisible = false;
    } else if (!isVisible) {
        introductionText.style.display = 'block';
        isVisible = true;
    }
}
