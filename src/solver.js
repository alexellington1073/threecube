function solve(stickers) {

    let startSide = getStartSide(stickers)

    function getStartSide(stickers) {
        let randXYZ = Math.floor(Math.random() * 3)

        let randPos = Math.floor(Math.random() * 2)
        if (randPos === 0) randPos = -1



        return [randXYZ,randPos]
    }

    function makeCross() {

    }
}
