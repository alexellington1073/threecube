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
    //returns sticker objects
    function getPiece (stickers, posArr, name) {
        let piece = []
        let adjustedPos = posArr

        for (let i = 0; i < posArr.length; i++) {
            adjustedPos[i] = Math.trunc(posArr[i])
            if (adjustedPos[i] == -0) adjustedPos[i] = 0
        }

        for (let i = 0; i < stickers.length; i++) {
            if (stickers[i].name === name) continue
            let currentStickerPos = []
            for (let j = 0; j < stickers[i].position.toArray().length; j++) {
                currentStickerPos[j] = Math.trunc(stickers[i].position.toArray()[j])
                if (currentStickerPos[j] == -0) currentStickerPos[j] = 0
            }
            console.log(currentStickerPos,adjustedPos)

            for (let j = 0; j < adjustedPos.length; j++) {
                if (adjustedPos[j] != currentStickerPos[j]) break
                else if (i == adjustedPos.length - 1) piece.push(stickers[i])
            }

            if (piece.length + getZeroCount(posArr) === 2) return piece

        }

    }

    function getTargetCenter(stickers, name) {
        for (let i  = 0; i < stickers.length; i++) {
            if (getZeroCount(stickers[i]) == 2 && stickers[i].getName() == name) return stickers[i]
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
                edgeStickers.push(stickers[i])
            }
        }


        //while loop? recursion???
        for (let i = 0; i < edgeStickers.length; i++) {
            const posArr = edgeStickers[i].position.toArray()
            let sideColor = getPiece(stickers, posArr, edgeStickers[i].name)
            console.log(sideColor)

            //piece mis-oriented top case
            if (posArr[1] == 1) {
                //check if white edges directly underneath and side underneath and in correct position
                //rotate current piece to side, then top and turn top
                //undo up to 2 rotations if first check was true
            }
            //piece mis-oriented middle case
            if (posArr[1] == 0) {
                //check if white edge underneath and in correct position
                //rotate current piece to top and turn top
                //undo first rotation if first check was true

            }

            //piece on bottom case
            if (posArr[1] == -1.5) {
                //check if already in correct pos

                //else rotate to top

            }

            //piece on top case
            if (posArr[1] == 1.5) {
                //rotate to correct side, rotate down
                let targetCenterPos = getTargetCenter(stickers,edgeStickers[i].name)

                // if (  )



            }




        }



    }
}
