import ts, {factory} from "typescript";
import {FunctionInput, genMethod, ParamInput} from "./function_generator";
import genType, {genIdent, refTypeName} from "./type_generator";

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
}

export function genProperty(input: PropertyInput, isStatic: boolean = false): (ts.GetAccessorDeclaration | ts.SetAccessorDeclaration)[] {
    const modifiers = isStatic ?
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

type ConstructorInput = {
    arguments?: ParamInput[]
}

type ClassInput = {
    name: string
    inherits?: string
    constructors?: ConstructorInput[]
    constants?: ConstantInput[]
    members?: MemberInput[]
    methods?: FunctionInput[]
}

function genConstructor(input: ConstructorInput, cls: string): ts.MethodDeclaration {
    return genMethod(
        {
            name: "new",
            ...input,
            return_type: cls
        },
        true
    )
}

type ConstantInput = {
    name: string
    type?: string
}

function genConstant(input: ConstantInput): ts.ClassElement[] {
    return genProperty({
        name: input.name,
        type: input.type ?? "int",
        getter: ""
    }, true)
}

export default function genClass(input: ClassInput): ts.ClassDeclaration {
    const heritageClause = input.inherits ? [factory.createHeritageClause(
        ts.SyntaxKind.ExtendsKeyword,
        [factory.createExpressionWithTypeArguments(
            factory.createIdentifier(refTypeName(input.inherits)),
            undefined
        )]
    )] : undefined
    return factory.createClassDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        genIdent(input.name),
        undefined,
        heritageClause,
        [
            ...(input.constants?.flatMap(genConstant) ?? []),
            ...(input.members?.map(genMember) ?? []),
            ...(input.constructors?.map(c => genConstructor(c, input.name)) ?? []),
            ...(input.methods?.map(m => genMethod(m)) ?? [])
        ]
    )
}
