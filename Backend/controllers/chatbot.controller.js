import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fuzzy from 'fuzzy'; // for fuzzy matching
import nlp from 'compromise'; // for simple NLP processing

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../db/questions.json');

let questions = [];
try {
    questions = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
    console.error('Error reading questions JSON file:', err);
}

function findMatchingQuestions(userQuestion, questions) {
    const userQuestionLower = userQuestion.toLowerCase();

    const questionStrings = questions.map(q => q.question);
    
    const matches = fuzzy.filter(userQuestionLower, questionStrings);
    
    return matches.map(match => {
        const index = match.index;
        return { ...questions[index], score: match.score };
    });
}

export function askQuestion(req, res) {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ message: 'Question is required.' });
    }

    const doc = nlp(question);
    const processedQuestion = doc.out('text');  // Process question text
    console.log('Processed question:', processedQuestion);

    const matches = findMatchingQuestions(processedQuestion, questions);
    console.log('Fuzzy matches found:', matches);

    if (!matches || matches.length === 0) {
        return res.json({
            answer: "Sorry, I couldn't find an exact answer for that.",
            suggestions: []
        });
    }

    const sortedMatches = matches.sort((a, b) => b.score - a.score);
    console.log('Sorted matches:', sortedMatches);

    const bestMatch = sortedMatches[0];
    console.log('Best match:', bestMatch);

    if (!bestMatch || !bestMatch.answer) {
        return res.json({
            answer: "Sorry, I couldn't find an exact answer for that.",
            suggestions: sortedMatches.slice(0, 3).map(item => item.question)
        });
    }
    return res.json({ answer: bestMatch.answer });
}
