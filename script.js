document.addEventListener("DOMContentLoaded", function () {
    const verificationForm = document.getElementById("verificationForm");
    const titleCodeInput = document.getElementById("titleCodeInput");
    const verificationResult = document.getElementById("verificationResult");

    verificationForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        let titleCode = titleCodeInput.value.trim();
        titleCode = titleCode.toUpperCase(); // Convert to uppercase

        if (titleCode === "") {
            verificationResult.innerText = "Please enter a Title Code.";
            return;
        }

        fetch("http://localhost:3001/api/verify-title", {
            method: "POST",
            body: JSON.stringify({ titleCode }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isGood === "good") { // Check the response for "good"
                    verificationResult.innerText = `${titleCode} is good for export.`;
                    verificationResult.classList.remove("not-good");
                    verificationResult.classList.add("good");
                } else if (data.isGood === "not good") { // Check the response for "not good"
                    verificationResult.innerText = `${titleCode} is not good for export.`;
                    verificationResult.classList.remove("good");
                    verificationResult.classList.add("not-good");
                } else {
                    verificationResult.innerText = "An error occurred.";
                }

                // Clear the input field after displaying the result
                titleCodeInput.value = "";
            })
            .catch(error => {
                console.error("Error:", error);
                verificationResult.innerText = "An error occurred.";
            });
    });
});
