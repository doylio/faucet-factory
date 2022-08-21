import { toast } from '@zerodevx/svelte-toast';

export default {
	success: (message: string) => {
		toast.push(message, {
			theme: {
				'--toastBackground': '#48BB78',
				'--toastBarBackground': '#2F855A'
			}
		});
	},
	error: (message: string) => {
		toast.push(message, {
			theme: {
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			}
		});
	}
};
