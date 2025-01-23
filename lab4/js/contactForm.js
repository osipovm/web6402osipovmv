/**
 * Скрипт обработки формы обратной связи.
 * Ожидает загрузки DOM, валидирует данные формы и отправляет их на сервер.
 */
document.addEventListener('DOMContentLoaded', function() {
  /**
   * Получаем ссылки на элементы формы и область вывода сообщений.
   */
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  /**
   * Назначаем обработчик события отправки формы.
   */
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем данные из полей формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    /**
     * Проверяем, чтобы все поля были заполнены.
     */
    if (!name || !email || !message) {
      formMessage.textContent = 'Все поля обязательны для заполнения!';
      formMessage.style.color = 'red';
      return;
    }

    /**
     * Валидация email-адреса по регулярному выражению.
     */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Введите корректный email!';
      formMessage.style.color = 'red';
      return;
    }

    /**
     * Формируем объект с данными формы.
     */
    const formData = {
      name: name,
      email: email,
      message: message
    };

    /**
     * Отправляем данные на сервер с помощью POST-запроса.
     */
    fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then(data => {
      formMessage.textContent = 'Ваше сообщение успешно отправлено!';
      formMessage.style.color = 'green';
      form.reset(); // Очистка формы после успешной отправки
    })
    .catch(error => {
      formMessage.textContent = 'Ошибка при отправке сообщения. Попробуйте снова.';
      formMessage.style.color = 'red';
      console.error('Ошибка:', error);
    });
  });
});
