document.querySelectorAll('.delete-post').forEach(function(button) {
  button.addEventListener('click', function(e) {
    const postId = e.target.id;
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      // Handle response here
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});

document.querySelector('.editForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const postId = e.target.id;
  const formData = {
    title: e.target.title.value,
    text: e.target.text.value
  };

  fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(data => {
    window.location.href = '/catalog';
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});