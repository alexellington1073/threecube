import * as THREE from 'three'
import {Quaternion} from "three";
import {element} from "three/nodes";


export function sRotate(threeGroup, xyz, clockWise) {
    //xyz should be 0,1, or 2
    // posOrNeg should be 1 or -1


    //TODO fix rounding error?
    const radiant = THREE.MathUtils.degToRad(clockWise * 90)
    let axis = new THREE.Vector3()
    let arr = axis.toArray()
    arr[xyz] = 1
    axis = axis.fromArray(arr)
    threeGroup.rotateOnAxis(axis,radiant)

    // const factor = new THREE.Quaternion().setFromAxisAngle(axis,radiant)
    // let endQuat = new THREE.Quaternion()
    // endQuat.multiplyQuaternions(threeGroup.quaternion,factor)
    // threeGroup.applyQuaternion(endQuat).normalize

}

export function scramble(cube ,stickerArray, length) {

    let randomMoves = 50

    let randomXYZ = []
    for (let i = 0; i < randomMoves; i++) {
        randomXYZ[i] = Math.floor(Math.random() * 3)
    }

    let clockWise = []
    for (let i = 0; i < randomMoves; i++) {
        let randNum = Math.floor(Math.random() * 2)
        if (randNum === 0) randNum = -1
        clockWise[i] = randNum
    }

    let posNeg = []
    for (let i = 0; i < randomMoves; i++) {
        let isPos = Math.floor(Math.random() * 2)
        if (isPos === 0) isPos = true
        if (isPos === 1) isPos = false
        posNeg[i] = isPos
    }

    for (let i = 0; i < randomMoves; i++) {


        //make new side
        let side = new THREE.Group()
        for (let j = 0; j < length; j++) {

            if (posNeg[i]) {
                if (stickerArray[j].position.toArray()[randomXYZ[i]] > 0.1) { // 0.1 because weird math, fix in sRotate
                    side.attach(stickerArray[j])
                }

            } else if (stickerArray[j].position.toArray()[randomXYZ[i]] < -0.1) {
                side.attach(stickerArray[j])
            }
        }

        sRotate(side, randomXYZ[i], clockWise[i])

        for (let k = 0; k <= side.children.length; k++) {
            k = 0
            cube.attach(side.children[k])
        }


    }

    //TODO making vector values into floats maybe bad?
    //if not pull out into function?
    for (let i = 0; i < stickerArray.length; i++) {
        let newVec3 = stickerArray[i].position.toArray();
        for (let k = 0; k < 3; k++) {
            let value = newVec3[k]
            value = Number.parseFloat(value).toFixed(2)
            newVec3[k] = value
        }
        stickerArray[i].position.fromArray(newVec3)
    }
    return cube;
}
