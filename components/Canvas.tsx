import React, {useRef, useEffect} from 'react'

import platform1 from '../src/game_assets/platform_assets/Platform_1.png'
import platform2 from '../src/game_assets/platform_assets/Platform_2.png'

import tree from '../src/game_assets/misc_assets/misc_tree.png'

import playerIdle from '../src/game_assets/player_assets/Player_Idle.png'
import playerWalkingRight from '../src/game_assets/player_assets/Player_Walking_Right.png'
import playerWalkingLeft from '../src/game_assets/player_assets/Player_Walking_Left.png'

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

import {
    MiscPositionObject,
    MiscSizeObject
} from '../src/types/MiscTypes'

import {
    ScenaryPositionObject,
    ScenarySizeObject
} from '../src/types/ScenaryTypes'

const Canvas: React.FC = (props): JSX.Element => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')

        // Canvas Initializaztion
 
        canvas.width = innerWidth 
        canvas.height = innerHeight

        // HTMLImageElement Creation Function

        const createImage = (imageSrc: string): HTMLImageElement => {
            const image: HTMLImageElement = new Image()
            image.src = imageSrc
            return image
        }

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
                context.drawImage(
                    this.image, 
                    this.position.X_Position, 
                    this.position.Y_Position
                )
            }
        }

        const platform_1_image = createImage(platform1)
        const platform_2_image = createImage(platform2)

        const platformsArray: Platform[] = [
                new Platform(
                    {X_Position: 1200, Y_Position: 570}, 
                    {width: platform_1_image.width, height: platform_1_image.height}, 
                    platform_1_image
                ),
                new Platform(
                    {X_Position: -30, Y_Position: 750}, 
                    {width: platform_2_image.width, height: platform_2_image.height}, 
                    platform_2_image
                ),
                new Platform(
                    {X_Position: platform_2_image.width * 1 - 31, Y_Position: 750}, 
                    {width: platform_2_image.width, height: platform_2_image.height}, 
                    platform_2_image
                ),
                new Platform(
                    {X_Position: platform_2_image.width * 2 - 32, Y_Position: 750}, 
                    {width: platform_2_image.width, height: platform_2_image.height}, 
                    platform_2_image
                ),
                new Platform(
                    {X_Position: platform_2_image.width * 3 - 33, Y_Position: 750}, 
                    {width: platform_2_image.width, height: platform_2_image.height}, 
                    platform_2_image
                ),
        ]

        // =======================================================================================================
        // I don't know how to do this modularly :(

        // Misc Constructor Class

        class Misc {
            position: MiscPositionObject;
            size: MiscSizeObject;
            image: HTMLElement;
            
            constructor(position: MiscPositionObject, size: MiscSizeObject, image: HTMLElement) {
                this.position = position
                this.size = size
                this.image = image
            }

            draw(): void {
                context.drawImage(
                    this.image, 
                    this.position.X_Position, 
                    this.position.Y_Position, 
                    this.size.width, 
                    this.size.height
                )
            }
        }

        const misc_tree_image = createImage(tree)

        const miscObjects: Misc[] = [
            new Misc(
                {X_Position: 40, Y_Position: 310}, 
                {width: 300, height: 450}, 
                misc_tree_image),
        ]

        // =======================================================================================================
        // I don't know how to do this modularly :(

        // Scenary Constructor Class

        class Scenary {
            position: ScenaryPositionObject;
            size: ScenarySizeObject;
            image: HTMLElement;
            
            constructor(position: ScenaryPositionObject, size: ScenarySizeObject, image: HTMLElement) {
                this.position = position
                this.size = size
                this.image = image
            }

            draw(): void {
                context.drawImage(
                    this.image, 
                    this.position.X_Position, 
                    this.position.Y_Position, 
                    this.size.width, 
                    this.size.height
                )
            }
        }

        const scenaryObjects: Scenary[] = [
            
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
            speed: number;
            image: HTMLImageElement;
            frames: number;
            sprites: { 
                    idle: {
                        animation: HTMLImageElement, 
                        cropWidth: number,
                    }, 
                    walking: 
                    {
                        right: {
                            animation: HTMLImageElement,
                            cropWidth: number
                        }, 
                        left: {
                            animation: HTMLImageElement,
                            cropWidth: number
                        }
                    } 
                };
            currentSprite: {};
            currentCropWidth: number;
 
            constructor(
                position: PlayerPositionObject, 
                size: PlayerSizeObject, 
                velocity: PlayerVelocityObject, 
                speed: number, 
                image: HTMLImageElement,
                frames: number,
            ) {
                this.position = position
                this.size = size
                this.velocity = velocity
                this.speed = speed
                this.image = image
                this.frames = frames
                this.sprites = {
                    idle: {
                        animation: createImage(playerIdle),
                        cropWidth: 473
                    },
                    walking: {
                        right: {
                            animation: createImage(playerWalkingRight), 
                            cropWidth: 473
                        },
                        left: {
                            animation: createImage(playerWalkingLeft),
                            cropWidth: 473
                        }
                    }
                }
                this.currentSprite = this.sprites.idle.animation
                this.currentCropWidth = 473
            }
    
            draw(): void {
                context.drawImage(
                    this.currentSprite,
                    this.currentCropWidth * this.frames, // sprite crop
                    0,
                    473, // width of each sprite
                    801, // height of each sprite
                    this.position.X_Position, 
                    this.position.Y_Position, 
                    this.size.width,
                    this.size.height
                )
            }

            update(): void {
                this.frames++;
                if(this.frames >= 68) {
                    this.frames = 0;
                }
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

        const playerPosition: PlayerPositionObject = {X_Position: 100, Y_Position: 0}
        const playerSize: PlayerSizeObject = {width: 150, height: 260}
        const playerVelocity: PlayerVelocityObject = {X_Velocity: 0, Y_Velocity: 0}
        const playerSpeed: number = 5
        const playerImage: HTMLImageElement = createImage(playerIdle)
        const playerFrames: number = 0

        const player = new Player(
            playerPosition, 
            playerSize, 
            playerVelocity, 
            playerSpeed, 
            playerImage,
            playerFrames,
        )
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
            context.fillStyle = '#27d0e2'
            context.fillRect(0, 0, canvas.width, canvas.height)

            scenaryObjects.forEach((object) => {
                object.draw()
            })
 
            miscObjects.forEach((object) => {
                object.draw()
            })

            platformsArray.forEach((platform) => {
                platform.draw()
            })
            player.update()

            // Movement Handler + Background Scrolling

            if(keys.right.pressed && player.position.X_Position < 700) { // Right Key + Movement Limit
                player.velocity.X_Velocity = player.speed
            }
            else if(keys.left.pressed && player.position.X_Position > 200 || 
                keys.left.pressed && scrollOffset === 0 && player.position.X_Position > 0) { // Left Key + Movement Limit
                player.velocity.X_Velocity = -player.speed
            }  
            else {
                player.velocity.X_Velocity = 0

                // Background Scrolling

                // Scrolling (To the left) when Moving Right

                if(keys.right.pressed) {
                    scrollOffset += player.speed

                    miscObjects.forEach((object) => {
                        object.position.X_Position -= player.speed
                    })

                    platformsArray.forEach((platform) => {
                        platform.position.X_Position -= player.speed
                    }) 
                }

                // Scrolling (To the Right) when Moving Left

                else if(keys.left.pressed && scrollOffset > 0) {
                    scrollOffset -= player.speed 

                    miscObjects.forEach((object) => {
                        object.position.X_Position += player.speed
                    })

                    platformsArray.forEach((platform) => {
                        platform.position.X_Position += player.speed
                    }) 
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
                    player.currentSprite = player.sprites.walking.right.animation
                    player.currentCropWidth = 473
                    break;

                case 'ArrowLeft':
                    keys.left.pressed = true
                    player.currentSprite = player.sprites.walking.left.animation
                    break;

                case 'ArrowUp':
                    keys.up.pressed = true
                    player.velocity.Y_Velocity = -15 // has to be here, movement fix
                    break;
            }
        })

        // Stop Player

        window.addEventListener('keyup', ({key}) => {
            switch (key) {
                case 'ArrowRight':
                    keys.right.pressed = false
                    player.currentSprite = player.sprites.idle.animation
                    player.currentCropWidth = 473
                    break;

                case 'ArrowLeft':
                    keys.left.pressed = false
                    player.currentSprite = player.sprites.idle.animation
                    player.currentCropWidth = 473
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