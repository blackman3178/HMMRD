const newFormHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector("drink-choice").value;

    await fetch("/api/reviews/name", {
        method: 'GET',
        body: JSON.stringify({
            title,
        }),

    })
};

document.querySelector("#drink-choice")
.addEventListener('submit', newFormHandler);