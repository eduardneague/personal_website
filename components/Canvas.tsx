import React, {useRef, useEffect} from 'react'
import platform1 from '../public/platform_assets/Platform_1.png'
import platform2 from '../public/platform_assets/Platform_2.png'
import playerNeutral from '../public/player_assets/Player_Neutral.svg'

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
 
        canvas.width = 1024
        canvas.height = 576

        // Platform Constructor Class 

        class Platform {
            position: PlatformPositionObject;
            size: PlatformSizeObject;
            image: HTMLElement;
            
            constructor(position: PlatformPositionObject, size: PlatformSizeObject, image: HTMLElement) {
                this.position = position
                this.size = size
                this.image = image
            }

            draw(): void {
                context.drawImage(this.image, this.position.X_Position, this.position.Y_Position)
            }
        }

        // Platform Properties
        const platform_1_image = new Image()
        platform_1_image.src = platform1

        const platform_2_image = new Image() 
        platform_2_image.src = platform2
  
        const platformsArray: Platform[] = [
            new Platform(
                    {X_Position: 100, Y_Position: 300}, 
                    {width: platform_1_image.width, height: platform_1_image.height}, 
                    platform_1_image
                ),
                new Platform(
                    {X_Position: 1300, Y_Position: 700}, 
                    {width: platform_1_image.width, height: platform_1_image.height}, 
                    platform_1_image
                ),
            
        ]

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

        // Win Condition

        let scrollOffset: number = 0

        const animate = (): void => {
            requestAnimationFrame(animate)
            context.fillStyle = "black"
            context.fillRect(0, 0, canvas.width, canvas.height)

            platformsArray.forEach((platform) => {
                platform.draw()
            })
            player.update()

            // Movement Handler + Background Scrolling

            if(keys.right.pressed && player.position.X_Position < 700) { // Right Key + Movement Limit
                player.velocity.X_Velocity = 5
            }
            else if(keys.left.pressed && player.position.X_Position > 200) { // Left Key + Movement Limit
                player.velocity.X_Velocity = -5
            }  
            else if (keys.up.pressed) { // Up Key
                player.velocity.Y_Velocity = -20
            } else {
                player.velocity.X_Velocity = 0

                if(keys.right.pressed) {
                    scrollOffset += 5 
                    platformsArray.forEach((platform) => {
                        platform.position.X_Position -= 5
                    }) // Scrolling (To the left) when Moving Right
                }
                if(keys.left.pressed) {
                    scrollOffset -= 5 
                    platformsArray.forEach((platform) => {
                        platform.position.X_Position += 5
                    }) // Scrolling (To the Right) when Moving Left
                }

                // Win Condition
                
                if(scrollOffset > 15000) {
                    console.log("win")
                }
            }

            // Collision Detection 

            platformsArray.forEach((platform) => {
                if(player.position.Y_Position + player.size.height <= platform.position.Y_Position
                    && player.position.Y_Position + player.size.height + player.velocity.Y_Velocity >= platform.position.Y_Position 
                    && player.position.X_Position + player.size.width >= platform.position.X_Position
                    && player.position.X_Position <= platform.position.X_Position + platform.size.width) {
                    player.velocity.Y_Velocity = 0
                }
        })

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