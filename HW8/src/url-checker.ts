export class LinkChecker {
    // Method to validate URLs
    isValidUrl(url: string): boolean {
        const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[\w./-]*)*$/i;

        return urlPattern.test(url);
    }
}
