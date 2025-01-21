document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Отменяем стандартное поведение формы
  
      // Получаем данные из формы
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      // Проверка введённых данных
      if (!name || !email || !message) {
        formMessage.textContent = 'All fields are required!';
        formMessage.style.color = 'red';
        return;
      }
  
      // Проверка правильности email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address!';
        formMessage.style.color = 'red';
        return;
      }
  
      // Формируем объект для отправки на сервер
      const formData = {
        name: name,
        email: email,
        message: message
      };
  
      // Отправка POST-запроса
      fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        formMessage.textContent = 'Your message has been sent successfully!';
        formMessage.style.color = 'green';
        form.reset(); // Очистить форму
      })
      .catch(error => {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.style.color = 'red';
        console.error('Error:', error);
      });
    });
  });
  