import loadExtensionApi from "./extension_api_loader"

const main = async () => {
    console.log(await loadExtensionApi())

    process.exit(0)
}

main()