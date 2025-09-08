(function() {
  const ATTEMPTS_KEY = 'saebAttempts';
  const AGG_KEY = 'saebStats'; // backward compatibility
  const BENCH_KEY = 'saebBenchmarks';

  const defaultBenchmarks = {
    overall: 60,
    matematica: 60,
    portugues: 60
  };

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore quota errors
    }
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function msToMinutes(ms) {
    return Math.round(ms / 60000);
  }

  function computeAreasFromQuestions(questions) {
    const areaTotals = {};
    (questions || []).forEach(q => {
      const area = (q && q.area) ? q.area : 'Geral';
      if (!areaTotals[area]) areaTotals[area] = { correct: 0, total: 0 };
      areaTotals[area].total += 1;
      if (q && q.correct) areaTotals[area].correct += 1;
    });
    return areaTotals;
  }

  function updateLegacyAggregates(agg, attempt) {
    agg.quizzesCompleted = (agg.quizzesCompleted || 0) + 1;
    agg.totalMinutes = (agg.totalMinutes || 0) + msToMinutes(attempt.durationMs || 0);
    agg.overallCorrect = (agg.overallCorrect || 0) + (attempt.correctCount || 0);
    agg.overallTotal = (agg.overallTotal || 0) + (attempt.totalQuestions || 0);
    if (attempt.subject === 'matematica') {
      agg.mathCorrect = (agg.mathCorrect || 0) + (attempt.correctCount || 0);
      agg.mathTotal = (agg.mathTotal || 0) + (attempt.totalQuestions || 0);
    }
    if (attempt.subject === 'portugues') {
      agg.portCorrect = (agg.portCorrect || 0) + (attempt.correctCount || 0);
      agg.portTotal = (agg.portTotal || 0) + (attempt.totalQuestions || 0);
    }

    const passed = (attempt.correctCount || 0) >= Math.ceil((attempt.totalQuestions || 0) * 0.7);
    agg.currentStreak = passed ? (agg.currentStreak || 0) + 1 : 0;
    agg.bestStreak = Math.max(agg.bestStreak || 0, agg.currentStreak || 0);

    const overallPct = Math.round(((agg.overallCorrect || 0) / Math.max(1, (agg.overallTotal || 0))) * 100);
    if (overallPct >= 90) agg.ranking = 'Lendário';
    else if (overallPct >= 75) agg.ranking = 'Pro';
    else if (overallPct >= 50) agg.ranking = 'Intermediário';
    else agg.ranking = 'Iniciante';

    return agg;
  }

  function computeAggregates(attempts) {
    const aggregates = {
      overall: { correct: 0, total: 0 },
      bySubject: { matematica: { correct: 0, total: 0, attempts: 0 }, portugues: { correct: 0, total: 0, attempts: 0 } },
      byArea: {},
      time: { totalMs: 0, totalQuestions: 0 }
    };

    const questionAccuracy = {}; // by question id/text

    (attempts || []).forEach(a => {
      aggregates.overall.correct += a.correctCount || 0;
      aggregates.overall.total += a.totalQuestions || 0;
      if (a.subject && aggregates.bySubject[a.subject]) {
        aggregates.bySubject[a.subject].correct += a.correctCount || 0;
        aggregates.bySubject[a.subject].total += a.totalQuestions || 0;
        aggregates.bySubject[a.subject].attempts += 1;
      }
      const areas = a.areas || computeAreasFromQuestions(a.questions);
      Object.keys(areas).forEach(area => {
        if (!aggregates.byArea[area]) aggregates.byArea[area] = { correct: 0, total: 0 };
        aggregates.byArea[area].correct += areas[area].correct || 0;
        aggregates.byArea[area].total += areas[area].total || 0;
      });
      (a.questions || []).forEach(q => {
        if (!q) return;
        const key = q.id || (q.text && q.text.slice(0, 80)) || 'Q';
        if (!questionAccuracy[key]) questionAccuracy[key] = { correct: 0, total: 0, area: q.area || 'Geral' };
        questionAccuracy[key].total += 1;
        if (q.correct) questionAccuracy[key].correct += 1;
        if (typeof q.timeMs === 'number') {
          aggregates.time.totalMs += q.timeMs;
          aggregates.time.totalQuestions += 1;
        }
      });
    });

    const hardestQuestions = Object.keys(questionAccuracy)
      .map(k => ({ id: k, accuracy: Math.round((questionAccuracy[k].correct / Math.max(1, questionAccuracy[k].total)) * 100), attempts: questionAccuracy[k].total, area: questionAccuracy[k].area }))
      .filter(q => q.attempts >= 2)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const avgTimeMs = aggregates.time.totalQuestions > 0 ? Math.round(aggregates.time.totalMs / aggregates.time.totalQuestions) : 0;

    return { aggregates, hardestQuestions, avgTimeMs };
  }

  function getBenchmarks() {
    const user = readJSON(BENCH_KEY, {});
    return { ...defaultBenchmarks, ...user };
  }

  function percent(correct, total) {
    return Math.round((correct / Math.max(1, total)) * 100);
  }

  function summarizeAttempts(attempts) {
    return (attempts || []).map(a => ({
      id: a.id,
      subject: a.subject,
      finishedAt: a.finishedAt,
      percent: a.percent,
      durationMin: msToMinutes(a.durationMs || 0)
    }));
  }

  function generateInsights(aggregates, hardestQuestions) {
    const insights = [];

    // Weakest areas
    const areaEntries = Object.entries(aggregates.byArea || {}).map(([area, v]) => ({ area, pct: percent(v.correct, v.total), total: v.total }));
    areaEntries.sort((a, b) => a.pct - b.pct);
    const weakestAreas = areaEntries.filter(a => a.total >= 3).slice(0, 3);
    if (weakestAreas.length) {
      insights.push({ type: 'areas', title: 'Áreas com menor acerto', data: weakestAreas });
    }

    if (hardestQuestions && hardestQuestions.length) {
      insights.push({ type: 'questions', title: 'Questões mais difíceis', data: hardestQuestions });
    }

    return insights;
  }

  function recordAttempt(input) {
    const attempts = readJSON(ATTEMPTS_KEY, []);
    const finishedAtISO = input.finishedAt ? new Date(input.finishedAt).toISOString() : nowISO();
    const startedAtISO = input.startedAt ? new Date(input.startedAt).toISOString() : finishedAtISO;
    const durationMs = typeof input.durationMs === 'number' ? input.durationMs : Math.max(0, new Date(finishedAtISO) - new Date(startedAtISO));
    const correct = input.correctCount || 0;
    const total = input.totalQuestions || ((input.questions && input.questions.length) || 0);
    const pct = percent(correct, total);
    const questions = (input.questions || []).map((q, idx) => ({
      id: q && q.id ? q.id : `${input.subject || 'G'}-${idx + 1}`,
      area: q && q.area ? q.area : 'Geral',
      correct: !!(q && q.correct),
      timeMs: typeof (q && q.timeMs) === 'number' ? q.timeMs : null
    }));
    const areas = computeAreasFromQuestions(questions);

    const attempt = {
      id: `${finishedAtISO}_${(input.subject || 'geral').slice(0, 3)}_${Math.random().toString(36).slice(2, 8)}`,
      subject: input.subject || 'geral',
      startedAt: startedAtISO,
      finishedAt: finishedAtISO,
      durationMs,
      totalQuestions: total,
      correctCount: correct,
      incorrectCount: Math.max(0, total - correct),
      percent: pct,
      areas,
      questions
    };

    attempts.push(attempt);
    writeJSON(ATTEMPTS_KEY, attempts);

    // Update legacy aggregates for backward compatibility
    const agg = updateLegacyAggregates(readJSON(AGG_KEY, {}), attempt);
    writeJSON(AGG_KEY, agg);

    // Return computed summary
    return attempt;
  }

  function getAttempts() {
    return readJSON(ATTEMPTS_KEY, []);
  }

  function clearAll() {
    writeJSON(ATTEMPTS_KEY, []);
  }

  function getDashboardData() {
    const attempts = getAttempts();
    const { aggregates, hardestQuestions, avgTimeMs } = computeAggregates(attempts);
    const benches = getBenchmarks();
    const summary = summarizeAttempts(attempts).slice(-20); // last 20

    const overallPct = percent(aggregates.overall.correct, aggregates.overall.total);
    const mathPct = percent(aggregates.bySubject.matematica.correct, aggregates.bySubject.matematica.total);
    const portPct = percent(aggregates.bySubject.portugues.correct, aggregates.bySubject.portugues.total);

    const insights = generateInsights(aggregates, hardestQuestions);

    return {
      attempts: summary,
      aggregates,
      overallPct,
      mathPct,
      portPct,
      avgTimeMs,
      benchmarks: benches,
      insights
    };
  }

  window.SAEB = {
    recordAttempt,
    getAttempts,
    getDashboardData,
    getBenchmarks,
    setBenchmarks: (b) => writeJSON(BENCH_KEY, { ...getBenchmarks(), ...b }),
    clearAll
  };
})();

