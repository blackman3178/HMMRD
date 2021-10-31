const newFormHandler = async function(event) {
    event.preventDefault();
  
    const drink_name = document.querySelector('input[name="post-title"]').value;
    const review = document.querySelector('textarea[name="post-body"]').value;
  
    await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        drink_name,
        review,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);
  