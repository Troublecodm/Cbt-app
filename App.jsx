import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  GraduationCap,
  Trophy
} from 'lucide-react';

const ALL_QUESTIONS = [
  { id: 1, q: "Who developed C++?", a: ["Bjarne Stroustrup", "James Gosling", "Dennis Ritchie", "Guido van Rossum"], c: 0 },
  { id: 2, q: "C++ is considered what level of language?", a: ["Low-level", "High-level", "Middle-level", "Machine-level"], c: 2 },
  { id: 3, q: "Which of the following is NOT one of the four pillars of OOP?", a: ["Inheritance", "Polymorphism", "Compilation", "Encapsulation"], c: 2 },
  { id: 4, q: "What is the smallest individual unit in a program?", a: ["Variable", "Function", "Token", "Statement"], c: 2 },
  { id: 5, q: "Which operator is used for Modulus in C++?", a: ["/", "*", "#", "%"], c: 3 },
  { id: 6, q: "What is the index of the first element in a C++ array?", a: ["1", "-1", "0", "Any number"], c: 2 },
  { id: 7, q: "A pointer stores what type of value?", a: ["An integer", "A character", "A memory address", "A boolean"], c: 2 },
  { id: 8, q: "Which header file is required for basic Input/Output?", a: ["<stdio.h>", "<iostream>", "<math.h>", "<conio.h>"], c: 1 },
  { id: 9, q: "Which keyword is used to define a constant?", a: ["fixed", "static", "const", "immutable"], c: 2 },
  { id: 10, q: "The 'main' function returns what data type by default?", a: ["void", "int", "float", "char"], c: 1 },
  { id: 11, q: "Which of these is a valid multi-line comment?", a: ["// comment", "/# comment #/", "/* comment */", "-- comment"], c: 2 },
  { id: 12, q: "What does STL stand for?", a: ["Standard Type Library", "Standard Template Library", "System Tool Library", "Standard Text Language"], c: 1 },
  { id: 13, q: "The process of hiding data and functions into a single unit is called:", a: ["Abstraction", "Encapsulation", "Inheritance", "Overloading"], c: 1 },
  { id: 14, q: "Which operator is used to access the value at a pointer's address?", a: ["&", "#", "->", "*"], c: 3 },
  { id: 15, q: "Every C++ statement must end with a:", a: ["Colon", "Period", "Semicolon", "Comma"], c: 2 },
  { id: 16, q: "Which control structure is used for multi-way branching?", a: ["if-else", "switch", "while", "for"], c: 1 },
  { id: 17, q: "In C++, 'auto', 'static', and 'extern' are examples of:", a: ["Data types", "Keywords", "Storage specifiers", "Operators"], c: 2 },
  { id: 18, q: "Which loop is guaranteed to execute at least once?", a: ["for", "while", "do-while", "if"], c: 2 },
  { id: 19, q: "A function that calls itself is known as:", a: ["Nested function", "Inline function", "Recursive function", "Friend function"], c: 2 },
  { id: 20, q: "What is the result of 10 % 3?", a: ["3", "1", "0.33", "0"], c: 1 },
  { id: 21, q: "Which of these is used to create a new line in C++ output?", a: ["\n", "endl", "Both A and B", "None of the above"], c: 2 },
  { id: 22, q: "Arrays in C++ have a _____ dimension.", a: ["Dynamic", "Fixed", "Variable", "Infinite"], c: 1 },
  { id: 23, q: "Which pillar of OOP allows a class to acquire properties of another class?", a: ["Polymorphism", "Inheritance", "Abstraction", "Encapsulation"], c: 1 },
  { id: 24, q: "What is the dereference operator?", a: ["&", "*", "->", "."], c: 1 },
  { id: 25, q: "Which function is used to find the length of a string in C++?", a: ["length()", "size()", "Both are valid", "count()"], c: 2 },
  { id: 26, q: "What does 'cin' represent?", a: ["Console Input", "Character Input", "Code Input", "Central Input"], c: 0 },
  { id: 27, q: "The 'break' statement is commonly used with which structure?", a: ["while", "switch", "for", "All of the above"], c: 3 },
  { id: 28, q: "Which data type is used to store decimal numbers?", a: ["int", "char", "float", "long"], c: 2 },
  { id: 29, q: "True or False: C++ is case sensitive.", a: ["True", "False"], c: 0 },
  { id: 30, q: "What is the escape sequence for a tab space?", a: ["\\s", "\\t", "\\b", "\\n"], c: 1 },
  { id: 31, q: "A class that cannot be instantiated is called:", a: ["Private class", "Abstract class", "Static class", "Base class"], c: 1 },
  { id: 32, q: "Which operator is used to compare two values for equality?", a: ["=", "==", "===", "!="], c: 1 },
  { id: 33, q: "What is the memory size of a 'char' data type in C++?", a: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], c: 0 },
  { id: 34, q: "The '#include' is a:", a: ["Compiler directive", "Preprocessor directive", "Function", "Variable"], c: 1 },
  { id: 35, q: "Which keyword is used to exit from a function?", a: ["exit", "return", "break", "stop"], c: 1 },
  { id: 36, q: "What is the correct syntax for an array declaration?", a: ["int a[10];", "array a(10);", "int a = array(10);", "a[10] int;"], c: 0 },
  { id: 37, q: "Which operator is the address-of operator?", a: ["*", "->", "&", "@"], c: 2 },
  { id: 38, q: "The 'new' operator is used for:", a: ["Static memory", "Dynamic memory", "Deallocating memory", "Creating classes"], c: 1 },
  { id: 39, q: "The 'delete' operator is used to:", a: ["Remove a variable", "Free dynamic memory", "Clear the screen", "Delete a file"], c: 1 },
  { id: 40, q: "Which of these is NOT a valid identifier?", a: ["myVar", "var_1", "1var", "_var"], c: 2 }
];

const App = () => {
  const [gameState, setGameState] = useState('landing'); // landing, quiz, results
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [score, setScore] = useState(0);

  // Shuffle and pick 30 questions
  const startQuiz = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 30));
    setGameState('quiz');
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeft(1200);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'quiz') {
      endQuiz();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const endQuiz = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.c) finalScore++;
    });
    setScore(finalScore);
    setGameState('results');
  };

  const handleAnswer = (optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (gameState === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">CSC 204 CBT</h1>
          <p className="text-slate-500 text-center mb-8">Data Structures & Programming Theory</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <BookOpen className="text-blue-600" size={20} />
              <span className="text-sm font-medium">30 Random Questions</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <Clock className="text-blue-600" size={20} />
              <span className="text-sm font-medium">20 Minutes Duration</span>
            </div>
          </div>
          
          <button 
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Start Session
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'quiz') {
    const q = questions[currentIndex];
    return (
      <div className="min-h-screen bg-white md:bg-slate-50 flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-2xl bg-white md:mt-8 p-4 md:rounded-t-3xl border-b flex justify-between items-center sticky top-0 z-10 shadow-sm md:shadow-none">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question</span>
            <span className="text-lg font-bold text-slate-800">{currentIndex + 1} / 30</span>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl h-1.5 bg-slate-100 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / 30) * 100}%` }}
          />
        </div>

        {/* Question Area */}
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 flex-1 md:flex-none">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
            {q.q}
          </h2>

          <div className="space-y-4">
            {q.a.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  userAnswers[currentIndex] === i 
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  userAnswers[currentIndex] === i ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                }`}>
                  {userAnswers[currentIndex] === i && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-medium text-lg">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="w-full max-w-2xl bg-white p-6 border-t flex justify-between items-center md:rounded-b-3xl mb-8">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="flex items-center gap-2 text-slate-500 disabled:opacity-0 p-2"
          >
            <ChevronLeft /> Previous
          </button>
          
          {currentIndex === 29 ? (
            <button
              onClick={endQuiz}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / 30) * 100);
    const isPass = percentage >= 50;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center border border-slate-200">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isPass ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
              {isPass ? <Trophy size={48} /> : <AlertCircle size={48} />}
            </div>
            <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
            <p className="text-slate-500 mb-8 font-medium">You scored {score} out of 30</p>
            
            <div className="flex justify-around items-center mb-8 bg-slate-50 p-6 rounded-2xl">
              <div>
                <div className="text-4xl font-black text-slate-800">{percentage}%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Accuracy</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <div className={`text-xl font-bold ${isPass ? 'text-green-600' : 'text-orange-600'}`}>
                  {isPass ? 'PASS' : 'NEED REVIEW'}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status</div>
              </div>
            </div>

            <button 
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all"
            >
              <RotateCcw size={20} /> Try New Session
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-blue-500" /> Review Answers
          </h3>
          
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userIdx = userAnswers[idx];
              const isCorrect = userIdx === q.c;
              return (
                <div key={idx} className={`bg-white p-6 rounded-2xl border-l-8 shadow-sm ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <p className="font-bold text-slate-800 mb-4">{idx + 1}. {q.q}</p>
                  <div className="space-y-2">
                    <p className={`text-sm flex items-center gap-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      <span className="font-bold">Your answer:</span> {userIdx !== undefined ? q.a[userIdx] : "Skipped"}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <span className="font-bold">Correct answer:</span> {q.a[q.c]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
