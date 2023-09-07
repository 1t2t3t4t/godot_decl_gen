import ts, {factory} from "typescript";


export default function genType(type?: string): ts.TypeNode {
    if (!type) {
        return factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    }

    switch (type) {
        case "int":
        case "float":
            return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
        case "bool":
            return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
        case "String":
            return factory.createTypeReferenceNode(
                factory.createIdentifier("GdString")
            )
        case "StringName":
            return factory.createTypeReferenceNode(
                factory.createIdentifier("GdStringName")
            )
        default:
            return factory.createTypeReferenceNode(
                factory.createIdentifier(type)
            )
    }
}