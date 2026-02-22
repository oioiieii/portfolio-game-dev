import {useRef, useState} from 'react';
import './App.css';
import './curved-text.scss';
import arrow from './assets/arrow.png';
import {motion, AnimatePresence, animate} from 'framer-motion';
import {FaTelegramPlane, FaEnvelope, FaGithub} from 'react-icons/fa';

function smoothScrollTo(targetY: number) {
  const currentY = window.scrollY;

  animate(currentY, targetY, {
    duration: 0.3, // Чуть увеличил duration для более приятной глазу плавности, но можешь вернуть 0
    ease: 'easeInOut',
    onUpdate(latest) {
      window.scrollTo(0, latest);
    },
  });
}

const text = 'ПОРТФОЛИО';

// 1. Обновленный тип данных для проектов
type Work = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  repoLink?: string;
  domain: 'Game Development' | 'Software Development'; // Направление
  type: 'main' | 'learning'; // Тип проекта
};

// 2. Обновленный массив проектов
const works: Work[] = [
  // --- UNITY УЧЕБНЫЕ ПРОЕКТЫ ---
  {
    id: 1,
    title: 'Изучение основ в Unity',
    description: 'Этот проект был создан в рамках курса Unity Essentials, в котором я познакомился с Unity и научился пользоваться базовыми концепциями.',
    imageUrl: 'works/1.png',
    link: 'https://play.unity.com/en/games/de33abd3-33bd-4283-a338-b701a4110780/essentials-unity',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 2,
    title: 'Подробное изучение шейдеров и материалов',
    description: 'Данный натюрморт был создан в рамках курса Unity Creative Core с созданием собственных материалов и шейдеров.',
    imageUrl: 'works/2.png',
    link: 'https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 3,
    title: 'Пост-обработка в Unity',
    description: 'Проект в котором я использовал различные настройки пост-обработки для улучшения графики и лучшей передачи атмосферы.',
    imageUrl: 'works/3.png',
    link: 'https://play.unity.com/en/games/cabe41de-7c35-4b95-a07f-876cff2972d1/post-processing-project',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 4,
    title: 'Работа со звуком в сцене',
    description: 'В рамках данного проекта я подробно изучил принципы работы аудио в Unity и оживил сцену с помощью звуков.',
    imageUrl: 'works/4.png',
    link: 'https://play.unity.com/en/games/506bc115-ccbf-40f4-8b76-7fd9ae54cd4f/audio-shaders-project',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 5,
    title: 'Итоговый проект',
    description: 'В данном проекте я совместил все накопленные знания, полученные за курс Unity Creative Core, демонстрируя свои способности.',
    imageUrl: 'works/5.png',
    link: 'https://play.unity.com/en/games/2e833b41-05de-4f66-81d6-0398314897f3/alien-video-game-shop',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 6,
    title: 'Знакомство с программированием',
    description: 'В данной работе я познакомился с обработкой ввода и созданием простой игровой логики, а также изучил паттерн Object Pool для оптимизации производительности.',
    imageUrl: 'works/JP_1.png',
    link: 'https://play.unity.com/en/games/3b850cc6-1836-4a56-ae3d-71b4b76445ef/prototype-2',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 7,
    title: 'Анимации и звук',
    description: 'В данной работе я освоил добавление анимаций и звуковых эффектов, сделав игровой процесс более динамичным и выразительным.',
    imageUrl: 'works/JP_2.png',
    link: 'https://play.unity.com/en/games/1000c1e1-5b56-4f37-89f4-255ca40feb99/prototype-3',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 8,
    title: 'Физика и враги',
    description: 'В данной работе я реализовал простую физику объектов, применил корутины для управления процессами и создал базовых врагов с поведением в игре.',
    imageUrl: 'works/JP_3.png',
    link: 'https://play.unity.com/en/games/cad954b7-60fd-480c-a0af-b01f91d73cc7/prototype-4',
    domain: 'Game Development',
    type: 'learning',
  },
  {
    id: 9,
    title: 'UI и выбор сложности',
    description: 'В данной работе я добавил пользовательский интерфейс с отображением счёта и реализовал механику выбора уровня сложности.',
    imageUrl: 'works/JP_4.png',
    link: 'https://play.unity.com/en/games/d5c8bfc7-3c37-4be0-951e-7e3293ecea2f/prototype-5',
    domain: 'Game Development',
    type: 'learning',
  },

  // --- UNITY ГЛАВНЫЕ ПРОЕКТЫ ---
  {
    id: 10,
    title: 'Первый Pet-проект',
    description: 'Это мой первый проект, который я начал после прохождения курсов. Здесь я пока не придерживался грамотной структуры кода, поэтому не стал прикрепялть репозиторий. ',
    imageUrl: 'works/PET_1.png',
    link: 'https://play.unity.com/en/games/a2983509-0187-4fe9-857d-fa4ea6f74d14/personal-project',
    //repoLink: 'https://github.com/OioiiOiiio/First-pet-project',
    domain: 'Game Development',
    type: 'main',
  },
  {
    id: 11,
    title: 'Проект с использованием Zenject',
    description: 'На этом проекте я изучал Zenject. Здесь я уделил больше внимания структуре кода: реализовал различные паттерны проектирования и внедрение зависимостей.',
    imageUrl: 'works/PET_2.png',
    link: 'https://play.unity.com/en/games/f458ed07-916f-4d22-a076-2cd3b9e3e67a/zenject-project',
    repoLink: 'https://github.com/OioiiOiiio/Prototype_1',
    domain: 'Game Development',
    type: 'main',
  },

  // --- C# ГЛАВНЫЕ ПРОЕКТЫ (ЗАГЛУШКИ ДЛЯ ТВОИХ ПРОЕКТОВ) ---
  {
    id: 12,
    title: 'Кроссплатформенное приложение на Avalonia',
    description: 'Приложение на Avalonia Cross-Platform Applications с модулем, отображающим статистику используемых приложений (с категоризацией).',
    imageUrl: 'works/avalonia-uni-app.png',
    repoLink: 'https://github.com/oioiieii/uni-app',
    domain: 'Software Development',
    type: 'main',
  },
  {
    id: 13,
    title: 'Web API на ASP.NET и REACT',
    description: 'Придерживался чистой архитектуры, использования различных сервисов и Entity Framework Core',
    imageUrl: 'works/asp-demo.gif',
    repoLink: 'https://github.com/oioiieii/Congratulator',
    domain: 'Software Development',
    type: 'main',
  },
  {
    id: 14,
    title: 'Сборник лабораторных и курсовых работ',
    description: 'В этом репозитории собраны работы, написанные в рамках курсовых и лабораторных (в основном здесь Windows Forms и WPF).',
    imageUrl: 'works/university-demo.gif',
    repoLink: 'https://github.com/oioiieii/university-projects',
    domain: 'Software Development',
    type: 'learning',
  },
  {
    id: 15,
    title: 'Кастомный контроллер персонажа',
    description: 'Кастомный Character Controller на основе алгоритма Collide and Slide. Сделан, чтобы глубже разобраться в механике управления, а не просто использовать готовые ассеты.',
    imageUrl: 'works/custom-character-controller-demo.gif',
    repoLink: 'https://github.com/oioiieii/custom-character-controller',
    domain: 'Game Development',
    type: 'main',
  },
];

// Константы для навигации
const DOMAINS = ['Software Development', 'Game Development'];
const PROJECT_TYPES = [
  {id: 'main', label: 'Главные проекты'},
  {id: 'learning', label: 'Учебные проекты'},
];

const categoryDescriptions: Record<string, string> = {
  'Game Development-main': 'Мои самостоятельные pet-проекты вне учебных курсов. Здесь можно оценить архитектуру, работу с Zenject и качество кода.',
  'Game Development-learning': 'Работы, созданные во время прохождения путей <b>Essentials</b>, <b>Creative Core</b> и <b>Junior Programmer</b>. Фокус на изучении движка, шейдеров и базовой логики.',
  'Software Development-main': 'Полноценные приложения на C# (Avalonia, ASP.NET), отражающие мой опыт кроссплатформенной и fullstack разработки.',
  'Software Development-learning': 'Учебные задачи, лабораторные работы и алгоритмические проекты из вуза.',
};

type ProjectsSectionProps = {
  works: Work[];
};

function ProjectsSection({works}: ProjectsSectionProps) {
  const [activeDomain, setActiveDomain] = useState<string>(DOMAINS[0]);
  const [activeType, setActiveType] = useState<string>(PROJECT_TYPES[0].id);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    // Небольшая задержка, чтобы React успел перерисовать сетку (если количество элементов изменилось)
    setTimeout(() => {
      if (sectionRef.current) {
        // Получаем позицию элемента относительно вьюпорта + текущую прокрутку
        const rect = sectionRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        // Скроллим к этой позиции с твоим отступом
        smoothScrollTo(absoluteTop);
      }
    }, 50);
  };

  const handleDomainChange = (domain: string) => {
    setActiveDomain(domain);
    scrollToSection();
  };

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    scrollToSection();
  };

  // --- ЛОГИКА СЧЕТЧИКОВ ---
  const getDomainCount = (domain: string) => works.filter(
      w => w.domain === domain).length;

  const getTypeCount = (typeId: string) =>
      works.filter(w => w.domain === activeDomain && w.type === typeId).length;

  const filteredWorks = works.filter(
      (work) => work.domain === activeDomain && work.type === activeType,
  );

  const currentDescriptionKey = `${activeDomain}-${activeType}`;

  return (
      <section ref={sectionRef}
               className="max-w-7xl max-sm:px-6 mx-auto px-6 py-5 min-h-screen flex flex-col relative">
        <h2 className="text-4xl font-bold mb-1 text-center text-lime-400 uppercase tracking-widest">
          Мои проекты
        </h2>
        <div/>
        {/* Полноэкранная панель управления (Toolbar) */}
        <div
            className="sticky top-0 z-50 py-2 md:py-4 mb-8 w-full border-b border-neutral-800 backdrop-blur-md gray-background">
          <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-10">

            {/* 1 УРОВЕНЬ: Главные табы (Domain) — Теперь центрируются на мобилках */}
            <div
                className="flex justify-center md:justify-start w-full md:w-auto shrink-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                  className="flex p-1 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg w-max">
                {DOMAINS.map((domain) => {
                  const isActive = activeDomain === domain;
                  const count = getDomainCount(domain);
                  return (
                      <button
                          key={domain}
                          onClick={() => handleDomainChange(domain)}
                          className={`cursor-pointer relative z-10 px-5 py-2 text-lg md:text-xl font-bold transition-colors duration-200 rounded-lg flex items-center gap-2 md:gap-3 ${
                              isActive ?
                                  'text-neutral-900' :
                                  'text-white hover:text-lime-400'
                          }`}
                      >
                        {isActive && (
                            <motion.div
                                layoutId="activeDomainTab"
                                className="absolute inset-0 bg-lime-400 rounded-lg"
                                transition={{
                                  type: 'spring',
                                  bounce: 0,
                                  duration: 0.3,
                                }}
                            />
                        )}
                        <span
                            className="relative z-20 whitespace-nowrap">{domain}</span>
                        <span
                            className={`relative z-20 text-sm font-bold px-2 py-0.5 rounded-md ${
                                isActive
                                    ?
                                    'bg-neutral-900 text-white'
                                    :
                                    'bg-neutral-800 text-neutral-300 border border-neutral-700/50'
                            }`}>
                {count}
              </span>
                      </button>
                  );
                })}
              </div>
            </div>

            {/* 2 УРОВЕНЬ: Подкатегории (Type) — Теперь центрируются на мобилках */}
            <div
                className="flex justify-center md:justify-start items-center gap-6 md:gap-8 w-full md:w-auto overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
              {/* Метка "Тип проектов" для ПК */}
              <span
                  className="hidden lg:block text-xs uppercase tracking-[0.2em] font-black text-neutral-500 shrink-0"> Тип проектов </span>
              <div className="flex gap-6 md:gap-8 items-center w-max relative">
                {PROJECT_TYPES.map((type) => {
                  const isActive = activeType === type.id;
                  const count = getTypeCount(type.id);
                  return (
                      <button
                          key={type.id}
                          onClick={() => handleTypeChange(type.id)}
                          className={`group relative py-2 flex items-center gap-2.5 transition-colors duration-200 ${
                              isActive ?
                                  'text-lime-400' :
                                  'text-neutral-400 hover:text-white'
                          }`}
                      >
              <span
                  className="text-base md:text-lg font-bold whitespace-nowrap">
                {type.label}
              </span>

                        <span
                            className={`text-xs font-bold transition-opacity ${isActive ?
                                'opacity-100' :
                                'opacity-40'}`}>
                {count}
              </span>

                        {isActive ? (
                            <motion.div
                                layoutId="activeTypeUnderline"
                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime-400 rounded-full "
                                transition={{
                                  type: 'spring',
                                  bounce: 0.2,
                                  duration: 0.4,
                                }}
                            />
                        ) : (
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-neutral-700 transition-all duration-300 group-hover:w-full rounded-full"/>
                        )}
                      </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Описание категории */}
        <AnimatePresence mode="wait">
          {categoryDescriptions[currentDescriptionKey] && (
              <motion.p
                  key={currentDescriptionKey}
                  initial={{opacity: 0, y: -5}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 5}}
                  transition={{duration: 0.2}}
                  className="text-justify text-gray-300 md:text-xl mb-10 px-4"
                  dangerouslySetInnerHTML={{__html: categoryDescriptions[currentDescriptionKey]}}
              />
          )}
        </AnimatePresence>

        {/* Сетка с карточками */}
        <div className="w-full px-4">
          <AnimatePresence mode="wait">
            {filteredWorks.length > 0 ? (
                <motion.div
                    key={currentDescriptionKey}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.4}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 pt-4"
                >
                  {filteredWorks.map(
                      (
                          {id, title, description, imageUrl, link, repoLink},
                          i) => (
                          <motion.div
                              key={id}
                              layout
                              whileHover={{y: -8}}
                              className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-lime-400/50 transition-colors shadow-lg h-full"
                          >
                            <div
                                className="h-48 sm:h-56 w-full overflow-hidden relative bg-neutral-950">
                              <img
                                  src={imageUrl}
                                  alt={title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div
                                  className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-lime-400 px-3 py-1 rounded-lg text-sm font-bold">
                                #{i + 1}
                              </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                              <h3 className="text-2xl font-bold text-lime-400 mb-3 line-clamp-2">
                                {title}
                              </h3>
                              <p className="text-gray-300 mb-6 text-base md:text-lg flex-1 line-clamp-4">
                                {description}
                              </p>

                              {/* Кнопки (прижаты к низу благодаря mt-auto) */}
                              <div className="flex gap-3 mt-auto flex-wrap">
                                {link && (
                                    <a href={link}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex-1 bg-lime-400 hover:bg-lime-500 text-black px-4 py-2.5 rounded-lg font-bold transition text-center text-sm sm:text-base"
                                    >
                                      Играть
                                    </a>
                                )}
                                {repoLink && (
                                    <a href={repoLink}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex-1 bg-transparent border-2 border-lime-400 text-white hover:bg-lime-400/10 px-4 py-2.5 rounded-lg font-bold transition text-center text-sm sm:text-base"
                                    >
                                      Репозиторий
                                    </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                      ))}
                </motion.div>
            ) : (
                <div
                    className="text-center text-neutral-500 py-20 text-xl border-2 border-dashed border-neutral-800 rounded-2xl">
                  Тут пока ничего нет...
                </div>
            )}
          </AnimatePresence>
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
          Я студент 4 курса, старательный, ответственный и быстро обучаемый.
          Коммерческого опыта пока нет, но я активно стремлюсь его получить.
          <br/>
          <br/>
          За годы обучения пробовал себя в разных направлениях: разрабатывал сайты, создавал кроссплатформенные приложения, писал API на ASP.NET, работал с нейронными сетями и активно изучал GameDev. Это позволило мне сформировать широкий технический кругозор и понимание того, как устроены современные системы.
          <br/>
          <br/>
          Если вам покажется, что мне не хватает опыта в конкретной области, буду благодарен за возможность проявить себя — я быстро осваиваю новые технологии и готов углубляться в нужное направление.
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
    title: 'Unity Essentials',
    imageUrl: 'certificates/essentials.png',
    link: 'https://www.credly.com/badges/8a98b48f-e65b-42e0-b2a1-aea095b0a224/public_url',
  },
  {
    id: 2,
    title: 'Unity Creative Core',
    imageUrl: 'certificates/creative-core.png',
    link: 'https://www.credly.com/badges/c5c53d86-3904-4e66-97bf-098e362801fd/public_url',
  },
  {
    id: 3,
    title: 'Unity Junior Programmer',
    imageUrl: 'certificates/junior-programmer.png',
    link: 'https://www.credly.com/badges/bbb46a43-eade-451c-a288-c2c0369fc859/public_url',
  },
];

function CertificatesSection() {
  return (
      <section className="max-w-7xl mx-auto px-6 py-20 text-white">
        <h2 className="text-4xl font-bold mb-5 text-center text-lime-400 uppercase tracking-widest">
          Мои сертификаты
        </h2>
        <p className="text-xl text-gray-100 italic text-center mb-5">
          ПРИМЕЧАНИЕ: без VPN сертификаты могут не открыться.
        </p>
        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-10 justify-items-center ">
          {certificates.map(({id, title, imageUrl, link}) => (
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
                <h3 className="text-2xl font-semibold mb-2 text-center">
                  {title}
                </h3>
                <p className="text-sm italic text-gray-300 text-center">
                  Provided by <span className="font-semibold">Credly</span> in
                  partnership with <span className="font-semibold">Unity Technologies</span>
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
        <div
            className="flex flex-col md:flex-col justify-between items-start md:items-center gap-10">
          <p className="sm:text-2xl text-justify">
            Спасибо, что просмотрели портфолио! Очень надеюсь, что мне удалось
            хоть чем-то заинтересовать вас. Буду рад возможности принести вам
            пользу и применить свои навыки на практике.
          </p>

          <div
              className="flex justify-center max-sm:flex-wrap sm:flex-row gap-4 mx-auto sm:w-auto">
            <a
                href="https://t.me/oioiiei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition"
            >
              <FaTelegramPlane size={25}/>
              @oioiiei
            </a>

            <a
                href="mailto:oioiieii@yandex.ru"
                className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition"
            >
              <FaEnvelope size={25}/>
              oioiieii@yandex.ru
            </a>

            <a
                href="https://github.com/oioiieii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-500 transition"
            >
              <FaGithub size={25}/>
              oioiieii
            </a>
          </div>
        </div>
      </section>
  );
}

function App() {
  return (
      <div className={'max-sm:text-xl'}>
        <div className="min-h-screen flex flex-col items-center justify-start">
          <div className="curved-text text-white absolute top-10">
            {[...text].map((char, i) => (
                <span key={i} className={`char${i + 1} text-center`}>
              {char}
            </span>
            ))}
          </div>

          <div
              className="text-lime-400 mt-45 sm:mt-70 text-[10rem] sm:text-[16rem] leading-none text-center">
            oioii
          </div>

          <div
              className="text-white mt-10 sm:mt-10 sm:text-2xl text-center max-w-5xl mx-auto px-4 mb-10">
            Привет! Я студент 4 курса и активно ищу работу. Буду рад вашим предложениям 🙏🥺
            <br/>
            <br/>
            Ниже вы можете ознакомиться с моими техническими проектами.
          </div>

          <div className="sm:mt-auto mb-5">
            <img
                src={arrow}
                alt="стрелка вниз"
                className="w-auto h-25 animate-bounce"
                style={{animationDuration: '2s'}}
            />
          </div>
        </div>

        <ProjectsSection works={works}/>
        <AboutSection/>
        <CertificatesSection/>
        <ContactsSection/>
      </div>
  );
}

export default App;