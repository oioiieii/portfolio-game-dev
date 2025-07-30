import "./App.css";
import "./curved-text.scss";

const text = "ПОРТФОЛИО";

const works = [
  {
    id: 1,
    title: "Изучение основ в Unity",
    description:
      "Этот проект был создан в рамках курса Unity Essentials, в котором я познакомился с Unity и научился пользоваться базовыми концепциями.",
    imageUrl: "/works/1.png", // поменяй на свои пути к картинкам
    link: "https://play.unity.com/en/games/de33abd3-33bd-4283-a338-b701a4110780/essentials-unity",
  },
  {
    id: 2,
    title: "Подробное изучение шейдеров и материалов",
    description:
      "Данный натюрморт был создан в рамках курса Unity Creative Core с созданием собственных материалов и шейдеров.",
    imageUrl: "works/2.png",
    link: "https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project",
  },
  {
    id: 3,
    title: "Пост-обработка в Unity",
    description:
      "Проект в котором я использовал различные настройки пост-обработки для улучшения графики и лучшей передачи атмосферы.",
    imageUrl: "/works/3.png",
    link: "https://play.unity.com/en/games/cabe41de-7c35-4b95-a07f-876cff2972d1/post-processing-project",
  },
  {
    id: 4,
    title: "Работа со звуком в сцене",
    description:
      "В рамках данного проекта я подробно изучил принципы работы аудио в Unity и оживил сцену с помощью звуков.",
    imageUrl: "/works/4.png",
    link: "https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project",
  },
  {
    id: 5,
    title: "Итоговый проект",
    description:
      "В данном проекте я совместил все накопленные знания, полученные за курс Unity Creative Core, демонстрируя свои способности. Здесь я действительно постарался и много экспериментировал чтобы получить лучший результат.",
    imageUrl: "/works/5.png",
    link: "https://play.unity.com/en/games/2e833b41-05de-4f66-81d6-0398314897f3/alien-video-game-shop",
  },
];

function App() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-top ">
        <div className="curved-text text-white absolute top-20">
          {[...text].map((char, i) => (
            <span key={i} className={`char${i + 1}`}>
              {char}
            </span>
          ))}
        </div>
        <div className="text-lime-400 mt-50" style={{ fontSize: "14rem" }}>
          oioii
        </div>
        <div className="text-white mt-10 text-2xl text-center">
          Привет! Я честно хотел придумать красивый дизайн, но это оказалось
          чертовски изнурительным процессом. А потом это всё ещё и верстать!
          <br></br>
          Поэтому я сдался, мне ведь еще нужны силы на работу которую я бы с
          радостью принял от вас :) ну пж, я талант честно
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          Ниже ты можешь ознакомиться с моими работами в Unity.
          <br></br>
          <br></br>
          <span className="italic">*стрелочка вниз*</span>
        </div>
      </div>

      <div className="min-h-screen">
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-20 text-center text-lime-400">
            Мои проекты — шаг за шагом
          </h2>

          <div className="space-y-15 relative">
            {works.map(({ id, title, description, imageUrl, link }) => (
              <div
                key={id}
                className="relative flex items-center gap-10 group transition-all duration-300 hover:translate-x-4 hover:shadow-2xl hover:outline hover:outline-2 hover:outline-lime-400 rounded-lg p-10"
              >
                {/* Фото */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-150 h-auto object-cover rounded-lg shadow-lg z-10"
                />

                {/* Контент */}
                <div className="z-10">
                  <h3 className="text-2xl font-semibold text-lime-400 mb-2">
                    Шаг {id}: {title}
                  </h3>
                  <p className="text-white  text-xl  mb-4 max-w-xl">
                    {description}
                  </p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-lime-500 hover:bg-lime-600 text-white  px-5 py-2 rounded-md text-x font-bold transition"
                  >
                    Смотреть проект
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="max-w-6xl mx-auto px-6 py-20 text-white">
        <h2 className="text-4xl font-bold mb-16 text-center text-lime-400">
          Сертификат и контакты
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-60">
          {/* Левая часть — Сертификат */}
          <div className="group transition-all duration-300 hover:translate-x-2 hover:shadow-2xl hover:border-lime-400 border-2 border-transparent rounded-xl p-6">
            <a
              href="https://www.credly.com/badges/c5c53d86-3904-4e66-97bf-098e362801fd/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/certificates/unity.png"
                alt="Unity Creative Core Certificate"
                className="w-80 mx-auto mb-6 transition duration-300"
              />

              <h3 className="text-2xl font-semibold mb-2 text-center">
                Unity Creative Core
              </h3>

              <p className="text-sm italic text-gray-300 text-center">
                Provided by <span className="font-semibold">Credly</span> in
                partnership with{" "}
                <span className="font-semibold">Unity Technologies</span>
              </p>
            </a>
          </div>

          {/* Правая часть — Текст и ссылка */}
          <div className="max-w-md text-center md:text-left">
            <p className="text-xl mb-4 leading-relaxed text-gray-200">
              <span className="font-bold">
                Спасибо что посмотрели портфолио!
              </span>{" "}
              <br />
              Если вас заинтересовало сотрудничество, я буду очень рад, если вы
              мне{" "}
              <a
                href="https://t.me/oioiiei"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lime-400 font-semibold hover:underline text-lg"
              >
                напишете.
              </a>
            </p>
            <br />
            <br />
            <p className="text-x text-gray-300 italic max-w-sm">
              UPD: без переезда в другую страну сертификат не откроется.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
