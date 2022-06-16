class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        colour = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        });

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey
        this.grounded = false;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.colour = colour;
        this.health = 100;
        this.isAttacking = false;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 20;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    // draw() {
    //     c.fillStyle = this.colour;
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //     // Attack box draw
    //     if (this.isAttacking) {
    //         c.fillStyle = 'green';
    //         c.fillRect(
    //             this.attackBox.position.x, 
    //             this.attackBox.position.y, 
    //             this.attackBox.width, 
    //             this.attackBox.height
    //         );
    //     }
    // }

    update() {
        this.draw();
        this.animateFrames();

        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0;
            this.position.y = 331;
            this.grounded = true;
        } else {
            this.velocity.y += GRAVITY;
            this.grounded = false;
        }
    }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}
