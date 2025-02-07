function generateJoke() {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I told my wife she should embrace her mistakes. She gave me a hug!",
        "Why did the bicycle fall over? It was two-tired!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    document.getElementById('joke').innerText = randomJoke;
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    document.getElementById('form-message').innerText = "Thank you for your submission!";
}
