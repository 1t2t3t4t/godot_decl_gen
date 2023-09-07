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

const specialGdType = [
    "String",
    "StringName",
    "Array"
]

function refType(type: string): ts.TypeReferenceType {
    if (specialGdType.includes(type)) {
        type = "Gd" + type
    }
    return factory.createTypeReferenceNode(
        genIdent(type)
    )
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
        default:
            return refType(type)
    }
}