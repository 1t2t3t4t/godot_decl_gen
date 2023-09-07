import ts, {factory} from "typescript";
import {FunctionInput, genMethod} from "./function_generator";
import genType, {genIdent} from "./type_generator";

export type MemberInput = {
    name: string
    type: string
}

export function genMember(input: MemberInput): ts.PropertyDeclaration {
    return factory.createPropertyDeclaration(
        undefined,
        genIdent(input.name),
        undefined,
        genType(input.type),
        undefined
    )
}

export type PropertyInput = {
    type: string
    name: string
    setter?: string
    getter: string
    static?: boolean
}

export function genProperty(input: PropertyInput): (ts.GetAccessorDeclaration | ts.SetAccessorDeclaration)[] {
    const modifiers = input.static == true ?
        [factory.createToken(ts.SyntaxKind.StaticKeyword)]
        : undefined
    let results: (ts.GetAccessorDeclaration | ts.SetAccessorDeclaration)[] = [
        factory.createGetAccessorDeclaration(
            modifiers,
            genIdent(input.name),
            [],
            genType(input.type),
            undefined
        )
    ]
    if (input.setter) {
        results.push(
            factory.createSetAccessorDeclaration(
                undefined,
                genIdent(input.name),
                [
                    factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        factory.createIdentifier("newVal"),
                        undefined,
                        genType(input.type),
                        undefined
                    )
                ],
                undefined
            )
        )
    }

    return results
}

type ClassInput = {
    name: string
    constants?: MemberInput[]
    members?: MemberInput[]
    methods?: FunctionInput[]
}

export default function genClass(input: ClassInput): ts.ClassDeclaration {
    return factory.createClassDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        genIdent(input.name),
        undefined,
        undefined,
        [
            ...(input.constants?.flatMap(c => {
                return genProperty({
                    ...c,
                    static: true,
                    getter: ""
                })
            }) ?? []),
            ...(input.members?.map(genMember) ?? []),
            ...(input.methods?.map(genMethod) ?? [])
        ]
    )
}
