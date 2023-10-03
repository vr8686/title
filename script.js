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

        // Replace the API endpoint with your backend's endpoint
        fetch("http://localhost:3001/api/verify-title", {
            method: "POST",
            body: JSON.stringify({ titleCode }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isGood) {
                    verificationResult.innerText = `${titleCode} is good for export.`;
                    verificationResult.classList.remove("not-good"); // Remove not-good class
                    verificationResult.classList.add("good"); // Add good class
                } else {
                    verificationResult.innerText = `${titleCode} is not good for export.`;
                    verificationResult.classList.remove("good"); // Remove good class
                    verificationResult.classList.add("not-good"); // Add not-good class
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
