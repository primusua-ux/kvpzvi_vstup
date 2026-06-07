// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Theme Toggle Logic
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light-theme') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }


    /* ==========================================================================
       Mobile Navigation Drawer
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });


    /* ==========================================================================
       Stepper (Admissions Wizard)
       ========================================================================== */
    const stepButtons = document.querySelectorAll('.step-nav-item');
    const stepPanes = document.querySelectorAll('.step-pane');

    stepButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stepNum = button.getAttribute('data-step');
            
            // Set active state on button
            stepButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Set active state on pane
            stepPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(`stepPane${stepNum}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            // Scroll so that the stepper navigation remains at the top of the viewport
            const stepperNav = document.querySelector('.stepper-nav');
            if (stepperNav) {
                const targetScrollY = stepperNav.getBoundingClientRect().top + window.scrollY - 95;
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ==========================================================================
       Interactive Defense of Ukraine Quiz
       ========================================================================== */
    const quizQuestions = [
        {
            question: "Який термін дії висновків військово-лікарської комісії (ВЛК) з моменту проходження?",
            options: [
                "6 місяців",
                "12 місяців",
                "24 місяці",
                "5 років"
            ],
            correctIndex: 1,
            explanation: "Відповідно до умов вступу, термін дії висновків ВЛК становить 12 місяців."
        },
        {
            question: "Яке первинне офіцерське звання отримують випускники кафедри військової підготовки?",
            options: [
                "Лейтенант",
                "Сержант",
                "Молодший лейтенант",
                "Капітан"
            ],
            correctIndex: 2,
            explanation: "Випускники, які успішно завершили навчання та склали випускний іспит, отримують первинне звання молодшого лейтенанта запасу."
        },
        {
            question: "Що є першочерговою дією при наданні домедичної допомоги при масивній кровотечі з кінцівки?",
            options: [
                "Промити рану антисептиком",
                "Накласти кровоспинний джгут (турнікет)",
                "Дати знеболювальні таблетки",
                "Накласти звичайну суху пов'язку"
            ],
            correctIndex: 1,
            explanation: "При масивній артеріальній чи венозній кровотечі з кінцівок першим і найважливішим кроком є швидке накладання турнікета для порятунку життя."
        },
        {
            question: "До якого розділу підготовки належить вивчення ТТХ автомата Калашникова та виконання вправ стрільб?",
            options: [
                "Тактична підготовка",
                "Вогнева підготовка",
                "Цивільний захист",
                "Статути Збройних Сил"
            ],
            correctIndex: 1,
            explanation: "Правила стрільби, будова зброї, боєприпасів та ведення вогню вивчаються в межах Вогневої підготовки."
        },
        {
            question: "Яка тривалість практичного навчального збору перед випуском з кафедри військової підготовки?",
            options: [
                "14 діб",
                "20 діб",
                "30 діб",
                "60 діб"
            ],
            correctIndex: 2,
            explanation: "Практична підготовка у формі навчального збору перед випуском проводиться після завершення другого року навчання та триває 30 діб."
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;

    const questionTitle = document.getElementById('questionTitle');
    const quizOptions = document.getElementById('quizOptions');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const quizProgressFill = document.getElementById('quizProgressFill');
    const quizContainer = document.getElementById('quizContainer');
    const quizResults = document.getElementById('quizResults');
    const quizScoreNumber = document.getElementById('quizScoreNumber');
    const quizResultMessage = document.getElementById('quizResultMessage');
    const quizResultText = document.getElementById('quizResultText');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    
    // Audit Additions Elements
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizIntro = document.getElementById('quizIntro');

    function startQuiz() {
        currentQuestionIndex = 0;
        quizScore = 0;
        if (quizIntro) quizIntro.style.display = 'none';
        quizContainer.style.display = 'block';
        quizResults.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        loadQuestion();
    }

    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        // Update progress bar
        const progressPercentage = ((currentQuestionIndex) / quizQuestions.length) * 100;
        quizProgressFill.style.width = `${progressPercentage}%`;
        
        questionTitle.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        quizOptions.innerHTML = '';
        nextQuestionBtn.style.display = 'none';

        currentQuestion.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => selectOption(index));
            quizOptions.appendChild(btn);
        });
    }

    function selectOption(selectedIdx) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const optionButtons = quizOptions.querySelectorAll('.quiz-opt-btn');
        
        // Disable all option buttons
        optionButtons.forEach(btn => btn.disabled = true);

        // Highlight correct and incorrect choices
        if (selectedIdx === currentQuestion.correctIndex) {
            optionButtons[selectedIdx].classList.add('correct');
            quizScore++;
        } else {
            optionButtons[selectedIdx].classList.add('incorrect');
            optionButtons[currentQuestion.correctIndex].classList.add('correct');
        }

        // Show Next button
        nextQuestionBtn.style.display = 'inline-flex';
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    });

    function showQuizResults() {
        quizProgressFill.style.width = '100%';
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
        
        quizScoreNumber.textContent = quizScore;
        
        if (quizScore === 5) {
            quizResultMessage.textContent = "Чудовий результат! 5/5";
            quizResultText.textContent = "Ви чудово володієте базовими знаннями з курсу «Захист України». Ви готові до офіційного тестування!";
        } else if (quizScore >= 3) {
            quizResultMessage.textContent = "Хороший результат! " + quizScore + "/5";
            quizResultText.textContent = "Ваших знань достатньо для подолання прохідного порогу, але ви можете ще покращити свій результат.";
        } else {
            quizResultMessage.textContent = "Спробуйте ще! " + quizScore + "/5";
            quizResultText.textContent = "Матеріали шкільного курсу варто трішки повторити. Ознайомтеся з базовими темами та спробуйте пройти тест ще раз.";
        }
    }

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
    restartQuizBtn.addEventListener('click', startQuiz);

    /* ==========================================================================
       Audit UI Enhancements Handlers
       ========================================================================== */
    
    // Step Pane Transitional Navigation
    const nextStepButtons = document.querySelectorAll('.btn-next-step');
    nextStepButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextStepNum = button.getAttribute('data-next');
            const targetTab = document.querySelector(`.step-nav-item[data-step="${nextStepNum}"]`);
            if (targetTab) {
                targetTab.click();
            }
        });
    });

    // Test Checklist Toggle Checkboxes
    const checkButtons = document.querySelectorAll('.btn-check-test');
    checkButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('checked');
            const parentRow = btn.closest('.method-row');
            if (parentRow) {
                parentRow.classList.toggle('completed');
            }
            
            const icon = btn.querySelector('i');
            if (btn.classList.contains('checked')) {
                icon.className = 'fa-solid fa-square-check';
            } else {
                icon.className = 'fa-regular fa-square';
            }
        });
    });

});
