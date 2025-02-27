export enum FormQuestionType {
	RADIO_BTNS = 'Radio',
	CHECKBOXES = 'Checkbox',
	TEXT = 'Text',
	YES_NO = 'YesNo'
}

export type FormQuestion = {
	question: string,
	type: FormQuestionType,
	description?: string,
	options: {
		name: string,
		id: string
	}[]
}

export type Form = {
	name: string,
	description?: string,
	questions: FormQuestion[]
}

const API_ENDPOINT = "http://localhost:8080"

export async function fetchFormDetails(id: string): Promise<Form> {
	const d = await fetch(`${API_ENDPOINT}/form/${id}`,{
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await d.json() as Form;
}