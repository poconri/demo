export type HttpResponse<T> = {
	status: number;
	error?: string;
	data?: T;
};

const METHOD = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
} as const;

export type TypeGuardFunction<T> = (data: unknown) => data is T;

export class Http {
	private httpFetch = async <T, U = undefined>(
		method: (typeof METHOD)[keyof typeof METHOD],
		path: string,
		typeGuard: TypeGuardFunction<T>,
		data?: Partial<U extends undefined ? T : U>
	): Promise<HttpResponse<T>> => {
		try {
			const response = await fetch(path, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: data ? JSON.stringify(data) : undefined,
			});

			const jsonResponse = await response.json();

			return {
				status: response.status,
				data: typeGuard(jsonResponse) ? jsonResponse : undefined,
			};
		} catch (error) {
			console.log(JSON.stringify(error));
			if (error instanceof Error) {
				return {
					status: 500,
					error: error.message,
				};
			}
			return {
				status: 500,
				error: "Unknown error",
			};
		}
	};

	get = async <T>(path: string, typeGuard: TypeGuardFunction<T>) =>
		this.httpFetch<T>(METHOD.GET, path, typeGuard);

	post = async <T, U>(
		path: string,
		typeGuard: TypeGuardFunction<T>,
		data?: Partial<U extends undefined ? T : U>
	) => this.httpFetch<T, U>(METHOD.POST, path, typeGuard, data);
}