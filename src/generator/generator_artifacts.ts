type NameMap = {
    ts: string,
    gdscript: string
}

export default class GeneratorArtifacts {
    static shared = new GeneratorArtifacts()

    private renameMap: NameMap[] = []

    addRenameMap(ts: string, gdscript: string) {
        this.renameMap.push({ ts, gdscript })
    }
}