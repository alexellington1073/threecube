import {assertSourceType} from "@babel/core/lib/config/validation/option-assertions";

export function solve(stickers) {

    // const startSide = getStartSide(stickers)
    let sideQueue = []
    let posQueue = []
    let clockwiseQueue = []
    makeCross(stickers)

    // function getStartSide(stickers) {
    //     let randXYZ = Math.floor(Math.random() * 3)
    //
    //     let randPos = Math.floor(Math.random() * 2)
    //     if (randPos === 0) randPos = -1
    //
    //
    //
    //     return [randXYZ,randPos]
    // }


    //needs testing
    function getPiece (stickers, posArr) {
        let piece = []
        let adjustedPos = posArr

        for (let i = 0; i < posArr.length; i++) {
            adjustedPos[i] = Math.trunc(posArr[i])
        }

        for (let i = 0; i < stickers.length; i++) {
            let currentStickerPos = []
            for (let j = 0; j < stickers.position.toArray().length; j++) {
                currentStickerPos[j] = Math.trunc(stickers[i].position.toArray()[j])
            }

            for (let j = 0; j < adjustedPos.length; j++) {
                if (adjustedPos[j] != currentStickerPos[j]) break
                else if (i == adjustedPos.length) piece.push(stickers[i])
            }

            if (piece.length + getZeroCount(posArr) === 3) return piece

        }

    }

    function getZeroCount(positionArray) {
        let zeroCount = 0
        for (let i = 0; i < positionArray.length; i++) {
            if (positionArray[i] == 0) zeroCount++
        }
        return zeroCount
    }


    //possibly need clamp after every move
    function makeCross(stickers) {
        let edgeStickers = []

        //cache all white edge stickers
        for ( let i = 0; i < stickers.length; i ++) {
            const posArr = stickers[i].position.toArray()
            const name = stickers[i].name

            if (getZeroCount(posArr) == 1 && name === 'white') {
                edgeStickers.push(i)
            }
        }

        for (let i = 0; i < edgeStickers.length; i++) {
            const posArr = stickers[edgeStickers[i]].position.toArray()

            //piece on bottom case
            if (posArr[1] == -1.5) {
                //check if already in correct pos

                //else rotate to top

            }

            //piece on top case
            if (posArr[1] == 1.5) {
                //rotate to correct side, rotate down


            }

            //piece mis-oriented case
            else {
                //check if correctly placed piece underneath.
                //rotate up, turn up
                // rotate back down if first check was true
            }


        }



    }
}
