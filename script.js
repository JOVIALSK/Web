document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('toleranceForm');
    const toleranceOutput = document.getElementById('toleranceOutput');
    const copyAllBtn = document.getElementById('copyAllBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        generateShuffledTolerance();
    });

    copyAllBtn.addEventListener('click', function() {
        copyAllToClipboard();
    });

    function generateShuffledTolerance() {
        const nominalInput = document.getElementById('nominalValue');
        const toleranceInput = document.getElementById('toleranceValue');

        const nominalValue = parseFloat(nominalInput.value);
        const toleranceValue = parseFloat(toleranceInput.value);

        // Clear previous output
        toleranceOutput.innerHTML = '';

        if (!isNaN(nominalValue) && !isNaN(toleranceValue)) {
            const lowerLimit = nominalValue - toleranceValue;
            const upperLimit = nominalValue + toleranceValue;
            const toleranceList = [];

            // Generate a shuffled list of 20 tolerance values
            for (let i = 0; i < 20; i++) {
                const randomTolerance = Math.random() * (upperLimit - lowerLimit) + lowerLimit;
                toleranceList.push(randomTolerance.toFixed(4)); // Round to 4 decimal places
            }

            // Shuffle the tolerance list
            toleranceList.sort(() => Math.random() - 0.5);

            // Display the tolerance values in individual boxes
            toleranceList.forEach(value => {
                const toleranceBox = document.createElement('div');
                toleranceBox.classList.add('tolerance-box');
                toleranceBox.textContent = value;
                toleranceOutput.appendChild(toleranceBox);
            });
        }
    }

    function copyAllToClipboard() {
        const values = Array.from(document.querySelectorAll('.tolerance-box')).map(box => box.textContent).join('\t');
        const textarea = document.createElement('textarea');
        textarea.value = values;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Copied all values to clipboard.');
    }
});
