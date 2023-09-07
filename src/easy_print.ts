import ts, {EmitHint} from "typescript";

export const easyPrintNode = (node: ts.Node): string => {
    const printer = ts.createPrinter()
    const source = ts.createSourceFile("temp.ts", "", ts.ScriptTarget.ES2016)

    return printer.printNode(EmitHint.Unspecified, node, source)
}

export const easyPrintList = (nodes: ts.Node[]): string => {
    const printer = ts.createPrinter()
    const source = ts.createSourceFile("temp.ts", "", ts.ScriptTarget.ES2016)

    return printer.printList(ts.ListFormat.MultiLine, ts.factory.createNodeArray(nodes), source)
}