import React, { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [fontSize, setFontSize] = useState("normal");
  const [progress, setProgress] = useState(30);
  const [achievements, setAchievements] = useState([
    { id: 1, name: "Primer Paso", earned: true, icon: "👣" },
    { id: 2, name: "Crítico del Derecho", earned: false, icon: "🔍" },
    { id: 3, name: "Experto en Justicia", earned: false, icon: "⚖️" },
    { id: 4, name: "Defensor de Derechos", earned: false, icon: "🛡️" },
  ]);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [openActivity, setOpenActivity] = useState(null);
  const [quizState, setQuizState] = useState({
    currentQuestion: null,
    answers: [],
    score: 0,
    completed: false,
    feedback: [],
    showFeedback: false
  });
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [scenarioFeedback, setScenarioFeedback] = useState({});

  // Contenido extraído y estructurado desde la guía
  const modules = [
    {
      title: "¿Qué es el Poder Judicial?",
      desc: "Uno de los tres poderes del Estado que hace justicia, resuelve conflictos y hace cumplir las leyes.",
      image: "https://placehold.co/400x200/1e40af/ffffff?text=Poder+Judicial",
      principles: [
        "Independencia: No depende del presidente ni del Congreso.",
        "Imparcialidad: Los jueces no pueden favorecer a ninguna persona.",
        "Legalidad: Solo pueden actuar cuando la ley lo permite.",
        "Responsabilidad: Si un juez actúa mal, puede ser sancionado."
      ],
      activities: [
        "Identificar las funciones del Estado (legislativa, ejecutiva, judicial) y sus órganos.",
        "Crear un cartel comparativo entre los tres poderes del Estado.",
        "Debate en clase: ¿Por qué es importante que el Poder Judicial sea independiente?",
        "Redactar un párrafo explicando por qué la justicia debe ser imparcial."
      ],
      resources: [
        "Video explicativo: 'Los tres poderes del Estado'",
        "Lectura corta: '¿Qué es el Estado de Derecho?'",
        "Mapa mental interactivo: funciones del Estado",
        "Infografía: Principios del Poder Judicial"
      ]
    },
    {
      title: "Estructura del Poder Judicial",
      desc: "Conoce la Corte Suprema, Cortes de Apelaciones y tribunales de primera instancia.",
      image: "https://placehold.co/400x200/059669/ffffff?text=Estructura+Judicial",
      structure: [
        "Corte Suprema (Santiago): Revisa errores legales (recurso de casación), juzga a autoridades y supervisa la justicia.",
        "Cortes de Apelaciones (17 regiones): Revisan fallos de tribunales inferiores y resuelven recursos.",
        "Tribunales de Primera Instancia: Son el primer nivel de justicia (civil, penal, familia, trabajo)."
      ],
      tribunals: [
        "Juzgados de Letras: Civil, contratos, herencias, desalojos.",
        "Juzgados de Garantía: Controlan investigaciones penales y derechos en detenciones.",
        "Tribunales de Juicio Oral: Juzgan delitos graves con juicios orales.",
        "Juzgados de Familia: Divorcios, pensiones, violencia intrafamiliar.",
        "Juzgados del Trabajo: Despidos, accidentes, conflictos laborales.",
        "Tribunales Militares y Ambientales: Casos especiales."
      ],
      activities: [
        "Clasificar tribunales según su competencia (penal, civil, laboral, etc.).",
        "Crear una pirámide jerárquica del Poder Judicial con cartulina o herramienta digital.",
        "Simular una audiencia de control de detención en clase (Juzgado de Garantía).",
        "Investigar: ¿Cuántas Cortes de Apelaciones hay en Chile y dónde están ubicadas?"
      ],
      resources: [
        "Diagrama interactivo: Estructura del Poder Judicial",
        "Juego de roles: Simulación de juicio oral",
        "Infografía: Competencias de los tribunales",
        "Guía de trabajo: 'Conoce tu tribunal local'"
      ]
    },
    {
      title: "Reforma Procesal Penal",
      desc: "Sistema acusatorio, juicios orales, participación ciudadana y protección de derechos.",
      image: "https://placehold.co/400x200/7c3aed/ffffff?text=Reforma+Penal",
      features: [
        "Juicios orales y públicos: más transparencia y rapidez.",
        "Separación de funciones: Fiscalía investiga, jueces garantizan derechos, defensores protegen imputados.",
        "Derecho a defensa y participación ciudadana (testigos, peritos).",
        "Fortalece el Estado de Derecho y la confianza en la justicia."
      ],
      importance: [
        "Moderniza la justicia penal.",
        "Protege derechos humanos de imputados, víctimas y testigos.",
        "Hace los procesos más justos y accesibles."
      ],
      activities: [
        "Analizar un caso real de juicio oral (video o noticia) y describir las etapas.",
        "Debate: ¿Es justo que un imputado tenga derecho a defensa gratuita?",
        "Crear un video corto explicando las ventajas de la reforma penal.",
        "Diseñar una campaña de concienciación sobre los derechos en un juicio."
      ],
      resources: [
        "Documental: 'La Reforma Procesal Penal en Chile'",
        "Casos reales: Juicios orales destacados",
        "Artículo: '¿Cómo cambió la justicia penal?'",
        "Plantilla para storyboard de video educativo"
      ]
    },
    {
      title: "Recursos Judiciales",
      desc: "Herramientas para defender tus derechos: protección, amparo, apelación, casación.",
      image: "https://placehold.co/400x200/dc2626/ffffff?text=Recursos+Judiciales",
      resourcesList: [
        "Recurso de Protección: Si te violan un derecho constitucional (libertad, integridad, etc.).",
        "Recurso de Amparo: Si estás detenido ilegalmente.",
        "Recurso de Apelación: Para pedir que otro tribunal revise un fallo.",
        "Recurso de Casación: Para corregir errores de derecho en una sentencia."
      ],
      howTo: [
        "Presentar una demanda o denuncia ante el tribunal competente.",
        "El tribunal revisa y admite la causa.",
        "Se realizan audiencias, se presentan pruebas y testigos.",
        "El juez dicta sentencia. Si no estás de acuerdo, puedes apelar."
      ],
      activities: [
        "Simular un recurso de amparo: un estudiante es detenido sin razón y otro lo presenta.",
        "Crear un cuadro comparativo entre los recursos judiciales.",
        "Resolver situaciones hipotéticas: ¿Qué recurso usarías en cada caso?",
        "Entrevistar a un adulto sobre si alguna vez usó un recurso judicial."
      ],
      resources: [
        "Guía práctica: '¿Cómo presentar un recurso?'",
        "Escenarios hipotéticos para análisis",
        "Ficha técnica: Recursos judiciales paso a paso",
        "Enlace a sitio oficial del Poder Judicial (para investigación)"
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "¿Cuál es la función principal del Poder Judicial?",
      options: [
        "Hacer leyes",
        "Aplicar y hacer justicia",
        "Ejecutar políticas públicas",
        "Controlar elecciones"
      ],
      correct: 1,
      explanation: "El Poder Judicial se encarga de hacer justicia, resolver conflictos y hacer cumplir las leyes."
    },
    {
      question: "¿Qué tribunal revisa errores legales en sentencias mediante el recurso de casación?",
      options: [
        "Juzgado de Garantía",
        "Corte de Apelaciones",
        "Corte Suprema",
        "Tribunal de Juicio Oral"
      ],
      correct: 2,
      explanation: "La Corte Suprema revisa errores legales en sentencias a través del recurso de casación."
    },
    {
      question: "¿Qué recurso judicial se utiliza si una persona es detenida sin orden ni justificación?",
      options: [
        "Recurso de Protección",
        "Recurso de Casación",
        "Recurso de Amparo",
        "Recurso de Apelación"
      ],
      correct: 2,
      explanation: "El Recurso de Amparo protege a una persona detenida ilegalmente."
    },
    {
      question: "¿Qué caracteriza al nuevo sistema penal tras la reforma procesal penal?",
      options: [
        "Procesos escritos y secretos",
        "Juicios orales, públicos y con separación de funciones",
        "Solo jueces deciden sin testigos",
        "No hay derecho a defensa"
      ],
      correct: 1,
      explanation: "La reforma procesal penal introdujo juicios orales, públicos y con separación de funciones."
    },
    {
      question: "¿Qué tribunal juzga delitos graves como homicidio o robo con violencia?",
      options: [
        "Juzgado de Garantía",
        "Corte Suprema",
        "Tribunal de Juicio Oral en lo Penal",
        "Juzgado de Policía Local"
      ],
      correct: 2,
      explanation: "Los Tribunales de Juicio Oral en lo Penal juzgan delitos graves mediante juicios orales."
    }
  ];

  const interactiveActivities = [
    {
      id: 1,
      title: "Clasifica los Tribunales",
      description: "Arrastra cada tribunal a su categoría correcta.",
      type: "drag-drop",
      items: [
        { text: "Corte Suprema", category: "Superior" },
        { text: "Juzgado de Garantía", category: "Primera Instancia" },
        { text: "Tribunal Ambiental", category: "Especial" },
        { text: "Juzgado de Familia", category: "Primera Instancia" },
        { text: "Corte de Apelaciones", category: "Superior" }
      ],
      categories: ["Superior", "Primera Instancia", "Especial"]
    },
    {
      id: 2,
      title: "¿Qué Recurso Judicial Usarías?",
      description: "Lee cada situación y selecciona el recurso adecuado.",
      type: "scenario",
      scenarios: [
        {
          text: "Tu amigo fue detenido sin una orden ni razón. ¿Qué recurso se puede presentar?",
          options: ["Recurso de Protección", "Recurso de Amparo", "Recurso de Apelación", "Recurso de Casación"],
          correct: 1
        },
        {
          text: "Un vecino tala un árbol protegido en un parque. ¿Qué recurso puede presentarse?",
          options: ["Recurso de Protección", "Recurso de Amparo", "Recurso de Casación", "Recurso de Apelación"],
          correct: 0
        }
      ]
    },
    {
      id: 3,
      title: "Verdadero o Falso: Principios del Poder Judicial",
      description: "Evalúa si las afirmaciones son verdaderas o falsas.",
      type: "true-false",
      statements: [
        { text: "El Poder Judicial depende del Presidente de la República.", correct: false },
        { text: "Los jueces deben ser imparciales.", correct: true },
        { text: "La Corte Suprema solo está en Santiago.", correct: true },
        { text: "El Ministerio Público forma parte del Poder Judicial.", correct: false }
      ]
    }
  ];

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    const savedFont = localStorage.getItem("fontSize") || "normal";
    setDarkMode(savedMode);
    setFontSize(savedFont);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleFontChange = (size) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
  };

  const fontClasses = {
    small: "text-sm",
    normal: "text-base",
    large: "text-lg",
  };

  const startQuickQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: new Array(quizQuestions.length).fill(null),
      score: 0,
      completed: false,
      feedback: new Array(quizQuestions.length).fill(null),
      showFeedback: false
    });
  };

  const selectAnswer = (index) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = index;
    setQuizState(prev => ({ ...prev, answers: newAnswers }));

    // Mostrar retroalimentación inmediata si es incorrecta
    if (index !== quizQuestions[quizState.currentQuestion].correct) {
      setQuizState(prev => ({ ...prev, showFeedback: true }));
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestion: prev.currentQuestion + 1,
        showFeedback: false 
      }));
    } else {
      submitQuickQuiz();
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestion: prev.currentQuestion - 1,
        showFeedback: false 
      }));
    }
  };

  const submitQuickQuiz = () => {
    // Validación: asegurarse de que todas las preguntas tengan respuesta
    const allAnswered = quizState.answers.every(ans => ans !== null);
    if (!allAnswered) {
      alert("Por favor, responde todas las preguntas antes de finalizar.");
      return;
    }

    let score = 0;
    const feedback = quizState.answers.map((ans, i) => {
      const isCorrect = ans === quizQuestions[i].correct;
      if (isCorrect) score++;
      return isCorrect;
    });

    setQuizState(prev => ({
      ...prev,
      score,
      completed: true,
      feedback,
      showFeedback: false
    }));

    // Actualizar progreso y logros
    setProgress(75);
    setAchievements(prev =>
      prev.map(a =>
        a.id === 2 ? { ...a, earned: true } : a
      )
    );
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: null,
      answers: [],
      score: 0,
      completed: false,
      feedback: [],
      showFeedback: false
    });
  };

  const goToQuizComponent = () => {
    setQuizState({
      currentQuestion: null,
      answers: [],
      score: 0,
      completed: false,
      feedback: [],
      showFeedback: false
    });
    setScenarioAnswers({});
    setScenarioFeedback({});
    setOpenActivity(null);
    setActiveTab("quiz");
  };

  const handleScenarioAnswer = (index, questionIdx) => {
    setScenarioAnswers(prev => ({
      ...prev,
      [questionIdx]: index
    }));
  };

  const submitScenarioActivity = () => {
    const feedback = {};
    let score = 0;
    const total = interactiveActivities[1].scenarios.length;

    interactiveActivities[1].scenarios.forEach((scenario, idx) => {
      const userAnswer = scenarioAnswers[idx];
      const isCorrect = userAnswer === scenario.correct;
      feedback[idx] = isCorrect;
      if (isCorrect) score++;
    });

    setScenarioFeedback(feedback);

    // Mostrar puntaje
    setTimeout(() => {
      alert(`¡Actividad completada! ${score} de ${total} respuestas correctas.`);
      goToQuizComponent();
    }, 500);
  };

  const swipeLeft = () => {
    setSwipeIndex((prev) => (prev + 1) % modules.length);
  };

  const swipeRight = () => {
    setSwipeIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      {/* Header */}
      <header className={`px-6 py-4 ${darkMode ? "bg-gray-800" : "bg-white"} backdrop-blur-md bg-opacity-80 shadow-sm flex justify-between items-center`}>
        <div className="flex items-center space-x-3">
          <img src="https://placehold.co/100x40/000/000?text=PACE" alt="PACE Logo" className="h-10" />
          <h1 className={`font-bold ${fontClasses[fontSize]} tracking-tight`}>Justicia Educativa</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Main Layout */}
      <main className="flex flex-col md:flex-row">
        {/* Sidebar (Web) */}
        <aside className={`hidden md:block w-64 p-6 ${darkMode ? "bg-gray-800" : "bg-white"} backdrop-blur-md bg-opacity-90 min-h-screen`}>
          <nav className="space-y-2">
            {[
              { id: "home", label: "Inicio", icon: "🏠" },
              { id: "modules", label: "Módulos", icon: "📚" },
              { id: "quiz", label: "Quiz", icon: "🧠" },
              { id: "profile", label: "Perfil", icon: "👤" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all transform hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white shadow-lg"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8">
            <p className="text-sm opacity-70 mb-2">Tamaño de texto</p>
            <div className="flex space-x-2">
              {["small", "normal", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontChange(size)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    fontSize === size
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                >
                  {size === "small" ? "A" : size === "normal" ? "Aa" : "AaA"}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 ${fontClasses[fontSize]} transition-all`}>
          {activeTab === "home" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Bienvenido/a al Aula Digital</h2>
              
              <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <h3 className="text-xl font-bold mb-3">Sobre esta App</h3>
                <p className="mb-4">
                  Esta aplicación educativa está diseñada para estudiantes de <strong>Tercero Medio</strong> 
                  y busca facilitar el aprendizaje sobre la estructura, funciones y principios del Poder Judicial en Chile.
                </p>
                <p>
                  A través de actividades interactivas, módulos dinámicos y evaluaciones formativas, 
                  los estudiantes fortalecerán su comprensión del sistema judicial y su rol en la democracia.
                </p>
              </div>

              {/* Objetivos de Aprendizaje */}
              <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <h3 className="text-xl font-bold mb-3">Objetivos de Aprendizaje</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span><strong>OA1:</strong> Conocer el funcionamiento del sistema judicial chileno y valorar su rol en la protección de los derechos y en la resolución de conflictos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span><strong>Indicador 1:</strong> Identifica las principales funciones del Estado (legislativa, ejecutiva y judicial) y los órganos encargados de cumplirlas.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span><strong>Indicador 2:</strong> Distingue los diversos tribunales existentes en el país y sus respectivas competencias.</span>
                  </li>
                </ul>
              </div>

              {/* Habilidades del Siglo XXI */}
              <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <h3 className="text-xl font-bold mb-3">Habilidades del Siglo XXI</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-cyan-600 dark:text-cyan-400">🧠 Pensamiento Crítico</h4>
                    <p className="text-sm opacity-80">Analiza situaciones jurídicas, evalúa decisiones judiciales y argumenta con fundamento legal.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-600 dark:text-teal-400">🤝 Responsabilidad Social e Individual</h4>
                    <p className="text-sm opacity-80">Reconoce la importancia de respetar las leyes, ejercer derechos y contribuir a una sociedad justa y democrática.</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progreso del curso</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-teal-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Access Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {modules.map((mod, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl bg-white dark:bg-gray-800 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition transform hover:scale-105`}
                    onClick={() => setActiveTab("modules")}
                  >
                    <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                    <p className="opacity-80 mb-4">{mod.desc}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Actividades: {mod.activities.length}</span>
                      <span className="text-sm">Recursos: {mod.resources.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div className="space-y-6">
              <button
                onClick={() => setActiveTab("home")}
                className="text-cyan-500 hover:underline mb-4 flex items-center"
              >
                ← Volver al inicio
              </button>

              <h2 className="text-2xl font-bold">Módulos Interactivos</h2>

              {/* Swipeable Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <button
                  onClick={swipeRight}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  ←
                </button>
                <button
                  onClick={swipeLeft}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  →
                </button>

                <div
                  className="w-full h-auto flex items-start justify-center transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${swipeIndex * 100}%)` }}
                >
                  {modules.map((mod, i) => (
                    <div key={i} className="w-full p-6 flex flex-col">
                      <h3 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">{mod.title}</h3>
                      <p className="mb-6 text-lg">{mod.desc}</p>

                      {mod.principles && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3">Principios del Poder Judicial</h4>
                          <ul className="space-y-2">
                            {mod.principles.map((p, idx) => (
                              <li key={idx} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-sm">
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mod.structure && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3">Estructura del Poder Judicial</h4>
                          <ul className="space-y-2">
                            {mod.structure.map((s, idx) => (
                              <li key={idx} className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-lg text-sm">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mod.features && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3">Características de la Reforma</h4>
                          <ul className="space-y-2">
                            {mod.features.map((f, idx) => (
                              <li key={idx} className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-sm">
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {mod.resourcesList && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3">Recursos Judiciales</h4>
                          <ul className="space-y-2">
                            {mod.resourcesList.map((r, idx) => (
                              <li key={idx} className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg text-sm">
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-lg mb-3">Actividades Propuestas</h4>
                        <ul className="space-y-2 mb-4">
                          {mod.activities.map((act, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-cyan-500 mt-1">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-bold text-lg mb-3">Recursos Didácticos</h4>
                        <ul className="space-y-2">
                          {mod.resources.map((res, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-teal-500 mt-1">•</span>
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setActiveTab("home")}
                className="text-cyan-500 hover:underline mb-4 flex items-center"
              >
                ← Volver
              </button>

              <h2 className="text-2xl font-bold mb-6">Actividades Evaluativas</h2>

              {!openActivity && quizState.currentQuestion === null && !quizState.completed ? (
                <div className="space-y-6">
                  {/* Quick Quiz */}
                  <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                    <h3 className="text-xl font-bold mb-3">Quiz Rápido</h3>
                    <p className="mb-4 opacity-80">Responde 5 preguntas sobre el sistema judicial chileno.</p>
                    <button
                      onClick={startQuickQuiz}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition transform hover:scale-105"
                    >
                      Iniciar Quiz
                    </button>
                  </div>

                  {/* Interactive Activities */}
                  {interactiveActivities.map((act) => (
                    <div key={act.id} className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                      <h3 className="text-xl font-bold mb-2">{act.title}</h3>
                      <p className="mb-4 opacity-80">{act.description}</p>
                      <button
                        onClick={() => setOpenActivity(act.id)}
                        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition transform hover:scale-105"
                      >
                        Realizar Actividad
                      </button>
                    </div>
                  ))}
                </div>
              ) : quizState.currentQuestion !== null ? (
                <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                  <div className="mb-4">
                    <span className="text-sm opacity-70">
                      Pregunta {quizState.currentQuestion + 1} de {quizQuestions.length}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-6">{quizQuestions[quizState.currentQuestion].question}</h3>
                  <div className="space-y-3 mb-6">
                    {quizQuestions[quizState.currentQuestion].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => selectAnswer(i)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                          quizState.answers[quizState.currentQuestion] === i
                            ? quizQuestions[quizState.currentQuestion].correct === i
                              ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                              : "border-red-500 bg-red-50 dark:bg-red-900/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-cyan-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Retroalimentación inmediata si la respuesta es incorrecta */}
                  {quizState.answers[quizState.currentQuestion] !== null && 
                   quizState.answers[quizState.currentQuestion] !== quizQuestions[quizState.currentQuestion].correct &&
                   quizState.showFeedback && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-bold text-red-700 dark:text-red-300">¡Respuesta incorrecta!</h4>
                      <p className="text-red-600 dark:text-red-200">
                        <strong>La correcta es:</strong> {quizQuestions[quizState.currentQuestion].options[quizQuestions[quizState.currentQuestion].correct]}
                      </p>
                      <p className="text-red-600 dark:text-red-200 mt-1 text-sm">
                        {quizQuestions[quizState.currentQuestion].explanation}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      disabled={quizState.currentQuestion === 0}
                      className="px-4 py-2 opacity-70 hover:opacity-100 disabled:opacity-40"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={quizState.answers[quizState.currentQuestion] === null}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white rounded-xl transition"
                    >
                      {quizState.currentQuestion === quizQuestions.length - 1 ? "Finalizar" : "Siguiente"}
                    </button>
                  </div>
                </div>
              ) : quizState.completed ? (
                <div className={`p-8 text-center rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg animate-fade-in`}>
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold mb-4">Resultado del Quiz</h3>
                  <div className="space-y-2 mb-6 text-lg">
                    <p className="text-green-600 dark:text-green-400">
                      ✅ <strong>{quizState.score} Respuestas correctas</strong>
                    </p>
                    <p className="text-red-600 dark:text-red-400">
                      ❌ <strong>{quizQuestions.length - quizState.score} Respuestas incorrectas</strong>
                    </p>
                  </div>
                  <p className="mb-6 opacity-80">
                    {quizState.score === 5 
                      ? "¡Excelente! Dominas completamente el tema del Poder Judicial." 
                      : quizState.score >= 3 
                        ? "¡Buen trabajo! Tienes una buena comprensión del sistema judicial." 
                        : "Sigue estudiando. Revisa los módulos para reforzar tus conocimientos."}
                  </p>
                  <button
                    onClick={goToQuizComponent}
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition transform hover:scale-105"
                  >
                    Volver a actividades
                  </button>
                </div>
              ) : openActivity ? (
                <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                  <button
                    onClick={() => setOpenActivity(null)}
                    className="mb-4 text-cyan-500 hover:underline"
                  >
                    ← Volver a actividades
                  </button>
                  <h3 className="text-2xl font-bold mb-4">
                    {interactiveActivities.find(a => a.id === openActivity)?.title}
                  </h3>
                  <p className="mb-6 opacity-80">
                    {interactiveActivities.find(a => a.id === openActivity)?.description}
                  </p>

                  {/* Simulated Drag & Drop */}
                  {openActivity === 1 && (
                    <div className="space-y-4">
                      {interactiveActivities[0].categories.map(cat => (
                        <div key={cat} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-20">
                          <h4 className="font-bold mb-2">{cat}</h4>
                          <div className="space-y-2">
                            {interactiveActivities[0].items
                              .filter(item => item.category === cat)
                              .map(item => (
                                <div key={item.text} className="bg-cyan-100 dark:bg-cyan-900/50 p-2 rounded text-sm">
                                  {item.text} ✅
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                      <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl">
                        Verificar Respuestas
                      </button>
                    </div>
                  )}

                  {/* Scenario Selection */}
                  {openActivity === 2 && (
                    <div className="space-y-6">
                      {interactiveActivities[1].scenarios.map((s, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <p className="font-medium mb-3">{s.text}</p>
                          <div className="space-y-2">
                            {s.options.map((opt, i) => (
                              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name={`scenario-${idx}`} 
                                  className="text-cyan-500" 
                                  checked={scenarioAnswers[idx] === i}
                                  onChange={() => handleScenarioAnswer(i, idx)}
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                          {scenarioFeedback[idx] !== undefined && (
                            <div className={`mt-2 text-sm ${scenarioFeedback[idx] ? 'text-green-600' : 'text-red-600'}`}>
                              {scenarioFeedback[idx] 
                                ? '✅ Correcto' 
                                : `❌ Incorrecto. La respuesta correcta es: ${s.options[s.correct]}`}
                            </div>
                          )}
                        </div>
                      ))}
                      <button 
                        onClick={submitScenarioActivity}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition transform hover:scale-105"
                      >
                        Enviar Respuestas
                      </button>
                    </div>
                  )}

                  {/* True/False */}
                  {openActivity === 3 && (
                    <div className="space-y-4">
                      {interactiveActivities[2].statements.map((s, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <p className="mb-3">{s.text}</p>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name={`tf-${idx}`} className="text-cyan-500" />
                              <span>Verdadero</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name={`tf-${idx}`} className="text-cyan-500" />
                              <span>Falso</span>
                            </label>
                          </div>
                        </div>
                      ))}
                      <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl">
                        Corregir
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setActiveTab("home")}
                className="text-cyan-500 hover:underline mb-4 flex items-center"
              >
                ← Volver
              </button>

              <h2 className="text-2xl font-bold mb-6">Tu Perfil</h2>

              <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg mb-6`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold">Estudiante</h3>
                    <p className="text-sm opacity-70">Nivel intermedio</p>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">🏆</span>
                  Logros
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl text-center border-2 transition ${
                        ach.earned
                          ? "border-teal-400 bg-teal-50 dark:bg-teal-900/30 transform hover:scale-105"
                          : "border-gray-200 dark:border-gray-700 opacity-60"
                      }`}
                    >
                      <div className="text-3xl mb-1">{ach.icon}</div>
                      <p className="text-sm font-medium">{ach.name}</p>
                      {ach.earned && <span className="text-xs text-green-500">✔️ Desbloqueado</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${darkMode ? "bg-gray-800" : "bg-white"} backdrop-blur-md bg-opacity-95 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} px-4 py-2 flex justify-around`}>
        {[
          { id: "home", label: "Inicio", icon: "🏠" },
          { id: "modules", label: "Módulos", icon: "📚" },
          { id: "quiz", label: "Quiz", icon: "🧠" },
          { id: "profile", label: "Perfil", icon: "👤" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`py-2 px-3 rounded-lg text-sm flex flex-col items-center transition ${
              activeTab === item.id
                ? "text-cyan-500 scale-110"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <footer className={`text-center py-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Creado por Christian Núñez Vega, Asesor Pedagógico, Programa PACE-UDA, 2025.
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}