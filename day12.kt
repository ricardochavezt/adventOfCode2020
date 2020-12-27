import kotlin.math.abs

data class Instruction(val action: String, val value: Int)

enum class Direction {
    NORTH, EAST, SOUTH, WEST
}

class Ship(var x: Int, var y: Int, var direction: Direction) {
    fun move(distance: Int, direction: Direction) {
        when (direction) {
            Direction.NORTH -> y = y + distance
            Direction.SOUTH -> y = y - distance
            Direction.EAST -> x = x + distance
            Direction.WEST -> x = x - distance
        }
    }

    fun move(distance: Int) = move(distance, this.direction)

    fun rotateLeft() {
        when (this.direction) {
            Direction.NORTH -> direction = Direction.WEST
            Direction.SOUTH -> direction = Direction.EAST
            Direction.EAST -> direction = Direction.NORTH
            Direction.WEST -> direction = Direction.SOUTH
        }
    }

    fun rotateRight() {
        when (this.direction) {
            Direction.NORTH -> direction = Direction.EAST
            Direction.SOUTH -> direction = Direction.WEST
            Direction.EAST -> direction = Direction.SOUTH
            Direction.WEST -> direction = Direction.NORTH
        }
    }
}

fun main() {
    val lineRegex = Regex("([A-Z])(\\d+)", RegexOption.IGNORE_CASE)
    val instructions = emptyList<Instruction>().toMutableList()
    val ship = Ship(x = 0, y = 0, direction = Direction.EAST)
    do {
        val line = readLine()
        lineRegex.matchEntire(line ?: "")?.let {
            val (action, value) = it.destructured
            instructions.add(Instruction(action, value.toInt()))
        }
    } while (line != null)
    for (instruction in instructions) {
        when (instruction.action) {
            "N" -> ship.move(instruction.value, Direction.NORTH)
            "S" -> ship.move(instruction.value, Direction.SOUTH)
            "E" -> ship.move(instruction.value, Direction.EAST)
            "W" -> ship.move(instruction.value, Direction.WEST)
            "F" -> ship.move(instruction.value)
            "L" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateLeft()
            }
            "R" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateRight()
            }
        }
    }
    println("Final Manhattan distance: ${abs(ship.x) + abs(ship.y)}")
}
