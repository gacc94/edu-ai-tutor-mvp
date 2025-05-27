export class Image {
    base64String?: string;
    dataUrl?: string;
    path?: string;
    webPath?: string;
    exif?: any;
    format: string;
    saved: boolean;

    constructor(props: ImageProps) {
        this.base64String = props.base64String;
        this.dataUrl = props.dataUrl;
        this.path = props.path;
        this.webPath = props.webPath;
        this.exif = props.exif;
        this.format = props.format;
        this.saved = props.saved;
    }

    static base64ToBlob(base64String: string): File {
        const base64Data = base64String.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], 'image.jpg', { type: 'image/jpeg' });
    }
}

interface ImageProps {
    base64String?: string;
    dataUrl?: string;
    path?: string;
    webPath?: string;
    exif?: any;
    format: string;
    saved: boolean;
}
