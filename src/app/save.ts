export class Save {
    inventory: string[];
    pages: Page[];
}

export class Page {
    id: number;
    title: string;
    text: string;
    requirements: string[];
    items: string[];
    options: Option[];
}

export class Option {
    text: string;
    page: number;
}
