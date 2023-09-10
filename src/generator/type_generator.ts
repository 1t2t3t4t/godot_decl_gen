import ts, {factory} from "typescript";
import GeneratorArtifacts from "./generator_artifacts";

export function genIdent(name: string): ts.Identifier {
    const originalName = name
    if (name == "typeof") {
        name = "typeOf"
    }

    if (name == "with") {
        name = "withVal"
    }
    if (name == "default") {
        name = "defaultVal"
    }

    if (name.includes(".")) {
        name = name.split(".").join("_")
    }

    if (originalName !== name) {
        GeneratorArtifacts.shared.addRenameMap(name, originalName)
    }
    return factory.createIdentifier(refTypeName(name))
}

const specialGdType = [
    "String",
    "StringName",
    "Array"
]

export function refTypeName(type: string): string {
    if (specialGdType.includes(type)) {
        type = "Gd" + type
    }
    return type
}

function refType(type: string): ts.TypeReferenceType {
    return factory.createTypeReferenceNode(
        genIdent(refTypeName(type))
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