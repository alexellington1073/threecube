import * as THREE from "three";

let sideQueue = [] //xyz by array, 0, 1, or 2
let posQueue = [] //-1 or 1
let clockwiseQueue = [] //-1 or 1
let crossStickers = []
let stickers


export function solve(stickArr, cube) {
    // const startSide = getStartSide(stickers)
    stickers = stickArr
    setupCross(stickers)
    crossStickers.shift()


    //needs testing
    //returns sticker objects


    //possibly need clamp after every move
    function setupCross(stickers) {

        //cache all white edge stickers
        for (let i = 0; i < stickers.length; i++) {
            const posArr = stickers[i].position.toArray()
            const name = stickers[i].name

            if (getZeroCount(posArr) == 1 && name === 'white') {
                crossStickers.push(stickers[i])
            }
        }
    }
    // genCrossMove()
}
export function genCrossMove() {
    const posArr = crossStickers[0].position.toArray()
    let sideColor = getPiece(stickers, posArr, crossStickers[0].name)[0]
    console.log(sideColor.name)

    // while (edgeStickers.length > 0) {
    //piece mis-oriented top case
    if (posArr[1] == 1) {
        posQueue.push(1);
        clockwiseQueue.push(1);
        sideQueue.push(1);
        //check if white edges directly underneath and side underneath and in correct position
        //rotate current piece to side, then top and turn top
        //undo up to 2 rotations if first check was true
    }
    //piece mis-oriented middle case
    if (posArr[1] == 0) {
        posQueue.push(1);
        clockwiseQueue.push(1);
        sideQueue.push(1);
        //check if white edge underneath and in correct position
        //rotate current piece to top and turn top
        //undo first rotation if first check was true

    }

    //piece on bottom case
    if (posArr[1] == -1.5) {
        posQueue.push(1);
        clockwiseQueue.push(1);
        sideQueue.push(1);
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
        if (targetSide == 0) oppSide = 2
        else oppSide = 0
        if (sideColor.position.toArray()[targetSide] != targetCenterPos[targetSide]) {
            if (sideColor.position.toArray()[targetSide] == targetCenterPos[targetSide] * -1) {
                posQueue.push(1);
                // posQueue.push(1);
                clockwiseQueue.push(1);
                // clockwiseQueue.push(1);
                // sideQueue.push(1);
                sideQueue.push(1);
                // posQueue.push(Math.trunc(targetCenterPos[targetSide]));
                // posQueue.push(Math.trunc(targetCenterPos[targetSide]));
                // clockwiseQueue.push(1);
                // clockwiseQueue.push(1);
                // sideQueue.push(targetSide);
                // sideQueue.push(targetSide);
                // crossStickers.shift()
            }
            // on side case
            if (sideColor.position.toArray()[targetSide] == 0) {
                //clockwise
                if ((oppSide = 0
                    && ((posArr[oppSide] == 1.5 && targetCenterPos[targetSide] == -1.5 )
                    || (posArr[oppSide] == -1.5 && targetCenterPos[targetSide] == 1.5 )))
                    || (oppSide = 2
                        && ((posArr[oppSide] == -1.5 && targetCenterPos[targetSide] == -1.5 )
                            || (posArr[oppSide] == 1.5 && targetCenterPos[targetSide] == 1.5 )))
                    ) {
                    clockwiseQueue.push(1)
                    sideQueue.push(1)
                    posQueue.push(1)

                }
                else {
                    clockwiseQueue.push(-1)
                    sideQueue.push(1)
                    posQueue.push(1)
                }
            }

        }
        if (targetCenterPos[targetSide] == sideColor.position.toArray()[targetSide]) {
            posQueue.push(Math.trunc(targetCenterPos[targetSide]));
            posQueue.push(Math.trunc(targetCenterPos[targetSide]));
            clockwiseQueue.push(1);
            clockwiseQueue.push(1);
            sideQueue.push(targetSide);
            sideQueue.push(targetSide);
            crossStickers.shift()
        }
        // already correct case
    }
    // crossStickers.shift()
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

export function getSideQueue() {
    return sideQueue;
}

export function getClockwiseQueue() {
    return clockwiseQueue;
}

export function getPosQueue() {
    return posQueue;
}

export function shiftQueues() {
    sideQueue.shift()
    clockwiseQueue.shift()
    posQueue.shift()
}

export function getCrossQueueSize() {
    return crossStickers.length
}