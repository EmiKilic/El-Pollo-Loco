/**
 * Represents the current state of the keyboard inputs for controlling the player's character or other game objects.
 * Extends the {@link MovableObject} class for potential integration with game mechanics involving movement.
 * Each property corresponds to a specific key, indicating whether it is currently being pressed.
 * 
 * @extends MovableObject
 */
class Keyboard extends MovableObject {
    /** @type {boolean} Indicates whether the left arrow key (or equivalent) is pressed (default is false). */
    LEFT = false;
  
    /** @type {boolean} Indicates whether the right arrow key (or equivalent) is pressed (default is false). */
    RIGHT = false;
  
    /** @type {boolean} Indicates whether the up arrow key (or equivalent) is pressed (default is false). */
    UP = false;
  
    /** @type {boolean} Indicates whether the down arrow key (or equivalent) is pressed (default is false). */
    DOWN = false;
  
    /** @type {boolean} Indicates whether the spacebar is pressed (default is false). */
    SPACE = false;
  }
  