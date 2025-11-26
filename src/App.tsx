import {useRef, useState} from "react";
import "./App.css";
import "./curved-text.scss";
import arrow from "./assets/arrow.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaTelegramPlane, FaEnvelope, FaGithub } from "react-icons/fa";
import { animate } from "framer-motion";

function smoothScrollTo(targetY: number) {
    const currentY = window.scrollY;

    animate(currentY, targetY, {
        duration: 0,   // супер плавно
        ease: "easeInOut",
        onUpdate(latest) {
            window.scrollTo(0, latest);
        },
    });
}

const text = "ПОРТФОЛИО";

type Work = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category: number;
};

const works = [
  {
    id: 1,
    title: "Изучение основ в Unity",
    description:
      "Этот проект был создан в рамках курса Unity Essentials, в котором я познакомился с Unity и научился пользоваться базовыми концепциями.",
    imageUrl: "works/1.png",
    link: "https://play.unity.com/en/games/de33abd3-33bd-4283-a338-b701a4110780/essentials-unity",
    category: 0,
  },
  {
    id: 2,
    title: "Подробное изучение шейдеров и материалов",
    description:
      "Данный натюрморт был создан в рамках курса Unity Creative Core с созданием собственных материалов и шейдеров.",
    imageUrl: "works/2.png",
    link: "https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project",
    category: 1,
  },
  {
    id: 3,
    title: "Пост-обработка в Unity",
    description:
      "Проект в котором я использовал различные настройки пост-обработки для улучшения графики и лучшей передачи атмосферы.",
    imageUrl: "works/3.png",
    link: "https://play.unity.com/en/games/cabe41de-7c35-4b95-a07f-876cff2972d1/post-processing-project",
    category: 1,
  },
  {
    id: 4,
    title: "Работа со звуком в сцене",
    description:
      "В рамках данного проекта я подробно изучил принципы работы аудио в Unity и оживил сцену с помощью звуков.",
    imageUrl: "works/4.png",
    link: "https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project",
    category: 1,
  },
  {
    id: 5,
    title: "Итоговый проект",
    description:
      "В данном проекте я совместил все накопленные знания, полученные за курс Unity Creative Core, демонстрируя свои способности. Здесь я действительно постарался и много экспериментировал чтобы получить лучший результат.",
    imageUrl: "works/5.png",
    link: "https://play.unity.com/en/games/2e833b41-05de-4f66-81d6-0398314897f3/alien-video-game-shop",
    category: 1,
  },
  {
    id: 6,
    title: "Знакомство с программированием",
    description:
      "В данной работе я познакомился с обработкой ввода и созданием простой игровой логики, а также изучил паттерн Object Pool для оптимизации производительности.",
    imageUrl: "works/JP_1.png",
    link: "https://play.unity.com/en/games/3b850cc6-1836-4a56-ae3d-71b4b76445ef/prototype-2",
    category: 2,
  },
  {
    id: 7,
    title: "Анимации и звук",
    description:
      "В данной работе я освоил добавление анимаций и звуковых эффектов, сделав игровой процесс более динамичным и выразительным.",
    imageUrl: "works/JP_2.png",
    link: "https://play.unity.com/en/games/1000c1e1-5b56-4f37-89f4-255ca40feb99/prototype-3",
    category: 2,
  },
  {
    id: 8,
    title: "Физика и враги",
    description:
      "В данной работе я реализовал простую физику объектов, применил корутины для управления процессами и создал базовых врагов с поведением в игре.",
    imageUrl: "works/JP_3.png",
    link: "https://play.unity.com/en/games/cad954b7-60fd-480c-a0af-b01f91d73cc7/prototype-4",
    category: 2,
  },
  {
    id: 9,
    title: "UI и выбор сложности",
    description:
      "В данной работе я добавил пользовательский интерфейс с отображением счёта и реализовал механику выбора уровня сложности.",
    imageUrl: "works/JP_4.png",
    link: "https://play.unity.com/en/games/d5c8bfc7-3c37-4be0-951e-7e3293ecea2f/prototype-5",
    category: 2,
  },
];

const categories = [
  "Unity Essentials Pathway",
  "Unity Creative Core",
  "Unity Junior Programmer",
  "Свободные проекты",
];
const categoryDescriptions: Record<number, string> = {
    0: "Проекты, разработанные в рамках базового курса <b>Unity Essentials Pathway</b>, посвящённого практическому освоению инструментов Unity.",
    1: "Проекты, разработанные в рамках курса <b>Unity Creative Core</b>, которые затрагивают работу с материалами и шейдерами, освещением и постобработкой, анимацией, камерой и другими средствами визуализации.",
    2: "Проекты, разработанные в рамках курса <b>Unity Junior Programmer</b>, посвящённого основам программирования на C# в Unity, включая работу с объектами, компонентами и создание базовых игровых механик.",
    3: "<b>Свободные проекты</b> — в данном разделе находятся мои собственные работы, которые я создаю в свободное время. <br><br>UPD: Если здесь пока ничего нет, значит, мой перфекционизм не позволяет ещё выложить проекты до тех пор, пока я не доведу их до идеала.",
};


type ProjectsSectionProps = {
  works: Work[];
};

function ProjectsSection({ works }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const handleCategoryChange = (index: number) => {
        setSelectedCategory(index);

        // Лёгкая задержка нужна, чтобы успела запуститься анимация
      setTimeout(() => {
          if (sectionRef.current) {
              const top = sectionRef.current.offsetTop - 20;
              smoothScrollTo(top);
          }
      }, 50);
  };
    const handleSwipe = (offsetX: number) => {
        const threshold = 60; // чувствительность свайпа

        if (offsetX < -threshold && selectedCategory < categories.length - 1) {
            handleCategoryChange(selectedCategory + 1);
        }
        else if (offsetX > threshold && selectedCategory > 0) {
            handleCategoryChange(selectedCategory - 1);
        }
    };

    const filteredWorks = works.filter(
    (work) => work.category === selectedCategory
  );

  return (
    <section  ref={sectionRef} className="max-w-6xl max-sm:px-10 mx-auto px-6 py-5 min-h-screen flex flex-col">
      <h2 className="text-4xl font-bold mb-10 text-center text-lime-400 uppercase tracking-widest">
        Мои проекты — шаг за шагом
      </h2>

      {/* Кнопки категорий */}
        <div className="flex justify-center mb-6">
            <div className="inline-flex flex-wrap sm:flex-nowrap">
                {categories.map((cat, index) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(index)}
                        className={`transition border-2 cursor-pointer font-bold
                        w-full text-xl px-4 py-3
                        sm:w-auto sm:text-2xl sm:px-8 sm:py-4 sm:mb-0
                        ${index === 0
                            ? "max-sm:rounded-t-xl sm:rounded-l-full"
                            : index === categories.length - 1
                                ? "max-sm:rounded-b-xl sm:rounded-r-full"
                                : ""
                        }
                        ${selectedCategory === index
                            ? "bg-lime-400 border-lime-400 text-black"
                            : "border-lime-400 text-white hover:border-lime-400 hover:text-lime-400"}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => handleSwipe(info.offset.x)}
        >


        {/* Описание выбранной категории */}
      <AnimatePresence mode="wait">
        {categoryDescriptions[selectedCategory] && (
          <motion.p
            key={selectedCategory}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="text-justify text-gray-200 md:text-2xl m-6 mb-10 mx-auto md:px-12"
            dangerouslySetInnerHTML={{
              __html: categoryDescriptions[selectedCategory],
            }}
          ></motion.p>
        )}
      </AnimatePresence>

      {/* Список проектов с анимацией */}
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {filteredWorks.length > 0 &&
            filteredWorks.map(
              ({ id, title, description, imageUrl, link }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{
                    x: 8,
                    boxShadow: "0 8px 20px rgba(0,255,0,0.05)",
                  }}
                  className="relative flex flex-col md:flex-row items-center gap-10 group border-2 border-transparent hover:border-lime-400 rounded-lg p-6 md:p-6"
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full sm:w-100 h-auto object-cover rounded-lg shadow-lg z-10"
                  />

                  <div className="z-10 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-lime-400 mb-2">
                      {i + 1}) {title}
                    </h3>
                    <p className="text-white mb-4 max-w-xl">
                      {description}
                    </p>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-lime-500 hover:bg-lime-600 text-white px-5 py-2 rounded-md font-bold transition"
                    >
                      Смотреть проект
                    </a>
                  </div>
                </motion.div>
              )
            )}
        </AnimatePresence>
      </div>
        </motion.div>
        {/* Индикаторы выбранной категории */}
        <div className="flex justify-center gap-3 py-8 mt-auto">
            {categories.map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryChange(index)}
                    className={`w-4 h-4 rounded-full transition cursor-pointer
      ${selectedCategory === index
                        ? "bg-lime-400"
                        : "border-2 border-lime-400 hover:bg-lime-400 hover:bg-opacity-50"
                    }`}
                />
            ))}
        </div>
    </section>
  );
}

function AboutSection() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20 text-white">
            <h2 className="text-4xl font-bold mb-8 text-center text-lime-400 uppercase tracking-widest">
                О себе
            </h2>
            <p className="text-justify text-xl md:text-2xl mx-auto max-w-5xl">
                Я студент 4 курса, старательный, отвественный и достаточно сообразительный.
                <br/><br/>За годы обучения перепробовал различные направления: создавал сайты, разрабатывал кроссплатформенные приложения, писал API на ASP.NET и работал с нейронными сетями.
                Игровая разработка всегда привлекала меня, потому что считаю, что это та сфера где полезно быть разносторонним человеком.
                <br/><br/>По Unity кроме оффициальных крусов читал различную литературу, например изучал по ней UI Toolkit, различные паттерны проектирования, а также читал документацию Zenject.
                К сожалению, так и не закончил разбиратсья с встроенным механизмом пулов в Zenject и пока не выложил данный проект, чтобы продемонстрировать свои навыки кодинга. 🤓
                <br/><br/>В последнее время изучаю Blender, так как считаю это полезным и что это может открыть передо мной новые возможности для собственных проектов.

            </p>
        </section>
    );
}

type Certificate = {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Unity Essentials",
    imageUrl: "certificates/essentials.png",
    link: "https://www.credly.com/badges/8a98b48f-e65b-42e0-b2a1-aea095b0a224/public_url",
  },
  {
    id: 2,
    title: "Unity Creative Core",
    imageUrl: "certificates/creative-core.png",
    link: "https://www.credly.com/badges/c5c53d86-3904-4e66-97bf-098e362801fd/public_url",
  },
  {
    id: 3,
    title: "Unity Junior Programmer",
    imageUrl: "certificates/junior-programmer.png",
    link: "https://www.credly.com/badges/bbb46a43-eade-451c-a288-c2c0369fc859/public_url",
  },
];



function CertificatesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-white">
      <h2 className="text-4xl font-bold mb-5 text-center text-lime-400 uppercase tracking-widest">
        Мои сертификаты
      </h2>
        <p className="text-xl text-gray-100 italic text-center mb-5">
            ПРИМЕЧАНИЕ: без VPN сертификаты не откроются.
        </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-10 justify-items-center mb-14">
        {certificates.map(({ id, title, imageUrl, link }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block transition-all duration-300 hover:translate-y-2 hover:shadow-2xl hover:border-lime-400 border-2 border-transparent rounded-xl p-6"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-64 md:w-72 lg:w-80 mx-auto mb-6 transition duration-300"
            />
            <h3 className="text-2xl font-semibold  mb-2 text-center">{title}</h3>
            <p className="text-sm italic text-gray-300 text-center">
              Provided by <span className="font-semibold">Credly</span> in
              partnership with{" "}
              <span className="font-semibold">Unity Technologies</span>
            </p>
          </a>
        ))}
      </div>


    </section>
  );
}

function ContactsSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 pb-25 text-white">
      <h2 className="text-4xl font-bold mb-12 text-center text-lime-400 uppercase tracking-widest">
        Контакты
      </h2>
      <div className="flex flex-col md:flex-col justify-between items-start md:items-center gap-10">
        {/* Текст */}
        <p className="sm:text-2xl text-justify">
          Спасибо, что просмотрели портфолио! Очень надеюсь, что мне удалось
          хоть чем-то заинтересовать вас. Буду рад возможности принести вам
          пользу и применить свои навыки на практике.
        </p>

        {/* Контакты */}
          <div className="flex justify-center max-sm:flex-wrap sm:flex-row gap-4 mx-auto sm:w-auto">
              <a
                  href="https://t.me/oioiiei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition">
                  <FaTelegramPlane size={25}  />
                  @oioiiei
              </a>

              <a
                  href="mailto:oioiieii@yandex.ru"
                  className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition">

              <FaEnvelope size={25}  />
                  oioiieii@yandex.ru
              </a>

              <a
                  href="https://github.com/oioiieii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition">

              <FaGithub size={25}  />
                  oioiieii
              </a>
          </div>

      </div>
    </section>
  );
}

function App() {
  return (
    <div className={" max-sm:text-xl"}>
      <div className="min-h-screen flex flex-col items-center justify-start  ">
        <div className="curved-text text-white absolute top-10">
          {[...text].map((char, i) => (
            <span key={i} className={`char${i + 1} text-center`}>
              {char}
            </span>
          ))}
        </div>

          <div className="text-lime-400 mt-45 sm:mt-70 text-[10rem] sm:text-[16rem] leading-none text-center">
              oioii
          </div>

          <div className="text-white mt-10 sm:mt-10 sm:text-2xl text-center max-w-5xl mx-auto px-4 mb-10">
              Привет! Я студент 4 курса и активно ищу возможность работы/стажировки в геймдеве. <br/> Буду рад любым
              предложениям 🙏🥺
              <br />
              <br />
              Ниже вы можете ознакомиться с моими работами в Unity.
          </div>
          {/*  Я занимаюсь программированием на C# около 2-х лет. До Unity изучал
              кроссплатформенную разработку на Avalonia, а после — ASP .NET.*/}

          {/* Стрелка вниз */}
        <div className="mt-auto mb-5">
          <img
            src={arrow}
            alt="стрелка вниз"
            className="w-auto h-25 animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      <ProjectsSection works={works} />
        <AboutSection />

      <CertificatesSection />

      <ContactsSection />
    </div>
  );
}

export default App;
