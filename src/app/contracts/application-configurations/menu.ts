export default class Menu {
	name: string;
	actions: Action[];
	// actions: {
	// 	code: string;
	// 	actionType: string;
	// 	httpType: string;
	// 	definition: string;
	// }[];
}

export class Action {
	code: string;
	actionType: string;
	httpType: string;
	definition: string;
}
