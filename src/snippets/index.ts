export interface Snippet {
    id: string,
    data: Array<SnippetData>
}
export interface SnippetData {
    title?: string,
    content?: string,
    code?: string
}

const snippets: Array<Snippet> = [];

const files = import.meta.glob('./*.ts');

for (const path in files) {
    await files[path]().then((mod) => {
        const id = path.split("/").pop()?.split(".").shift();

        if(id && id != "index") {    
            snippets.push({
                id,
                data: mod.default
            });
        }

    });
}

export default snippets;
