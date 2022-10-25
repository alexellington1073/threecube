import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {scramble, sRotate} from "./scrambler";
import {
    genCrossMove,
    getClockwiseQueue,
    getCrossQueueSize,
    getPosQueue,
    getSideQueue,
    makeRotSide,
    removeSide,
    shiftQueues,
    solve
} from "./solver";
import Stats from 'three/addons/libs/stats.module.js';
import {smoothstep} from "three/nodes";

// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

//Stats
const stats = new Stats()
container.appendChild(stats.dom)

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneGeometry(1, 1)

// Materials
const redMat = new THREE.MeshBasicMaterial()
const blueMat = new THREE.MeshBasicMaterial()
const greenMat = new THREE.MeshBasicMaterial()
const yellowMat = new THREE.MeshBasicMaterial()
const whiteMat = new THREE.MeshBasicMaterial()
const orangeMat = new THREE.MeshBasicMaterial()
redMat.color = new THREE.Color(0xff0000)
blueMat.color = new THREE.Color(0x0000ff)
greenMat.color = new THREE.Color(0x00ff00)
yellowMat.color = new THREE.Color(0xf5e105)
whiteMat.color = new THREE.Color(0xffffff)
orangeMat.color = new THREE.Color(0xff6600)

// Mesh

// const whitePlane = new THREE.Mesh(geometry,whiteMat)
// const redPlane = new THREE.Mesh(geometry,redMat)
// const orangePlane = new THREE.Mesh(geometry,orangeMat)
// const bluePlane = new THREE.Mesh(geometry,blueMat)
// const yellowPlane = new THREE.Mesh(geometry,yellowMat)
// const greenPlane = new THREE.Mesh(geometry,greenMat)
// redPlane.material.side = THREE.DoubleSide;
// whitePlane.material.side = THREE.DoubleSide;
// orangePlane.material.side = THREE.DoubleSide;
// bluePlane.material.side = THREE.DoubleSide;
// yellowPlane.material.side = THREE.DoubleSide;
// greenPlane.material.side = THREE.DoubleSide;


// Positioning
const ntyDegrees = 1.5708;
let cube = new THREE.Group()
let stickers = []
for (let posX = -1; posX <= 1; posX++) {
    for (let posY = -1; posY <= 1; posY++) {
        for (let posZ = -1; posZ <= 1; posZ++) {

            let zeroCount = 0
            if (posX === 0) zeroCount++
            if (posY === 0) zeroCount++
            if (posZ === 0) zeroCount++


            //TODO : oh no
            if (posY === -1) {
                let newPlane = new THREE.Mesh(geometry, whiteMat)
                newPlane.rotation.x = ntyDegrees
                newPlane.position.set(posX, posY - .5, posZ)
                newPlane.name = "white"
                cube.add(newPlane)
                stickers.push(newPlane)
            }
            if (posY === 1) {
                let newPlane = new THREE.Mesh(geometry, yellowMat)
                newPlane.rotation.x = -ntyDegrees
                newPlane.position.set(posX, posY + .5, posZ)
                newPlane.name = "yellow"
                cube.add(newPlane)
                stickers.push(newPlane)
            }
            if (posX === -1) {
                let newPlane = new THREE.Mesh(geometry, redMat)
                newPlane.rotation.y = -ntyDegrees
                newPlane.position.set(posX - .5, posY, posZ)
                newPlane.name = "red"
                cube.add(newPlane)
                stickers.push(newPlane)
            }
            if (posX === 1) {
                let newPlane = new THREE.Mesh(geometry, orangeMat)
                newPlane.rotation.y = ntyDegrees
                newPlane.position.set(posX + .5, posY, posZ)
                newPlane.name = "orange"
                cube.add(newPlane)
                stickers.push(newPlane)
            }
            if (posZ === -1) {
                let newPlane = new THREE.Mesh(geometry, blueMat)
                newPlane.rotation.x = 2 * ntyDegrees
                newPlane.position.set(posX, posY, posZ - .5)
                newPlane.name = "blue"
                cube.add(newPlane)
                stickers.push(newPlane)
            }
            if (posZ === 1) {
                let newPlane = new THREE.Mesh(geometry, greenMat)
                newPlane.rotation.z = ntyDegrees
                newPlane.position.set(posX, posY, posZ + .5)
                newPlane.name = "green"
                cube.add(newPlane)
                stickers.push(newPlane)
            }

        }
    }
}


scramble(cube, stickers, stickers.length)

// console.log(stickers)

//TODO implement
// get side and rotation

// let rotSide = getNextRotSide();
// let rotSide =
// let targetQuat = getNextTargetQuat();

solve(stickers, cube)


// Lights
const ambLight = new THREE.AmbientLight(0xffffff, .2)
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
scene.add(ambLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const deltaClock = new THREE.Clock()
const elapsClock = new THREE.Clock()


let readyForNextTurn = true
let side = new THREE.Group()
// scene.add(side)
scene.add(cube)


let targetQuat = new THREE.Quaternion()

generateNextTurn(stickers, cube)

const tick = () => {
    const elapsedTime = elapsClock.getElapsedTime()
    const speed = 1.15
    const delta = deltaClock.getDelta()

    // // Update objects
    // cube.rotation.x = .2 * elapsedTime
    // cube.rotation.y = .2 * elapsedTime


    // turn sides
    if (!side.quaternion.equals(targetQuat)) {
        const step = speed * delta;
        side.quaternion.rotateTowards(targetQuat, step);
    } else {
        cleanup()
        generateNextTurn()
    }


    // Update Orbital Controls
    controls.update()
    stats.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


function generateNextTurn() {
if (getCrossQueueSize() != 0 || getSideQueue().length == 0) genCrossMove()
    side = makeRotSide(cube, stickers, getSideQueue()[0], getPosQueue()[0])
    let axis = new THREE.Vector3()
    console.log(getSideQueue().length)
    let angle
    if(getSideQueue().length != 0) {
        axis.setComponent(
            getSideQueue()[0],
            getClockwiseQueue()[0] * 1)

        angle = THREE.MathUtils.degToRad(getClockwiseQueue()[0] * 90)
    }

    targetQuat.setFromAxisAngle(axis, angle)

}

function cleanup() {

    removeSide(stickers, cube)
    side.removeFromParent()
    shiftQueues()
    clampStickers()
    // generateNextTurn(stickers, cube)

}

function clampStickers() {
    for (let i = 0; i < stickers.length; i++) {
        let newVec3 = stickers[i].position.toArray();
        for (let k = 0; k < 3; k++) {
            let value = newVec3[k]
            value = Number.parseFloat(value).toFixed(2)
            newVec3[k] = value
        }
        stickers[i].position.fromArray(newVec3)
    }
}


tick()