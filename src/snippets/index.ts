export interface Snippet {
    id: string,
    title: string,
    content: string
}

const snippets: Array<Snippet> = [];

const files = import.meta.glob('./*.json');

for (const path in files) {
    await files[path]().then((mod) => {
        const id = path.split("/").pop()?.split(".").shift();

        snippets.push({
            id,
            ...mod.default
        });
    });
}

export default snippets;
