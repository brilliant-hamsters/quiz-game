import { QuizGame } from "./QuizGame";

const game = new QuizGame();

describe("Тестирование механики игры", () => {

    test('-> QuizGame: startGame', () => {
        expect(game.startGame).toBeDefined;
        const question = game.startGame()?.question;
        console.log(`Вопрос: ${question}`);
        
        expect(question).not.toBeUndefined(); 
    });

    test('-> QuizGame: checkAnswer', () => {
        expect(game.checkAnswerAndMoveNext).toBeDefined;
        const question1 = game.startGame();
        const question2 = game.checkAnswerAndMoveNext("vw"); 
        console.log(question1, question2);

        expect(question1).not.toStrictEqual(question2);     
    })
})
