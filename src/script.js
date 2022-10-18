import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import webGPUProperties from "three/examples/jsm/renderers/webgpu/WebGPUProperties";
import {Mesh} from "three";

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneGeometry(1,1)

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

const whitePlane = new THREE.Mesh(geometry,whiteMat)
const redPlane = new THREE.Mesh(geometry,redMat)
const orangePlane = new THREE.Mesh(geometry,orangeMat)
const bluePlane = new THREE.Mesh(geometry,blueMat)
const yellowPlane = new THREE.Mesh(geometry,yellowMat)
const greenPlane = new THREE.Mesh(geometry,greenMat)
// redPlane.material.side = THREE.DoubleSide;
// whitePlane.material.side = THREE.DoubleSide;
// orangePlane.material.side = THREE.DoubleSide;
// bluePlane.material.side = THREE.DoubleSide;
// yellowPlane.material.side = THREE.DoubleSide;
// greenPlane.material.side = THREE.DoubleSide;


// Positioning
const ntyDegrees = 1.5708;
let cube = new THREE.Group()
let redSide = new THREE.Group()
cube.add(redSide)
for (let posX = -1; posX <= 1; posX++) {
    for (let posY = -1; posY <= 1; posY++) {
        for (let posZ = -1; posZ <= 1; posZ++) {


            // if  (posX === 0 && posY === 0 && posZ === 0) continue;

            let newPlane = new THREE.Mesh();


            if (posY === -1) {
                newPlane = new THREE.Mesh(geometry,whiteMat)
                newPlane.rotation.x = ntyDegrees
                newPlane.position.set(posX,posY - .5,posZ)
                cube.add(newPlane)
                if (posX > 0) {
                    redSide.add(newPlane)
                }

            }
            if (posY === 1) {
                newPlane = new THREE.Mesh(geometry,yellowMat)
                newPlane.rotation.x = -ntyDegrees
                newPlane.position.set(posX,posY + .5,posZ)
                cube.add(newPlane)
                if (posX > 0) {
                    redSide.add(newPlane)
                }

            }
            if (posX === -1) {
                newPlane = new THREE.Mesh(geometry,orangeMat)
                newPlane.rotation.y = -ntyDegrees
                newPlane.position.set(posX -.5,posY,posZ)
                cube.add(newPlane)

            }
            if (posX === 1) {
                newPlane = new THREE.Mesh(geometry,redMat)
                newPlane.rotation.y = ntyDegrees
                newPlane.position.set(posX + .5,posY,posZ)
                cube.add(newPlane)
                if (posX > 0) {
                    redSide.add(newPlane)
                }

            }
            if (posZ === -1) {
                newPlane = new THREE.Mesh(geometry,blueMat)
                newPlane.rotation.x = 2 * ntyDegrees
                newPlane.position.set(posX,posY,posZ - .5)
                cube.add(newPlane)
                if (posX > 0) {
                    redSide.add(newPlane)
                }

            }
            if (posZ === 1) {
                newPlane = new THREE.Mesh(geometry,greenMat)
                newPlane.rotation.z = ntyDegrees
                newPlane.position.set(posX,posY,posZ + .5)
                cube.add(newPlane)
                if (posX > 0) {
                    redSide.add(newPlane)
                }

            }


        }
    }
}
// scene.add(redSide)
scene.add(cube)

// let face = new THREE.Group()
//
// for (let posX = -1; posX < 2; posX++) {
//     for (let posY = -1; posY < 2; posY++) {
//
//         let newPlane = new THREE.Mesh(geometry, whiteMat)
//         newPlane.position.set(posX, posY, 0);
//         face.add(newPlane)
//
//     }
// }
// scene.add(face)

// whitePlane.rotation.set(-1 * ntyDegrees, 0, 0)
// whitePlane.position.set(0,-0.5,-0.5)
// redPlane.rotation.set(0, ntyDegrees , 0)
// let redCenter = redPlane.clone()
// redPlane.position.set(0.5,0,-0.5)
// redCenter.position.set(0.5,1,-1.5)
// scene.add(redCenter)
//
// GROUPS
// const corner = new THREE.Group()
// corner.add(orangePlane)
// corner.add(redPlane)
// corner.add(whitePlane)
//
//
// const corner2 = corner.clone()
// corner2.position.set(0,2,-3)
// corner2.rotation.x = 2 * ntyDegrees
//
// const redFace = new THREE.Group()
// redFace.add(corner2)
// redFace.add(redCenter)
//
// redFace.add(corner)
//
// scene.add(redFace)

// Lights
const ambLight = new THREE.AmbientLight(0xffffff,.2)
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

window.addEventListener('resize', () =>
{
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
camera.position.z = 2
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
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    cube.rotation.x = -.2 * elapsedTime
    cube.rotation.y = -.2 * elapsedTime
    redSide.rotation.x = .2 * elapsedTime
    // corner.rotation.y = .1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()