import { PREF_ID } from '../const/const';

const getIdNumber = (data) => {
	let maxNumber = -1;
	for (let key in data) {
		const temp = +data[key].id.replace(PREF_ID, '');
		if (maxNumber < temp) {
			maxNumber = temp;
		}
	}
	return maxNumber + 1;
};

export { getIdNumber };