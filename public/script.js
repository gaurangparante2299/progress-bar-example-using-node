document.getElementById('uploadForm').addEventListener('submit', function() {
    // Show progress bar during upload
    let progress = document.getElementById('bar');
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            progress.style.width = width + '%';
            progress.textContent = width + '%';
        }
    }, 10);
});
