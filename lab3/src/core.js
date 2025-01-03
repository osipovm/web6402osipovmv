/**
 * Функция проверяет, является ли переданное значение целым числом.
 * Для проверки используется побитовая операция.
 * @param {*} n - значение для проверки
 * @returns {boolean} - возвращает true, если значение является целым числом, иначе false
 */
function isInteger(n) {
    // Проверяем, что значение является числом и не является NaN
    if (typeof n !== 'number' || isNaN(n)) {
        return false;
    }

    // Проверяем, что n не является null и является целым числом
    return (n | 0) === n;
}

/**
 * Функция возвращает массив четных чисел от 2 до 20 включительно.
 * @returns {Array} - массив четных чисел
 */
function even() { 
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 2);
}

/**
 * Функция, которая считает сумму чисел от 1 до заданного числа (с использованием цикла).
 * @param {*} n - конечное значение для суммы
 * @returns {number} - сумма чисел от 1 до n
 * @throws {Error} - если n не является положительным числом
 */
function sumTo(n) {
    if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a valid integer');
    }
    
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

/**
 * Функция, которая считает сумму чисел от 1 до заданного числа с использованием рекурсии.
 * @param {*} n - конечное значение для суммы
 * @returns {number} - сумма чисел от 1 до n
 * @throws {Error} - если n не является положительным числом
 */
function recSumTo(n) {
    if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a valid integer');
    }

    return n === 0 ? 0 : n + recSumTo(n - 1);  // Основная логика: рекурсивный вызов
}

/**
 * Функция для вычисления факториала заданного числа.
 * @param {*} n - число, для которого нужно вычислить факториал
 * @returns {number} - факториал числа n
 * @throws {Error} - если n не является положительным числом
 */
function factorial(n) {
    if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a valid integer');
    }

    return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Функция проверяет, является ли число степенью двойки.
 * @param {*} n - значение для проверки
 * @returns {boolean} - возвращает true, если число является степенью двойки, иначе false
 * @throws {Error} - если n не является положительным числом
 */
function isBinary(n) {
    if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) {
        return false;
    }
    
    return (n > 0) && (n & (n - 1)) === 0;
}

/**
 * Функция для нахождения N-го числа Фибоначчи.
 * @param {*} n - индекс числа Фибоначчи
 * @returns {number} - N-е число Фибоначчи
 * @throws {Error} - если n не является положительным числом
 */
function fibonacci(n) {
    if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a valid integer');
    }
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

/**
 * Функция принимает начальное значение и функцию операции, и возвращает функцию, выполняющую эту операцию.
 * Если функция операции не задана, возвращается начальное значение.
 * @param {*} initialValue - начальное значение
 * @param {function} operatorFn - функция, выполняющая операцию (по умолчанию null)
 * @returns {function} - возвращает функцию, выполняющую операцию с начальным значением
 * @throws {Error} - если operatorFn не является функцией
 */
function getOperationFn(initialValue, operatorFn = null) {
    // Проверка на валидность initialValue (разрешаем любые значения, включая null)
    if (initialValue === undefined) {
        throw new Error('Initial value cannot be undefined');
    }

    return function (newValue) {
        // Если оператор не передан, возвращаем начальное значение без изменений
        if (operatorFn === null) {
            return initialValue;
        }

        // Проверка, что оператор действительно функция
        if (typeof operatorFn !== 'function') {
            throw new Error('Operator function must be a function');
        }

        // Выполнение операции, включая поддержку null как допустимого значения
        initialValue = operatorFn(initialValue, newValue);
        return initialValue;
    };
}

/**
 * Функция создает генератор арифметической последовательности.
 * При вызове, она возвращает функцию-генератор, которая возвращает следующий элемент последовательности.
 * @param {*} start - начальное значение (по умолчанию 0)
 * @param {*} step - шаг (по умолчанию 1)
 * @returns {function} - функция-генератор, которая возвращает следующий элемент последовательности
 * @throws {Error} - если start или step не являются числами, равны NaN или null
 */
function sequence(start = 0, step = 1) {
    // Проверяем, что start и step валидны
    if (typeof start !== 'number' || isNaN(start) || start === null) {
        throw new Error('Start value must be a valid number');
    }

    if (typeof step !== 'number' || isNaN(step) || step === null) {
        throw new Error('Step value must be a valid number');
    }

    let current = start;
    return function () {
        const value = current;
        current += step;
        return value;
    };
}

/**
 * Функция сравнивает два объекта на глубоком уровне.
 * Рекурсивно проверяет свойства объектов и их значения.
 * @param {object} firstObject - первый объект для сравнения
 * @param {object} secondObject - второй объект для сравнения
 * @returns {boolean} - true, если объекты идентичны по значениям и структуре, иначе false
 */
function deepEqual(firstObject, secondObject) {
    // Быстрая проверка на идентичность ссылок
    if (firstObject === secondObject) return true;

    // Специальный случай для NaN
    if (typeof firstObject === 'number' && typeof secondObject === 'number') {
        return Number.isNaN(firstObject) && Number.isNaN(secondObject);
    }

    // Проверяем, что оба значения являются объектами и не равны null
    if (typeof firstObject !== 'object' || typeof secondObject !== 'object' || firstObject === null || secondObject === null) {
        return false;
    }

    // Получаем массивы ключей обоих объектов
    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    // Если количество ключей разное, объекты точно не равны
    if (keysA.length !== keysB.length) return false;

    // Используем `every` для проверки всех ключей
    return keysA.every(key => 
        keysB.includes(key) && deepEqual(firstObject[key], secondObject[key])
    );
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
