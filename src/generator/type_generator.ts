import ts, {factory} from "typescript";
import GeneratorArtifacts from "./generator_artifacts";

export function genIdent(name: string): ts.Identifier {
    const originalName = name
    if (name == "typeof") {
        name = "typeOf"
        GeneratorArtifacts.shared.addRenameMap(name, originalName)
    }

    if (name.includes(".")) {
        name = name.split(".").join("_")
        GeneratorArtifacts.shared.addRenameMap(name, originalName)
    }

    return factory.createIdentifier(name)
}

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
                genIdent("GdString")
            )
        case "StringName":
            return factory.createTypeReferenceNode(
                genIdent("GdStringName")
            )
        default:
            return factory.createTypeReferenceNode(
                genIdent(type)
            )
    }
}