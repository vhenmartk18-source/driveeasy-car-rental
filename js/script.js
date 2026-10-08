/* ========================================
   DRIVE EASY CAR RENTAL
   JAVASCRIPT
======================================== */


/* ========================================
   GET ELEMENTS
======================================== */

const bookingForm = document.getElementById("bookingForm");

const successMessage =
    document.getElementById("successMessage");

const bookingSummary =
    document.getElementById("bookingSummary");

const newBookingButton =
    document.getElementById("newBookingButton");

const pickupDate =
    document.getElementById("pickupDate");

const returnDate =
    document.getElementById("returnDate");

const pickupTime =
    document.getElementById("pickupTime");

const returnTime =
    document.getElementById("returnTime");

const vehicle =
    document.getElementById("vehicle");


/* ========================================
   SET TODAY AS MINIMUM PICKUP DATE
======================================== */

function getTodayDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


const today = getTodayDate();

pickupDate.min = today;

returnDate.min = today;


/* ========================================
   PICKUP DATE CHANGE
======================================== */

pickupDate.addEventListener(
    "change",
    function () {

        returnDate.min = pickupDate.value;

        if (
            returnDate.value &&
            returnDate.value < pickupDate.value
        ) {

            returnDate.value = "";

        }

    }
);


/* ========================================
   CLEAR ERROR
======================================== */

function clearError(inputId) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(
            inputId + "Error"
        );

    const group =
        input.closest(".form-group");


    if (group) {
        group.classList.remove("input-error");
    }


    if (error) {
        error.textContent = "";
    }

}


/* ========================================
   SHOW ERROR
======================================== */

function showError(
    inputId,
    message
) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(
            inputId + "Error"
        );

    const group =
        input.closest(".form-group");


    if (group) {
        group.classList.add("input-error");
    }


    if (error) {
        error.textContent = message;
    }

}


/* ========================================
   VALIDATE REQUIRED FIELD
======================================== */

function validateRequired(
    inputId,
    message
) {

    const input =
        document.getElementById(inputId);


    clearError(inputId);


    if (!input.value.trim()) {

        showError(
            inputId,
            message
        );

        return false;
    }


    return true;

}


/* ========================================
   EMAIL VALIDATION
======================================== */

function validateEmail() {

    const input =
        document.getElementById("email");

    const email =
        input.value.trim();


    clearError("email");


    if (!email) {

        showError(
            "email",
            "Email address is required."
        );

        return false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            "email",
            "Please enter a valid email address."
        );

        return false;

    }


    return true;

}


/* ========================================
   PHONE VALIDATION
======================================== */

function validatePhone() {

    const input =
        document.getElementById("phone");

    const phone =
        input.value.trim();


    clearError("phone");


    if (!phone) {

        showError(
            "phone",
            "Phone number is required."
        );

        return false;

    }


    const phonePattern =
        /^(09|\+639)\d{9}$/;


    if (!phonePattern.test(phone)) {

        showError(
            "phone",
            "Enter a valid Philippine mobile number."
        );

        return false;

    }


    return true;

}


/* ========================================
   DATE AND TIME VALIDATION
======================================== */

function validateRentalDateTime() {

    clearError("pickupDate");
    clearError("returnDate");
    clearError("pickupTime");
    clearError("returnTime");


    const pickupDateValue =
        pickupDate.value;

    const returnDateValue =
        returnDate.value;

    const pickupTimeValue =
        pickupTime.value;

    const returnTimeValue =
        returnTime.value;


    if (!pickupDateValue) {

        showError(
            "pickupDate",
            "Please select a pick-up date."
        );

        return false;

    }


    if (!returnDateValue) {

        showError(
            "returnDate",
            "Please select a return date."
        );

        return false;

    }


    if (!pickupTimeValue) {

        showError(
            "pickupTime",
            "Please select a pick-up time."
        );

        return false;

    }


    if (!returnTimeValue) {

        showError(
            "returnTime",
            "Please select a return time."
        );

        return false;

    }


    const pickup =
        new Date(
            `${pickupDateValue}T${pickupTimeValue}`
        );


    const returned =
        new Date(
            `${returnDateValue}T${returnTimeValue}`
        );


    const now =
        new Date();


    if (pickup < now) {

        showError(
            "pickupDate",
            "Pick-up date and time cannot be in the past."
        );

        return false;

    }


    if (returned <= pickup) {

        showError(
            "returnDate",
            "Return date and time must be after pick-up."
        );

        return false;

    }


    return true;

}


/* ========================================
   VEHICLE VALIDATION
======================================== */

function validateVehicle() {

    clearError("vehicle");


    if (!vehicle.value) {

        showError(
            "vehicle",
            "Please select a vehicle."
        );

        return false;

    }


    return true;

}


/* ========================================
   GET SELECTED EXTRAS
======================================== */

function getSelectedExtras() {

    const selected =
        document.querySelectorAll(
            'input[name="extras"]:checked'
        );


    const extras = [];


    selected.forEach(
        function (item) {

            extras.push(item.value);

        }
    );


    return extras;

}


/* ========================================
   FORM SUBMISSION
======================================== */

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Clear previous errors */

        document
            .querySelectorAll(".error-message")
            .forEach(
                function (error) {
                    error.textContent = "";
                }
            );


        document
            .querySelectorAll(".input-error")
            .forEach(
                function (group) {
                    group.classList.remove(
                        "input-error"
                    );
                }
            );


        /* Validate fields */

        const locationValid =
            validateRequired(
                "pickupLocation",
                "Pick-up location is required."
            );


        const dropoffValid =
            validateRequired(
                "dropoffLocation",
                "Drop-off location is required."
            );


        const nameValid =
            validateRequired(
                "fullName",
                "Full name is required."
            );


        const licenseValid =
            validateRequired(
                "license",
                "Driver's license number is required."
            );


        const emailValid =
            validateEmail();


        const phoneValid =
            validatePhone();


        const dateTimeValid =
            validateRentalDateTime();


        const vehicleValid =
            validateVehicle();


        const formIsValid =
            locationValid &&
            dropoffValid &&
            nameValid &&
            licenseValid &&
            emailValid &&
            phoneValid &&
            dateTimeValid &&
            vehicleValid;


        /* Stop if invalid */

        if (!formIsValid) {

            const firstError =
                document.querySelector(
                    ".input-error"
                );


            if (firstError) {

                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


            return;

        }


        /* ========================================
           CREATE BOOKING SUMMARY
        ======================================== */

        const fullName =
            document
                .getElementById("fullName")
                .value
                .trim();


        const pickupLocation =
            document
                .getElementById("pickupLocation")
                .value
                .trim();


        const dropoffLocation =
            document
                .getElementById("dropoffLocation")
                .value
                .trim();


        const selectedVehicle =
            vehicle.value;


        const extras =
            getSelectedExtras();


        let extrasText =
            "No additional options";


        if (extras.length > 0) {

            extrasText =
                extras.join(", ");

        }


        bookingSummary.innerHTML = `

            <strong>Booking Details</strong>

            <br><br>

            <strong>Customer:</strong>
            ${fullName}

            <br>

            <strong>Vehicle:</strong>
            ${selectedVehicle}

            <br>

            <strong>Pick-up:</strong>
            ${pickupLocation}

            <br>

            <strong>Drop-off:</strong>
            ${dropoffLocation}

            <br>

            <strong>Date:</strong>
            ${pickupDate.value}
            to
            ${returnDate.value}

            <br>

            <strong>Additional Options:</strong>
            ${extrasText}

        `;


        /* ========================================
           SHOW SUCCESS MESSAGE
        ======================================== */

        bookingForm.style.display = "none";

        successMessage.style.display = "block";


        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* ========================================
   MAKE ANOTHER BOOKING
======================================== */

newBookingButton.addEventListener(
    "click",
    function () {

        bookingForm.reset();


        bookingForm.style.display = "block";

        successMessage.style.display = "none";


        pickupDate.min = getTodayDate();

        returnDate.min = getTodayDate();


        window.scrollTo({
            top:
                document
                    .getElementById("booking")
                    .offsetTop - 80,

            behavior: "smooth"
        });

    }
);


/* ========================================
   RENT NOW BUTTONS
======================================== */

const rentButtons =
    document.querySelectorAll(
        ".rent-button"
    );


rentButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedCar =
                    button.dataset.car;


                vehicle.value =
                    selectedCar;

            }
        );

    }
);


/* ========================================
   REAL-TIME CLEARING OF ERRORS
======================================== */

const formInputs =
    bookingForm.querySelectorAll(
        "input, select, textarea"
    );


formInputs.forEach(
    function (input) {

        input.addEventListener(
            "input",
            function () {

                const error =
                    document.getElementById(
                        input.id + "Error"
                    );

                const group =
                    input.closest(".form-group");


                if (error) {
                    error.textContent = "";
                }


                if (group) {
                    group.classList.remove(
                        "input-error"
                    );
                }

            }
        );


        input.addEventListener(
            "change",
            function () {

                const error =
                    document.getElementById(
                        input.id + "Error"
                    );

                const group =
                    input.closest(".form-group");


                if (error) {
                    error.textContent = "";
                }


                if (group) {
                    group.classList.remove(
                        "input-error"
                    );
                }

            }
        );

    }
);