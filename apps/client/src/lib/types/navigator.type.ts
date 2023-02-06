export interface Navigator {
	getUserMedia(
		options: MediaStreamConstraints,
		success: (stream: MediaStream) => void,
		error?: (error: string) => void
	): void;
}
