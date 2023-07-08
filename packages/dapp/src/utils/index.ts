import JSConfetti from 'js-confetti';

export const confetti: any = (_i: number) => {
    const arr = [
        () => new JSConfetti().addConfetti(),
        () => new JSConfetti().addConfetti({
            emojis: ['🌈', '🚀', '💥', '✨', '💫', '🦄'],
        }),
        () => new JSConfetti().addConfetti({
            emojis: ['🇦', '🇱', '🇾', '🇷', '🦄'],
        })
    ]
    if (_i === -1) _i = Math.floor(Math.random() * (arr.length))

    return arr[_i]()
}