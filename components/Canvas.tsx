import React, {useRef, useEffect} from 'react'
import  {
    PlayerPositionObject, 
    PlayerVelocityObject, 
    PlayerSizeObject, 
    PlayerKeysObject
} from '../src/types/PlayerTypes'

import {
    PlatformPositionObject,
    PlatformSizeObject
} from '../src/types/PlatformTypes'

const Canvas: React.FC = (props): JSX.Element => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')

        // Canvas Initializaztion
 
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Platform Constructor Class 

        class Platform {
            position: PlatformPositionObject;
            size: PlatformSizeObject;
            
            constructor(position: PlatformPositionObject, size: PlatformSizeObject) {
                this.position = position
                this.size = size
            }

            draw(): void {
                context.fillStyle = 'blue'
                context.fillRect(this.position.X_Position, this.position.Y_Position, this.size.width, this.size.height)
            }
        }

        // Platform Properties

        const platform1Position: PlatformPositionObject = {X_Position: 100, Y_Position: 100}
        const platform1Size: PlatformSizeObject = {width: 300, height: 50}

        const platform1 = new Platform(platform1Position, platform1Size)

        // =======================================================================================================
        // I don't know how to do this modularly :(

        // Gravity

        const gravity: number = 0.5

        // Player Constructor Class

        class Player {
            position: PlayerPositionObject;
            size: PlayerSizeObject;
            velocity: PlayerVelocityObject;

            constructor(position: PlayerPositionObject, size: PlayerSizeObject, velocity: PlayerVelocityObject) {
                this.position = position
                this.size = size
                this.velocity = velocity
            }
    
            draw(): void {
                context.fillStyle = 'red'
                context.fillRect(this.position.X_Position, this.position.Y_Position, this.size.width, this.size.height)
            }

            update(): void {
                this.draw()
                this.position.Y_Position += this.velocity.Y_Velocity
                this.position.X_Position += this.velocity.X_Velocity

                if(this.position.Y_Position + this.size.height + this.velocity.Y_Velocity <= canvas.height) {
                    this.velocity.Y_Velocity += gravity
                }
                else this.velocity.Y_Velocity = 0
            }
        }

        // Player Properties

        const playerPosition: PlayerPositionObject = {X_Position: 30, Y_Position: 30}
        const playerSize: PlayerSizeObject = {width: 30, height: 30}
        const playerVelocity: PlayerVelocityObject = {X_Velocity: 0, Y_Velocity: 0}

        const player = new Player(playerPosition, playerSize, playerVelocity)
        const keys: PlayerKeysObject = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
            up: {
                pressed: false
            },
        }

        const animate = (): void => {
            requestAnimationFrame(animate)
            context.clearRect(0, 0, canvas.width, canvas.height)
            player.update()
            platform1.draw() // JUST NOW!!

            // Movement Handler 

            if(keys.right.pressed) { // Right Key
                player.velocity.X_Velocity = 5
            }
            else if(keys.left.pressed) { // Left Key
                player.velocity.X_Velocity = -5
            }  
            else if (keys.up.pressed) { // Up Key
                player.velocity.Y_Velocity = -20
            } else player.velocity.X_Velocity = 0

        }
        animate()

        // Player Movement
    
        window.addEventListener('keydown', ({key}) => {
            switch (key) {
                case 'ArrowRight':
                    keys.right.pressed = true
                    break;

                case 'ArrowLeft':
                    keys.left.pressed = true
                    break;

                case 'ArrowUp':
                    keys.up.pressed = true
                    break;
            }
        })

        // Stop Player

        window.addEventListener('keyup', ({key}) => {
            switch (key) {
                case 'ArrowRight':
                    keys.right.pressed = false
                    break;

                case 'ArrowLeft':
                    keys.left.pressed = false
                    break;

                case 'ArrowUp':
                    keys.up.pressed = false
                    break;
            }
        })

    }, [])

    
    return (
        <canvas ref = {canvasRef} {...props}/>
    )
}

export default Canvas