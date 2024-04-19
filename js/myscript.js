window.onload = () => {
    // Get all the floor buttons
    let buttons = document.querySelectorAll(".Floors-button button");

    // Select the screen element
    const screen = document.querySelector('.screen');
    const floorButtons = document.querySelectorAll('.Floors-button button');

    // Initialize an array to store selected floors
    let selectedFloors = [];

    // Variable to track whether the elevator is moving
    let isMoving = false;

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            // Retrieve the floor number from the button's data attribute
            let floorNumber = this.getAttribute("data-set-floor");

            // Perform actions related to the selected floor
            goToFloor(floorNumber);
        });
    });

    // Function to simulate actions when going to a floor
    function goToFloor(floorNumber) {
        // Perform actions such as moving the elevator, opening doors, etc.
        if (!isMoving) {
            isMoving = true;
            animateElevator(floorNumber);
        }
    }

    // Function to animate the elevator's movement
    function animateElevator(floorNumber) {
        // Retrieve the current floor
        let currentFloor = document.querySelector('.elevator_floors .floor' + floorNumber);

        // Get the position of the current floor
        let currentFloorPosition = currentFloor.getBoundingClientRect().top;

        // Move the elevator to the selected floor
        let elevator = document.querySelector('.elevator_floors .elevator');
        elevator.style.transition = 'top 3s';
        elevator.style.top = currentFloorPosition + 'px';

        // Simulate door opening after the elevator reaches the floor
        setTimeout(() => {
            openDoor();
        }, 3000);
    }

    // Function to simulate opening the elevator door
    function openDoor() {
        // Get the elevator doors
        let doors = document.querySelectorAll('.elevator_floors .elevator .door');

        // Open the doors by changing their width
        doors.forEach(door => {
            door.style.transition = 'width 2s';
            door.style.width = '0px';
        });

        // After a delay, simulate closing the door and moving to the next floor
        setTimeout(() => {
            closeDoor();
        }, 2000);
    }

    // Function to simulate closing the elevator door
    function closeDoor() {
        // Get the elevator doors
        let doors = document.querySelectorAll('.elevator_floors .elevator .door');

        // Close the doors by changing their width
        doors.forEach(door => {
            door.style.transition = 'width 2s';
            door.style.width = '25px';
        });

        // After a delay, simulate the elevator moving to the next floor
        setTimeout(() => {
            isMoving = false;
            // Continue to the next selected floor if available
            selectedFloors.shift();
            if (selectedFloors.length > 0) {
                goToFloor(selectedFloors[0]);
            }
        }, 2000);
    }

    // Add click event listener to each floor button
    floorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the floor number from the data attribute
            const floorNumber = this.getAttribute('data-set-floor');

            // Add the floor number to the selectedFloors array if not already selected
            if (!selectedFloors.includes(floorNumber)) {
                selectedFloors.push(floorNumber);
            }

            // Update the screen content to display the selected floors
            updateScreen();
        });
    });

    // Function to update the screen content
    function updateScreen() {
        // Display the selected floors in the screen element
        screen.innerHTML = `<h2>Selected Floors:</h2><p>${selectedFloors.join(', ')}</p>`;
    }
};