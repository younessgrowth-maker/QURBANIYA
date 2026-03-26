"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    question: "C'est pour toi ou pour offrir ?",
    options: [
      { label: "Pour moi", value: "moi" },
      { label: "Offrir à un proche", value: "offrir" },
    ],
  },
  {
    question: "Quel type de sacrifice ?",
    options: [
      { label: "Aïd al-Adha", value: "aid" },
      { label: "Aqiqa", value: "aqiqa" },
      { label: "Sadaqa", value: "sadaqa" },
    ],
  },
  {
    question: "Combien de personnes dans ton foyer ?",
    options: [
      { label: "1 à 3", value: "small" },
      { label: "4 à 6", value: "medium" },
      { label: "7+", value: "large" },
    ],
  },
];

function getRecommendation(answers: string[]) {
  const qty = answers[2] === "large" ? 2 : 1;
  const price = qty * 129;
  const meals = qty * 15;
  const type = answers[1] === "aid" ? "Aïd al-Adha" : answers[1] === "aqiqa" ? "Aqiqa" : "Sadaqa";
  const forWhom = answers[0] === "offrir" ? "en cadeau" : "pour toi";

  return { qty, price, meals, type, forWhom };
}

export default function SacrificeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? getRecommendation(answers) : null;

  return (
    <section className="bg-bg-primary section-padding dot-pattern" id="quiz">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="QUEL SACRIFICE EST FAIT POUR TOI ?"
          accent="POUR TOI"
          subtitle="Réponds à 3 questions rapides et reçois ta recommandation personnalisée."
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-elevated overflow-hidden">
          {/* Progress */}
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: showResult ? "100%" : `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xs text-text-muted-light font-inter mb-2 uppercase tracking-wider">
                    Question {step + 1}/{questions.length}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-text-primary font-playfair mb-6">
                    {questions[step].question}
                  </h3>

                  <div className="space-y-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 font-inter font-medium text-text-primary"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="text-4xl mb-4 block">🐑</span>
                  <h3 className="text-xl font-bold text-text-primary font-playfair mb-2">
                    Notre recommandation {result.forWhom}
                  </h3>
                  <p className="text-text-muted font-inter mb-6">
                    {result.qty} mouton{result.qty > 1 ? "s" : ""} {result.type} · <strong className="text-gold">{result.price}€</strong> · = {result.meals} repas distribués
                  </p>

                  <Link href="/commander">
                    <Button size="lg" variant="secondary" className="uppercase glow-pulse">
                      Réserver cette offre →
                    </Button>
                  </Link>

                  <button onClick={reset} className="text-text-muted-light text-sm mt-4 hover:text-text-muted transition-colors block mx-auto">
                    Recommencer le quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
