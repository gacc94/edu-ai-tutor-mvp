interface ImageProps {
    base64String?: string;
    dataUrl?: string;
    path?: string;
    webPath?: string;
    exif?: any;
    format: string;
    saved: boolean;
}

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

    async getFile(): Promise<File> {
        const response = await fetch(this.webPath!);
        const blob = await response.blob();
        const ext = this.format ?? 'jpeg';
        const mime = blob.type ?? `image/${ext}`;

        return new File([blob], `image.${ext}`, { type: mime });
    }
}
