const AboutUs = [
  {
    id: 0,
    title: `Наша команда - состоит из трех разработчиков.`,
  },
  {
    id: 1,
    title: `Мы собралась для чего-то нового в мире информационных технологий. `,
  },
  {
    id: 2,
    title: `Успех этого проекта - результат слаженной командной работы и взаимной поддержки. Светлана предложила сделать магазин по продажам цветов, Иван 
        предоставил готовый проект по этой тематике, который он сделал в Figma раньше, Олег занялся новыми разработками.`,
  },
  {
    id: 3,
    title: `Приступили к работе, образовалась команда!`,
  },
  {
    id: 4,
    title: `Был создан канал в дискорте, со множеством разделов, планировались заранее встречи с участием менторов, создали доску Trello, распределили задачи.`,
  },
];

const Develops = [
  {
    id: 10,
    name: 'Иван Кирик',
    img: 'src/assets/images/Ivankirik.jfif',
    about:
      'У меня есть опыт поддержки существующих приложений и создания веб-приложений с нуля. Я постоянно стремлюсь расти и совершенствовать свои навыки, оставаясь в курсе последних тенденций в сфере ИТ. Я открыт для новых задач и готов внести свой вклад в разработку инновационных веб-приложений. В настоящее время меня интересует разработка SSR-приложений на Angular 17, а также полнофункциональных решений в связке с NestJS. Работает разработчиком.',
    сontributions: `Сыграл ключевую роль в нашем проекте настраивая e-commerce SDK.
Умело внедрил надежную систему маршрутизации и навигации 
разработал и реализовал расширенные функции фильтрации, поиска, сортировки и категорий, разработал интерфейс, который позволяет пользователям легко переключаться в режим редактирования, позволяя им обновлять свою личную информацию, включая имена, адреса электронной почты и почтовые адреса.
Его энтузиазм во время встреч команды продолжает способствовать прогрессу нашего проекта. Всегда готов помочь другим членам команды.`,
    city: 'Гомель',
    role:'developer, team lead',
    github: 'https://github.com/Ivankirik',
  },
  {
    id: 20,
    name: 'Светлана Антонова',
    img: 'src/assets/images/Claire-An.svg',
    about:
      'Работает ведущим инженером в банке. Закончила Пермский государственный технический университете: информатика - системы автоматизации обработки данных и управления',
    сontributions: `Взяла на себя распределение задач на доске Trello. Создала подробную карточку товара и интегрировала слайдер. Работала над маршрутизацией и сервисом по работе с localstorage. Реализовала страницу 404. Вела разработку с аутентификацией клиента. Ее активное участие и предложения во время встреч команды улучшили проект.`,
    city: 'Екатеринбург',
    role:'developer',
    github: 'https://github.com/Claire-An',
  },
  {
    id: 30,
    name: 'Куис Олег',
    img: 'src/assets/images/Pestler.jfif',
    about:
      'Я любознательный и трудолюбивый человек. Я постоянно учусь и совершенствую свои навыки каждый день. У меня есть опыт разработки клиентской и серверной части приложений, работы с базами данных, создания SPA-приложений. Способен эффективно управлять собой во время выполнения независимых проектов, а также сотрудничать в составе продуктивной команды. Работал системным администратором.',
    сontributions: `Помогал в первоначальной настройке проекта. Собирал информацию о товарах, отбирал фотографии, заполнял карточки товаров на Commercetools и добавляла скидки. Кроме того, полностью реализовал страницы входа и регистрации, интегрировав библиотеку «React Hook Form», и валидацию. Также реализовал страницу «О нас». Работал над визуальной составляющей. Ответственно подходил к своей работе и оказывал помощь всей команде.`,
    city: 'Минск',
    role:'developer',
    github: 'https://github.com/Pestler',
  },
];

export { AboutUs, Develops };
