export default [{
    title: "Select in MySQL",
    language: "sql",
    code: `
SELECT \`id\`, \`title\`, \`content\`
FROM \`items\`
WHERE \`id\` = 1
ORDER BY \`id\` DESC
`
}];