import * as THREE from "three";

export function solve(stickers, cube) {

    // const startSide = getStartSide(stickers)

    makeCross(stickers)


    //needs testing
    //returns sticker objects


    //possibly need clamp after every move
    function makeCross(stickers) {
        let edgeStickers = []

        //cache all white edge stickers
        for (let i = 0; i < stickers.length; i++) {
            const posArr = stickers[i].position.toArray()
            const name = stickers[i].name

            if (getZeroCount(posArr) == 1 && name === 'white') {
                edgeStickers.push(stickers[i])
            }
        }


        //while loop? recursion???
        for (let i = 0; i < edgeStickers.length; i++) {
            const posArr = edgeStickers[i].position.toArray()
            let sideColor = getPiece(stickers, posArr, edgeStickers[i].name)[0]

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
                let targetCenterPos = getTargetCenter(stickers, sideColor.name)
                let targetSide
                let oppSide
                for (let j = 0; j < targetCenterPos.length; j++) {
                    if (targetCenterPos[j] != 0) targetSide = j;
                }
                if (targetSide = 0) oppSide = 2
                else oppSide = 0
                console.log(sideColor.position.toArray()[targetSide], targetCenterPos[targetSide])
                if (sideColor.position.toArray()[targetSide] != targetCenterPos[targetSide]) {


                }
            }
        }
    }
}

export function makeRotSide(cube, stickers, xyz, pos) {
    let length = stickers.length
    let side = new THREE.Group()
    cube.attach(side)
    for (let i = 0; i < length; i++) {
        if (pos == 1) {
            if (stickers[i].position.toArray()[xyz] > 0.01) {
                side.attach(stickers[i])
            }

        } else if (stickers[i].position.toArray()[xyz] < -0.01) {
            side.attach(stickers[i])
        }
    }
    return side
}

export function removeSide(stickers, cube) { //make while loop too lazy rn
    for (let i = 0; i < stickers.length; i++) {
        cube.attach(stickers[i])
    }
}

function getTargetCenter(stickers, name) {
    for (let i = 0; i < stickers.length; i++) {
        if (getZeroCount(stickers[i].position.toArray()) == 2 && stickers[i].name == name) {
            return stickers[i].position.toArray()
        }

    }
}

function getZeroCount(positionArray) {
    let zeroCount = 0
    for (let i = 0; i < positionArray.length; i++) {
        if (positionArray[i] == 0) zeroCount++
    }
    return zeroCount
}

function getPiece(stickers, posArr, name) {
    let piece = []
    let adjustedPos = []

    for (let i = 0; i < posArr.length; i++) {
        adjustedPos[i] = posArr[i]
        adjustedPos[i] = Math.trunc(adjustedPos[i])
        if (adjustedPos[i] == -0) adjustedPos[i] = 0
    }

    for (let i = 0; i < stickers.length; i++) {
        if (stickers[i].name === name) continue
        let currentStickerPos = []
        for (let j = 0; j < stickers[i].position.toArray().length; j++) {
            currentStickerPos[j] = Math.trunc(stickers[i].position.toArray()[j])
            if (currentStickerPos[j] == -0) currentStickerPos[j] = 0
        }

        for (let j = 0; j < adjustedPos.length; j++) {
            if (adjustedPos[j] != currentStickerPos[j]) break
            else if (j == adjustedPos.length - 1) piece.push(stickers[i])
        }

        if (piece.length + getZeroCount(posArr) === 2) return piece

    }

}