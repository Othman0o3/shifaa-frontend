document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent normal form submission

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('http://localhost:8000/accounts/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
          body: JSON.stringify({
          username: 'testuser',
          age : 'age',
          gender :'Male',
          email :'email@example.com',
          password: 'testpass123',
          user_type: 'patient'})
        // Include credentials if you're using sessions:
        // 'X-CSRFToken': getCookie('csrftoken') // if using CSRF
      ,
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
    if (result.user_type === 'doctor') {
    window.location.href = '/dashboard/doctor/';
  } else if (result.user_type === 'patient') {
    window.location.href = '/dashboard/patient/';
  } else if (result.user_type === 'lab') {
    window.location.href = '/dashboard/lab/';
  } else {
    window.location.href = '/'; // fallback
  }
} else {
  alert('حدث خطأ: ' + JSON.stringify(result));
}

  } catch (error) {
    console.error('Signup error:', error);
    alert('فشل الاتصال بالسيرفر');
  }
});