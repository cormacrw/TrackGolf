import GameMode from '$components/questions/GameMode.svelte'
import Score from '$components/questions/Score.svelte'
import Minutes from '$components/questions/Minutes.svelte'

export default [
	{
		question: 'Which game mode did you play?',
		component: GameMode
	},

	{
		question: 'What was the score?',
		component: Score
	},

	{
		question: 'How many minutes did you play?',
		component: Minutes
	}
]
